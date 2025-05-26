// This file contains the components for the document upload form
// It will be used to collect SOPs and other documents from users

'use client';

import { useState, useRef } from 'react';
import supabaseClient from '../supabaseClient';
import { ASSET_CREDIT_COSTS } from '../stripe';

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
          upsert: false
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
            compliance_text: formData.complianceText
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
        file: null
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
            placeholder="Enter document name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Asset Types
          </label>
          <div className="mt-2 space-y-4">
            {['e-learning', 'video', 'process-map', 'job-aid'].map((type) => (
              <div key={type} className="flex items-center">
                <input
                  id={type}
                  name={type}
                  type="checkbox"
                  checked={formData.assetTypes.includes(type as any)}
                  onChange={handleAssetTypeChange}
                  value={type}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor={type} className="ml-3 block text-sm font-medium text-gray-700">
                  {type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </label>
              </div>
            ))}
          </div>
        </div>

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
            placeholder="Who is this document for?"
            required
          />
        </div>

        <div>
          <label htmlFor="tone" className="block text-sm font-medium text-gray-700">
            Tone
          </label>
          <select
            id="tone"
            name="tone"
            value={formData.tone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select tone</option>
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="technical">Technical</option>
            <option value="conversational">Conversational</option>
          </select>
        </div>

        <div>
          <label htmlFor="complianceText" className="block text-sm font-medium text-gray-700">
            Compliance Text
          </label>
          <textarea
            id="complianceText"
            name="complianceText"
            value={formData.complianceText}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={4}
            placeholder="Enter any compliance requirements or disclaimers"
          />
        </div>

        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
            Upload Document
          </label>
          <div className="mt-1">
            <input
              type="file"
              id="file"
              name="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="sr-only"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {formData.file ? formData.file.name : 'Choose file'}
            </button>
          </div>
        </div>

        {totalCredits > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Estimated credits needed: {totalCredits}
            </p>
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isUploading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                Uploading {uploadProgress}%
                <div className="mt-2 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </>
            ) : (
              'Submit Document'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
