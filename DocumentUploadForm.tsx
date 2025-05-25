// This file contains the components for the document upload form
// It will be used to collect SOPs and other documents from users

'use client';

import { useState, useRef } from 'react';
import supabaseClient from '@/lib/supabaseClient';
import { ASSET_CREDIT_COSTS } from '@/lib/stripe';

// Define the form data type
type FormData = {
  documentName: string;
  assetTypes: ('e-learning' | 'video' | 'process-map' | 'job-aid')[];
  audience: string;
  tone: string;
  complianceText: string;
  file: File | null;
};

export default function DocumentUploadForm() {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    documentName: '',
    assetTypes: [],
    audience: '',
    tone: '',
    complianceText: '',
    file: null,
  });
  
  // UI state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [totalCredits, setTotalCredits] = useState(0);
  
  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle checkbox changes for asset types
  const handleAssetTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const assetType = value as 'e-learning' | 'video' | 'process-map' | 'job-aid';
    
    setFormData((prev) => {
      const updatedAssetTypes = checked
        ? [...prev.assetTypes, assetType]
        : prev.assetTypes.filter((type) => type !== assetType);
      
      // Calculate total credits
      const newTotalCredits = updatedAssetTypes.reduce(
        (sum, type) => sum + ASSET_CREDIT_COSTS[type],
        0
      );
      setTotalCredits(newTotalCredits);
      
      return { ...prev, assetTypes: updatedAssetTypes };
    });
  };
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));
    
    // Auto-fill document name from file name if empty
    if (file && !formData.documentName) {
      const fileName = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
      setFormData((prev) => ({ ...prev, documentName: fileName }));
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.file) {
      setUploadError('Please select a document to upload');
      return;
    }
    
    if (formData.assetTypes.length === 0) {
      setUploadError('Please select at least one asset type');
      return;
    }
    
    try {
      setIsUploading(true);
      setUploadError(null);
      setUploadProgress(0);
      
      // Upload file to Supabase Storage
      const fileExt = formData.file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { data: uploadData, error: uploadError } = await supabaseClient
        .storage
        .from('original-documents')
        .upload(filePath, formData.file, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            setUploadProgress(Math.round((progress.loaded / progress.total) * 100));
          },
        });
      
      if (uploadError) {
        throw new Error(`Error uploading file: ${uploadError.message}`);
      }
      
      // Get the public URL for the uploaded file
      const { data: urlData } = await supabaseClient
        .storage
        .from('original-documents')
        .createSignedUrl(filePath, 60 * 60 * 24 * 7); // 7 days expiry
      
      if (!urlData?.signedUrl) {
        throw new Error('Failed to generate signed URL for the uploaded file');
      }
      
      // Create asset records in Supabase
      const assetPromises = formData.assetTypes.map(async (assetType) => {
        const { data: assetData, error: assetError } = await supabaseClient
          .from('assets')
          .insert({
            original_document_url: urlData.signedUrl,
            original_document_name: formData.documentName,
            asset_type: assetType,
            status: 'pending',
            credits_used: ASSET_CREDIT_COSTS[assetType],
            audience: formData.audience,
            tone: formData.tone,
            compliance_text: formData.complianceText,
            // user_id and organization_id would be set in a real app
          })
          .select();
        
        if (assetError) {
          throw new Error(`Error creating asset record: ${assetError.message}`);
        }
        
        return assetData;
      });
      
      await Promise.all(assetPromises);
      
      // Reset form on success
      setUploadSuccess(true);
      setFormData({
        documentName: '',
        assetTypes: [],
        audience: '',
        tone: '',
        complianceText: '',
        file: null,
      });
      setTotalCredits(0);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Submit Your Document</h2>
      
      {uploadSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-700 font-medium">
            Your document was uploaded successfully! We'll begin processing it right away.
          </p>
          <button
            className="mt-2 text-sm text-green-600 underline"
            onClick={() => setUploadSuccess(false)}
          >
            Submit another document
          </button>
        </div>
      )}
      
      {uploadError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">{uploadError}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Document
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PDF, Word, or Text up to 10MB
              </p>
              {formData.file && (
                <p className="text-sm text-indigo-600 mt-2">
                  Selected: {formData.file.name}
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Document Name */}
        <div>
          <label htmlFor="documentName" className="block text-sm font-medium text-gray-700">
            Document Name
          </label>
          <input
            type="text"
            id="documentName"
            name="documentName"
            value={formData.documentName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter a name for your document"
            required
          />
        </div>
        
        {/* Asset Types */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Output Formats (Credits Required)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                id="e-learning"
                name="assetTypes"
                type="checkbox"
                value="e-learning"
                checked={formData.assetTypes.includes('e-learning')}
                onChange={handleAssetTypeChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="e-learning" className="ml-3 block text-sm font-medium text-gray-700">
                E-learning Module ({ASSET_CREDIT_COSTS['e-learning']} credits)
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="video"
                name="assetTypes"
                type="checkbox"
                value="video"
                checked={formData.assetTypes.includes('video')}
                onChange={handleAssetTypeChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="video" className="ml-3 block text-sm font-medium text-gray-700">
                Avatar-based Video ({ASSET_CREDIT_COSTS['video']} credits)
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="process-map"
                name="assetTypes"
                type="checkbox"
                value="process-map"
                checked={formData.assetTypes.includes('process-map')}
                onChange={handleAssetTypeChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="process-map" className="ml-3 block text-sm font-medium text-gray-700">
                Interactive Process Map ({ASSET_CREDIT_COSTS['process-map']} credits)
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="job-aid"
                name="assetTypes"
                type="checkbox"
                value="job-aid"
                checked={formData.assetTypes.includes('job-aid')}
                onChange={handleAssetTypeChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="job-aid" className="ml-3 block text-sm font-medium text-gray-700">
                PDF Job Aid ({ASSET_CREDIT_COSTS['job-aid']} credits)
              </label>
            </div>
          </div>
          
          {totalCredits > 0 && (
            <div className="mt-3 text-sm font-medium text-indigo-600">
              Total credits required: {totalCredits}
            </div>
          )}
        </div>
        
        {/* Audience */}
        <div>
          <label htmlFor="audience" className="block text-sm font-medium text-gray-700">
            Target Audience
          </label>
          <input
            type="text"
            id="audience"
            name="audience"
            value={formData.audience}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="e.g., New employees, Customer service team"
          />
        </div>
        
        {/* Tone */}
        <div>
          <label htmlFor="tone" className="block text-sm font-medium text-gray-700">
            Preferred Tone
          </label>
          <select
            id="tone"
            name="tone"
            value={formData.tone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select a tone</option>
            <option value="professional">Professional</option>
            <option value="conversational">Conversational</option>
            <option value="instructional">Instructional</option>
            <option value="technical">Technical</option>
            <option value="friendly">Friendly</option>
          </select>
        </div>
        
        {/* Compliance Text */}
        <div>
          <label htmlFor="complianceText" className="block text-sm font-medium text-gray-700">
            Must-Keep Compliance Text
          </label>
          <textarea
            id="complianceText"
            name="complianceText"
            rows={3}
            value={formData.complianceText}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter any specific text that must be included verbatim for compliance reasons"
          />
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isUploading}
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
              isUploading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isUploading ? 'Uploading...' : 'Submit Document'}
          </button>
        </div>
        
        {/* Upload Progress */}
        {isUploading && (
          <div className="mt-4">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                    Uploading
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-indigo-600">
                    {uploadProgress}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                <div
                  style={{ width: `${uploadProgress}%
(Content truncated due to size limit. Use line ranges to read in chunks)