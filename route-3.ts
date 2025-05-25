// This file contains the API route for handling file uploads and credit management
// It will be used to process document uploads and deduct credits

import { NextRequest, NextResponse } from 'next/server';
import supabaseClient from '@/lib/supabaseClient';
import { ASSET_CREDIT_COSTS } from '@/lib/stripe';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const data = await req.json();
    const { 
      userId, 
      organizationId, 
      documentUrl, 
      documentName, 
      assetTypes, 
      audience, 
      tone, 
      complianceText 
    } = data;
    
    // Validate required fields
    if (!userId || !organizationId || !documentUrl || !documentName || !assetTypes || assetTypes.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Missing required fields' 
      }, { status: 400 });
    }
    
    // Calculate total credits required
    const totalCreditsRequired = assetTypes.reduce(
      (sum, type) => sum + ASSET_CREDIT_COSTS[type as keyof typeof ASSET_CREDIT_COSTS],
      0
    );
    
    // Check if organization has enough credits
    const { data: creditData, error: creditError } = await supabaseClient
      .rpc('get_organization_credit_balance', { org_id: organizationId });
    
    if (creditError) {
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to check credit balance',
        error: creditError.message
      }, { status: 500 });
    }
    
    const availableCredits = creditData?.balance || 0;
    
    if (availableCredits < totalCreditsRequired) {
      return NextResponse.json({ 
        success: false, 
        message: 'Insufficient credits',
        required: totalCreditsRequired,
        available: availableCredits
      }, { status: 400 });
    }
    
    // Create asset records and deduct credits
    const assetPromises = assetTypes.map(async (assetType) => {
      const creditsForAsset = ASSET_CREDIT_COSTS[assetType as keyof typeof ASSET_CREDIT_COSTS];
      
      // Create asset record
      const { data: assetData, error: assetError } = await supabaseClient
        .from('assets')
        .insert({
          user_id: userId,
          organization_id: organizationId,
          original_document_url: documentUrl,
          original_document_name: documentName,
          asset_type: assetType,
          status: 'pending',
          credits_used: creditsForAsset,
          audience,
          tone,
          compliance_text: complianceText
        })
        .select()
        .single();
      
      if (assetError) {
        throw new Error(`Error creating asset record: ${assetError.message}`);
      }
      
      // Record credit transaction
      const { error: transactionError } = await supabaseClient
        .from('credit_transactions')
        .insert({
          user_id: userId,
          organization_id: organizationId,
          amount: -creditsForAsset, // Negative amount for usage
          transaction_type: 'usage',
          asset_id: assetData.id
        });
      
      if (transactionError) {
        throw new Error(`Error recording credit transaction: ${transactionError.message}`);
      }
      
      // Enqueue job for processing
      // In a real implementation, this would call a queue service or webhook
      // For now, we'll simulate this with a database update
      const { error: queueError } = await supabaseClient
        .from('assets')
        .update({ status: 'processing' })
        .eq('id', assetData.id);
      
      if (queueError) {
        throw new Error(`Error queueing job: ${queueError.message}`);
      }
      
      return assetData;
    });
    
    // Wait for all asset creation and credit deduction to complete
    const assets = await Promise.all(assetPromises);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Documents submitted successfully',
      assets,
      creditsUsed: totalCreditsRequired,
      remainingCredits: availableCredits - totalCreditsRequired
    });
  } catch (error) {
    console.error('Error processing document submission:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error processing document submission',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
