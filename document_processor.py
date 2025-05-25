import os
import sys
import json
import time
import requests
from typing import Dict, Any, List, Optional
import openai
from supabase import create_client, Client

# Initialize Supabase client
supabase_url = os.getenv("SUPABASE_URL", "https://example.supabase.co")
supabase_key = os.getenv("SUPABASE_KEY", "your-service-role-key")
supabase: Client = create_client(supabase_url, supabase_key)

# Initialize OpenAI client
openai.api_key = os.getenv("OPENAI_API_KEY", "your-openai-api-key")

# Asset types and their processing functions
ASSET_TYPES = {
    "e-learning": "process_elearning",
    "video": "process_video",
    "process-map": "process_process_map",
    "job-aid": "process_job_aid"
}

def fetch_pending_assets() -> List[Dict[str, Any]]:
    """Fetch pending assets from Supabase."""
    response = supabase.table("assets").select("*").eq("status", "processing").execute()
    
    if response.data:
        print(f"Found {len(response.data)} pending assets")
        return response.data
    
    return []

def update_asset_status(asset_id: str, status: str, output_url: Optional[str] = None) -> None:
    """Update the status of an asset in Supabase."""
    update_data = {"status": status}
    
    if output_url:
        update_data["output_url"] = output_url
        update_data["completed_at"] = "now()"
    
    supabase.table("assets").update(update_data).eq("id", asset_id).execute()
    print(f"Updated asset {asset_id} status to {status}")

def extract_text_from_document(document_url: str) -> str:
    """Extract text content from a document URL."""
    # In a real implementation, this would handle different document types
    # For now, we'll simulate downloading and extracting text
    print(f"Extracting text from {document_url}")
    
    # Simulate document processing time
    time.sleep(2)
    
    # Return placeholder text for demonstration
    return """
    Standard Operating Procedure: Customer Onboarding Process
    
    1. Introduction
    This document outlines the standard process for onboarding new customers to our platform.
    
    2. Scope
    This procedure applies to all new customer accounts created through our sales team or website.
    
    3. Responsibilities
    - Sales Team: Initial customer information collection
    - Onboarding Specialist: Account setup and training
    - Support Team: Post-onboarding assistance
    
    4. Procedure
    4.1 Account Creation
    - Verify customer information
    - Create account in CRM
    - Generate welcome email with temporary credentials
    
    4.2 Initial Setup
    - Schedule kickoff call
    - Configure user permissions
    - Set up billing information
    
    4.3 Training
    - Conduct platform walkthrough
    - Provide access to knowledge base
    - Schedule follow-up training sessions as needed
    
    4.4 Handoff
    - Introduce support team contact
    - Set up regular check-in schedule
    - Document customer-specific requirements
    
    5. Quality Control
    - Send satisfaction survey after 7 days
    - Review usage metrics after 30 days
    - Schedule quarterly business reviews
    
    6. Compliance Requirements
    All customer data must be handled according to our data protection policy and relevant regulations.
    """

