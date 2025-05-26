'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

type UploadedFile = {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  error?: string;
};

export default function DocumentUploadDemo() {
  const [uploadMethod, setUploadMethod] = useState<'direct' | 'integration'>('direct');
  const [integration, setIntegration] = useState<'sharepoint' | 'confluence' | 'googledrive' | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.name.split('.').pop()?.toLowerCase() || 'unknown',
        progress: 0,
        status: 'uploading' as const,
      }));
      
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      
      // Simulate file upload progress
      newFiles.forEach((file) => {
        simulateFileUpload(file.id);
      });
    }
  };

  // Simulate file upload progress
  const simulateFileUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      
      if (progress >= 100) {
        clearInterval(interval);
        progress = 100;
        
        setFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.id === fileId
              ? { ...file, progress: 100, status: 'processing' }
              : file
          )
        );
        
        // Simulate processing
        setTimeout(() => {
          setFiles((prevFiles) =>
            prevFiles.map((file) =>
              file.id === fileId
                ? { ...file, status: 'complete' }
                : file
            )
          );
        }, 1500);
      } else {
        setFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.id === fileId ? { ...file, progress } : file
          )
        );
      }
    }, 300);
  };

  // Handle drag events
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.name.split('.').pop()?.toLowerCase() || 'unknown',
        progress: 0,
        status: 'uploading' as const,
      }));
      
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      
      // Simulate file upload progress
      newFiles.forEach((file) => {
        simulateFileUpload(file.id);
      });
    }
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Remove file from list
  const removeFile = (fileId: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  };

  // Handle upload button click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle integration selection
  const handleIntegrationSelect = (integrationType: 'sharepoint' | 'confluence' | 'googledrive') => {
    setIntegration(integrationType);
    // In a real app, this would open the integration auth flow
  };

  // Handle AI analysis
  const handleAnalyzeWithAI = () => {
    if (files.length === 0 || files.some(file => file.status !== 'complete')) {
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const fileNames = files.map(file => file.name).join(', ');
      setAiAnalysis(
        `Based on my analysis of ${fileNames}, I recommend creating the following training assets:\n\n` +
        `1. Interactive E-Learning Module - This would be ideal for the procedural content in your documents\n` +
        `2. Quick Reference Guide - For easy access to key information\n` +
        `3. Process Map - To visualize the workflow described in your documents\n\n` +
        `Would you like me to start generating any of these assets?`
      );
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-tome-gradient from-tome-navy via-tome-purple-dark to-tome-navy">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">TOME Document Upload Demo</h1>
          <Link href="/demo" className="px-4 py-2 rounded-md bg-tome-navy/50 text-white hover:bg-tome-navy/70 transition-colors">
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Document Upload</h2>
          <p className="mt-1 text-gray-300">
            Upload your documents and our AI will help transform them into training content
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                className={`flex-1 py-3 px-4 rounded-md ${
                  uploadMethod === 'direct'
                    ? 'bg-tome-purple text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/15'
                } transition-colors duration-200`}
                onClick={() => setUploadMethod('direct')}
              >
                <div className="flex items-center justify-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span>Upload Files</span>
                </div>
              </button>
              <button
                className={`flex-1 py-3 px-4 rounded-md ${
                  uploadMethod === 'integration'
                    ? 'bg-tome-purple text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/15'
                } transition-colors duration-200`}
                onClick={() => setUploadMethod('integration')}
              >
                <div className="flex items-center justify-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Connect Integration</span>
                </div>
              </button>
            </div>

            {uploadMethod === 'direct' ? (
              <div
                className={`mt-6 border-2 border-dashed rounded-lg p-10 text-center ${
                  dragActive
                    ? 'border-tome-cyan bg-tome-cyan/10'
                    : 'border-white/20 hover:border-white/30'
                } transition-colors duration-200`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  className="hidden"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
                />
                
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mt-4 text-lg font-medium text-white">
                  Drag and drop your files here
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  or
                </p>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-tome-cyan hover:bg-tome-cyan/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tome-cyan"
                  onClick={handleUploadClick}
                >
                  Browse Files
                </button>
                <p className="mt-2 text-xs text-gray-500">
                  Supported file types: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, TXT
                </p>
              </div>
            ) : (
              <div className="mt-6">
                <p className="text-white mb-4">
                  Select an integration to connect and import your documents:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    className={`p-4 rounded-lg border ${
                      integration === 'sharepoint'
                        ? 'border-tome-cyan bg-tome-cyan/10'
                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                    } transition-colors duration-200`}
                    onClick={() => handleIntegrationSelect('sharepoint')}
                  >
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <svg className="h-8 w-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.5 21C16.2467 21 20.0867 17.16 20.0867 12.4133C20.0867 7.66667 16.2467 3.82667 11.5 3.82667C6.75333 3.82667 2.91333 7.66667 2.91333 12.4133C2.91333 17.16 6.75333 21 11.5 21Z" />
                        </svg>
                      </div>
                      <span className="mt-2 text-white font-medium">SharePoint</span>
                    </div>
                  </button>
                  <button
                    className={`p-4 rounded-lg border ${
                      integration === 'confluence'
                        ? 'border-tome-cyan bg-tome-cyan/10'
                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                    } transition-colors duration-200`}
                    onClick={() => handleIntegrationSelect('confluence')}
                  >
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <svg className="h-8 w-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M2.8 10.7C2.4 10.3 1.9 10.2 1.5 10.4C1.1 10.6 0.9 11 0.9 11.5C0.9 11.9 1.1 12.3 1.5 12.5L8.5 17.2C8.9 17.5 9.4 17.5 9.8 17.2L16.8 12.5C17.2 12.2 17.4 11.8 17.4 11.4C17.4 11 17.2 10.6 16.8 10.3C16.4 10 15.9 10 15.5 10.3L9.2 14.5L2.8 10.7Z" />
                        </svg>
                      </div>
                      <span className="mt-2 text-white font-medium">Confluence</span>
                    </div>
                  </button>
                  <button
                    className={`p-4 rounded-lg border ${
                      integration === 'googledrive'
                        ? 'border-tome-cyan bg-tome-cyan/10'
                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                    } transition-colors duration-200`}
                    onClick={() => handleIntegrationSelect('googledrive')}
                  >
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <svg className="h-8 w-8" viewBox="0 0 24 24">
                          <path d="M4.5 14.5L8 19.5H16L12.5 14.5H4.5Z" fill="#FBBC04" />
                          <path d="M17.5 12L21 19.5H16L12.5 12H17.5Z" fill="#188038" />
                          <path d="M8 4.5L4.5 12H12.5L16 4.5H8Z" fill="#4285F4" />
                        </svg>
                      </div>
                      <span className="mt-2 text-white font-medium">Google Drive</span>
                    </div>
                  </button>
                </div>
                
                {integration && (
                  <div className="mt-6 p-4 bg-white/10 rounded-lg">
                    <p className="text-white">
                      {integration === 'sharepoint' && 'Connect to your SharePoint account to import documents.'}
                      {integration === 'confluence' && 'Connect to your Confluence account to import documents.'}
                      {integration === 'googledrive' && 'Connect to your Google Drive account to import documents.'}
                    </p>
                    <button
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-tome-cyan hover:bg-tome-cyan/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tome-cyan"
                    >
                      Connect to {integration === 'sharepoint' ? 'SharePoint' : integration === 'confluence' ? 'Confluence' : 'Google Drive'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {files.length > 0 && (
          <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden mb-6">
            <div className="p-6">
              <h2 className="text-lg font-medium text-white mb-4">Uploaded Files</h2>
              <div className="space-y-4">
                {files.map((file) => (
                  <div key={file.id} className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-white">{file.name}</h3>
                            <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
                          </div>
                          <div className="flex items-center">
                            {file.status === 'uploading' && (
                              <span className="text-xs text-gray-400 mr-2">{file.progress}%</span>
                            )}
                            {file.status === 'processing' && (
                              <span className="text-xs text-yellow-400 mr-2">Processing</span>
                            )}
                            {file.status === 'complete' && (
                              <span className="text-xs text-green-400 mr-2">Complete</span>
                            )}
                            {file.status === 'error' && (
                              <span className="text-xs text-red-400 mr-2">Error</span>
                            )}
                            <button
                              className="text-gray-400 hover:text-white"
                              onClick={() => removeFile(file.id)}
                            >
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                file.status === 'error'
                                  ? 'bg-red-500'
                                  : file.status === 'complete'
                                  ? 'bg-green-500'
                                  : 'bg-tome-cyan'
                              }`}
                              style={{ width: `${file.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-tome-purple hover:bg-tome-purple/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tome-purple"
                  onClick={handleAnalyzeWithAI}
                  disabled={files.some((file) => file.status === 'uploading' || file.status === 'processing') || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing with AI...
                    </>
                  ) : (
                    <>Analyze with AI</>
                  )}
                </button>
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-tome-cyan hover:bg-tome-cyan/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tome-cyan"
                  disabled={files.some((file) => file.status === 'uploading' || file.status === 'processing')}
                >
                  Continue to Asset Configuration
                </button>
              </div>
            </div>
          </div>
        )}

        {aiAnalysis && (
          <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden mb-6">
            <div className="p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-tome-purple/30 flex items-center justify-center text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium text-white">AI Analysis</h3>
                  <div className="mt-2 text-gray-300 whitespace-pre-line">
                    {aiAnalysis}
                  </div>
                  <div className="mt-4 flex space-x-3">
                    <button className="px-3 py-1.5 bg-tome-cyan text-white text-sm rounded-md hover:bg-tome-cyan/80 transition-colors">
                      Generate E-Learning Module
                    </button>
                    <button className="px-3 py-1.5 bg-white/10 text-white text-sm rounded-md hover:bg-white/20 transition-colors">
                      Generate Process Map
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