def process_elearning(asset: Dict[str, Any], document_text: str) -> str:
    """Process document into an e-learning module."""
    print(f"Processing e-learning module for asset {asset['id']}")
    
    # In a real implementation, this would call OpenAI API to generate content
    # and create SCORM package or other e-learning format
    
    # Simulate OpenAI API call
    prompt = f"""
    Transform the following SOP into an engaging e-learning module outline.
    Target audience: {asset.get('audience', 'General employees')}
    Tone: {asset.get('tone', 'Professional')}
    Must include compliance text: {asset.get('compliance_text', 'N/A')}
    
    SOP:
    {document_text}
    
    Create a structured e-learning module with:
    1. Learning objectives
    2. Module sections with interactive elements
    3. Knowledge check questions
    4. Summary and next steps
    """
    
    # Simulate processing time
    time.sleep(5)
    
    # Generate a filename for the output
    filename = f"elearning_{asset['id']}.html"
    
    # In a real implementation, this would create and upload the actual file
    # For now, we'll create a simple HTML file as a placeholder
    elearning_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>E-Learning Module: {asset['original_document_name']}</title>
        <style>
            body {{ font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }}
            .module {{ max-width: 800px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 8px; }}
            h1 {{ color: #2c3e50; }}
            .section {{ margin-bottom: 20px; }}
            .interactive {{ background: #e8f4fc; padding: 15px; border-radius: 5px; margin: 15px 0; }}
            .question {{ background: #f0f7ea; padding: 15px; border-radius: 5px; margin: 15px 0; }}
        </style>
    </head>
    <body>
        <div class="module">
            <h1>Customer Onboarding Process</h1>
            
            <div class="section">
                <h2>Learning Objectives</h2>
                <ul>
                    <li>Understand the complete customer onboarding workflow</li>
                    <li>Identify responsibilities for each team in the process</li>
                    <li>Follow compliance requirements for customer data</li>
                    <li>Execute quality control measures effectively</li>
                </ul>
            </div>
            
            <div class="section">
                <h2>Module 1: Introduction to Onboarding</h2>
                <p>This module covers the fundamentals of our customer onboarding process and why it matters.</p>
                
                <div class="interactive">
                    <h3>Interactive Element: Onboarding Journey Map</h3>
                    <p>Click through the customer journey to understand each touchpoint in the onboarding process.</p>
                </div>
            </div>
            
            <div class="section">
                <h2>Module 2: Account Creation</h2>
                <p>Learn the step-by-step process for creating and configuring new customer accounts.</p>
                
                <div class="interactive">
                    <h3>Interactive Element: Account Setup Simulation</h3>
                    <p>Practice creating an account with this interactive simulation.</p>
                </div>
            </div>
            
            <div class="section">
                <h2>Module 3: Training and Handoff</h2>
                <p>Discover best practices for training customers and transitioning them to the support team.</p>
            </div>
            
            <div class="section">
                <h2>Knowledge Check</h2>
                
                <div class="question">
                    <h3>Question 1:</h3>
                    <p>Which team is responsible for the initial customer information collection?</p>
                    <ul>
                        <li>A) Support Team</li>
                        <li>B) Sales Team</li>
                        <li>C) Onboarding Specialist</li>
                        <li>D) IT Department</li>
                    </ul>
                </div>
                
                <div class="question">
                    <h3>Question 2:</h3>
                    <p>When should the first satisfaction survey be sent to new customers?</p>
                    <ul>
                        <li>A) Immediately after account creation</li>
                        <li>B) After 7 days</li>
                        <li>C) After 30 days</li>
                        <li>D) During quarterly business reviews</li>
                    </ul>
                </div>
            </div>
            
            <div class="section">
                <h2>Summary and Next Steps</h2>
                <p>You've completed the Customer Onboarding Process training. Remember that all customer data must be handled according to our data protection policy and relevant regulations.</p>
                <p>Next, you should explore the Support Escalation Process training module.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    # In a real implementation, upload the file to Supabase Storage
    # For now, simulate the upload and return a placeholder URL
    storage_path = f"processed-assets/{filename}"
    
    # Simulate file upload to Supabase Storage
    # In a real implementation, this would be:
    # supabase.storage.from_("processed-assets").upload(filename, elearning_content)
    
    # Generate a signed URL for the uploaded file
    # In a real implementation, this would be:
    # signed_url = supabase.storage.from_("processed-assets").create_signed_url(storage_path, 60 * 60 * 24 * 7)
    
    # Return placeholder URL
    return f"https://example.supabase.co/storage/v1/object/public/processed-assets/{filename}"

def process_video(asset: Dict[str, Any], document_text: str) -> str:
    """Process document into an avatar-based explainer video."""
    print(f"Processing video for asset {asset['id']}")
    
    # Simulate processing time
    time.sleep(8)
    
    # Generate a filename for the output
    filename = f"video_{asset['id']}.mp4"
    
    # In a real implementation, this would create and upload the actual video file
    # For now, return a placeholder URL
    return f"https://example.supabase.co/storage/v1/object/public/processed-assets/{filename}"

def process_process_map(asset: Dict[str, Any], document_text: str) -> str:
    """Process document into an interactive process map."""
    print(f"Processing process map for asset {asset['id']}")
    
    # Simulate processing time
    time.sleep(6)
    
    # Generate a filename for the output
    filename = f"process_map_{asset['id']}.html"
    
    # In a real implementation, this would create and upload the actual file
    # For now, return a placeholder URL
    return f"https://example.supabase.co/storage/v1/object/public/processed-assets/{filename}"

def process_job_aid(asset: Dict[str, Any], document_text: str) -> str:
    """Process document into a PDF job aid."""
    print(f"Processing job aid for asset {asset['id']}")
    
    # Simulate processing time
    time.sleep(4)
    
    # Generate a filename for the output
    filename = f"job_aid_{asset['id']}.pdf"
    
    # In a real implementation, this would create and upload the actual PDF file
    # For now, return a placeholder URL
    return f"https://example.supabase.co/storage/v1/object/public/processed-assets/{filename}"

def process_asset(asset: Dict[str, Any]) -> None:
    """Process a single asset based on its type."""
    try:
        asset_type = asset.get("asset_type")
        
        if not asset_type or asset_type not in ASSET_TYPES:
            print(f"Unknown asset type: {asset_type}")
            update_asset_status(asset["id"], "failed")
            return
        
        # Extract text from the original document
        document_text = extract_text_from_document(asset["original_document_url"])
        
        # Process the document based on asset type
        processing_function = globals()[ASSET_TYPES[asset_type]]
        output_url = processing_function(asset, document_text)
        
        # Update asset status to completed
        update_asset_status(asset["id"], "completed", output_url)
        
    except Exception as e:
        print(f"Error processing asset {asset['id']}: {str(e)}")
        update_asset_status(asset["id"], "failed")

def main_loop():
    """Main processing loop."""
    print("Starting document processing worker...")
    
    while True:
        try:
            # Fetch pending assets
            assets = fetch_pending_assets()
            
            # Process each asset
            for asset in assets:
                process_asset(asset)
            
            # Sleep before checking for new assets
            if not assets:
                print("No pending assets, sleeping...")
                time.sleep(10)
            
        except Exception as e:
            print(f"Error in main loop: {str(e)}")
            time.sleep(30)  # Sleep longer on error

if __name__ == "__main__":
    main_loop()
