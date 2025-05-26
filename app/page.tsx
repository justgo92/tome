'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Handle navbar transparency on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Carousel auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Mock data for the carousel
  const carouselItems = [
    { id: 0, title: 'Original SOP Document', type: 'input' },
    { id: 1, title: 'E-Learning Module', type: 'output' },
    { id: 2, title: 'Avatar-based Video', type: 'output' },
    { id: 3, title: 'Interactive Process Map', type: 'output' },
  ];
  
  return (
    <div className="min-h-screen bg-tome-gradient from-tome-navy via-tome-purple-dark to-tome-navy text-white">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-tome-navy shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">TOME</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/how-it-works" className="text-white hover:text-tome-cyan transition">
                How It Works
              </Link>
              <Link href="/pricing" className="text-white hover:text-tome-cyan transition">
                Pricing
              </Link>
              <Link href="/auth/login" className="text-white hover:text-tome-cyan transition">
                Login
              </Link>
              <Link href="/auth/signup" className="px-4 py-2 rounded-md bg-tome-cyan text-white font-medium hover:bg-tome-cyan-dark transition">
                Sign Up
              </Link>
            </div>
            
            <div className="md:hidden">
              <button className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40 lg:pt-40 lg:pb-48">
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0">
            {/* Use predetermined positions to avoid hydration mismatch */}
            <div className="absolute rounded-full bg-tome-cyan opacity-10 animate-pulse-slow" style={{ width: '8px', height: '8px', top: '10%', left: '15%', animationDelay: '0.5s' }} />
            <div className="absolute rounded-full bg-tome-cyan opacity-10 animate-pulse-slow" style={{ width: '12px', height: '12px', top: '25%', left: '30%', animationDelay: '1.5s' }} />
            <div className="absolute rounded-full bg-tome-cyan opacity-10 animate-pulse-slow" style={{ width: '7px', height: '7px', top: '45%', left: '20%', animationDelay: '2.5s' }} />
            <div className="absolute rounded-full bg-tome-cyan opacity-10 animate-pulse-slow" style={{ width: '10px', height: '10px', top: '65%', left: '10%', animationDelay: '3.5s' }} />
            <div className="absolute rounded-full bg-tome-cyan opacity-10 animate-pulse-slow" style={{ width: '9px', height: '9px', top: '85%', left: '25%', animationDelay: '4.5s' }} />
            <div className="absolute rounded-full bg-tome-cyan opacity-10 animate-pulse-slow" style={{ width: '11px', height: '11px', top: '15%', left: '45%', animationDelay: '0.7s' }} />
            <div className="absolute rounded-full bg-tome-cyan opacity-10 animate-pulse-slow" style={{ width: '6px', height: '6px', top: '35%', left: '55%', animationDelay: '1.7s' }} />
            <div className="absolute rounded-full bg-tome-cyan opacity-10 animate-pulse-slow" style={{ width: '13px', height: '13px', top: '55%', left: '50%', animationDelay: '2.7s' }} />
            <div className="absolute rounded-full bg-tome-cyan opacity-10 animate-pulse-slow" style={{ width: '8px', height: '8px', top: '75%', left: '60%', animationDelay: '3.7s' }} />
            <div className="absolute rounded-full bg-tome-cyan opacity-10 animate-pulse-slow" style={{ width: '10px', height: '10px', top: '90%', left: '40%', animationDelay: '4.7s' }} />
            <div className="absolute rounded-full bg-tome-cyan opacity-10 animate-pulse-slow" style={{ width: '9px', height: '9px', top: '5%', left: '75%', animationDelay: '0.9s' }} />
            <div className="absolute rounded-full bg-tome-cyan opacity-10 animate-pulse-slow" style={{ width: '11px', height: '11px', top: '20%', left: '85%', animationDelay: '1.9s' }} />
            <div className="absolute rounded-full bg-tome-cyan opacity-10 animate-pulse-slow" style={{ width: '7px', height: '7px', top: '40%', left: '80%', animationDelay: '2.9s' }} />
            <div className="absolute rounded-full bg-tome-cyan opacity-10 animate-pulse-slow" style={{ width: '12px', height: '12px', top: '60%', left: '90%', animationDelay: '3.9s' }} />
            <div className="absolute rounded-full bg-tome-cyan opacity-10 animate-pulse-slow" style={{ width: '8px', height: '8px', top: '80%', left: '70%', animationDelay: '4.9s' }} />
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Left column - Text content */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight animate-fade-in">
                From SOP to Training in 72 Hours
              </h1>
              <p className="mt-6 text-xl text-gray-300 max-w-3xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Transform your standard operating procedures into engaging, interactive training assets with AI-powered automation. No instructional design experience needed.
              </p>
              <div className="mt-10 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <Link href="/signup" className="group">
                  <button className="px-8 py-4 bg-tome-cyan text-white font-medium rounded-md text-lg relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-tome-cyan/30">
                    <span className="relative z-10">Start Free Preview</span>
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700"></span>
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Right column - Carousel */}
            <div className="mt-16 lg:mt-0 lg:col-span-6">
              <div className="relative">
                {/* Larger preview box */}
                <div className="relative mx-auto w-full max-w-2xl">
                  <div className="relative shadow-xl rounded-xl bg-tome-gray-900 p-3 pt-5">
                    {/* Top bar with camera */}
                    <div className="absolute top-1.5 inset-x-0 flex justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-tome-gray-700"></div>
                    </div>
                    
                    {/* Screen content */}
                    <div className="bg-white rounded overflow-hidden aspect-[16/9] shadow-inner">
                      <div className="relative w-full h-full">
                        {/* Carousel items */}
                        {carouselItems.map((item, index) => (
                          <div 
                            key={item.id}
                            className={`absolute inset-0 transition-all duration-700 transform ${
                              index === currentSlide 
                                ? 'opacity-100 translate-x-0' 
                                : index < currentSlide || (currentSlide === 0 && index === carouselItems.length - 1)
                                  ? 'opacity-0 -translate-x-full' 
                                  : 'opacity-0 translate-x-full'
                            }`}
                          >
                            <div className="w-full h-full flex items-center justify-center p-6">
                              <div className={`rounded-lg shadow-glass p-6 w-full max-w-xl ${
                                item.type === 'input' 
                                  ? 'bg-gray-100 border border-gray-300' 
                                  : 'bg-gradient-to-br from-tome-purple-light/10 to-tome-cyan/10 backdrop-blur-sm'
                              }`}>
                                <div className="text-center">
                                  <div className="w-full h-48 bg-gray-200 rounded mb-4 flex items-center justify-center">
                                    {item.type === 'input' ? (
                                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                    ) : item.id === 1 ? (
                                      <svg className="w-16 h-16 text-tome-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                      </svg>
                                    ) : item.id === 2 ? (
                                      <svg className="w-16 h-16 text-tome-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                      </svg>
                                    ) : (
                                      <svg className="w-16 h-16 text-tome-purple-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                                      </svg>
                                    )}
                                  </div>
                                  <h3 className={`text-lg font-medium ${item.type === 'input' ? 'text-gray-700' : 'text-tome-navy'}`}>
                                    {item.title}
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Carousel indicators */}
                <div className="flex justify-center mt-6 space-x-3">
                  {carouselItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentSlide(item.id)}
                      className={`h-3 rounded-full transition-all duration-300 ${
                        currentSlide === item.id 
                          ? 'bg-tome-cyan w-8 shadow-md shadow-tome-cyan/30' 
                          : 'bg-white/30 w-3 hover:bg-white/50'
                      }`}
                      aria-label={`Go to slide ${item.id + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Social Proof Section */}
      <div className="bg-tome-navy/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Trusted by Learning Teams Everywhere</h2>
            <p className="mt-4 text-xl text-gray-300">
              Companies are transforming their SOPs into engaging training 5x faster
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
            {/* Placeholder for company logos */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex justify-center">
                <div className="h-12 w-32 bg-white/10 rounded-md flex items-center justify-center">
                  <span className="text-white/40 font-medium">LOGO {i+1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Process Section */}
      <div className="py-24 bg-tome-gradient from-tome-navy-dark via-tome-purple-dark to-tome-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">How It Works</h2>
            <p className="mt-4 text-xl text-gray-300">
              Three simple steps to transform your documentation
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 shadow-glass">
              <div className="h-12 w-12 rounded-full bg-tome-cyan flex items-center justify-center mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Upload Your SOP</h3>
              <p className="text-gray-300">
                Drag and drop your document or connect directly to SharePoint, Confluence, or Google Drive.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 shadow-glass">
              <div className="h-12 w-12 rounded-full bg-tome-cyan flex items-center justify-center mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">AI Processing</h3>
              <p className="text-gray-300">
                Our AI analyzes your document and transforms it into your chosen training formats.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 shadow-glass">
              <div className="h-12 w-12 rounded-full bg-tome-cyan flex items-center justify-center mb-6">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Download Assets</h3>
              <p className="text-gray-300">
                Review, approve, and download your ready-to-use training materials.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Integration Section */}
      <div className="py-24 bg-tome-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Seamless Integrations</h2>
            <p className="mt-4 text-xl text-gray-300">
              Connect directly with your existing document management systems
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* SharePoint */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-glass flex items-center">
              <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white font-bold">SP</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">SharePoint</h3>
                <p className="text-gray-300">Connect your Microsoft 365 workspace</p>
              </div>
            </div>
            
            {/* Confluence */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-glass flex items-center">
              <div className="h-12 w-12 bg-blue-400 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white font-bold">C</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Confluence</h3>
                <p className="text-gray-300">Import from your Atlassian workspace</p>
              </div>
            </div>
            
            {/* Google Drive */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-glass flex items-center">
              <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white font-bold">G</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Google Drive</h3>
                <p className="text-gray-300">Access your Google Workspace documents</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-24 bg-tome-gradient from-tome-purple-dark via-tome-navy to-tome-navy-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Training Process?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Join the companies saving hundreds of hours on training content creation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup" className="group">
              <button className="w-full sm:w-auto px-8 py-4 bg-tome-cyan text-white font-medium rounded-md text-lg relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-tome-cyan/30">
                <span className="relative z-10">Start Free Preview</span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700"></span>
              </button>
            </Link>
            <Link href="/pricing">
              <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white text-white font-medium rounded-md text-lg hover:bg-white/10 transition-all duration-300">
                View Pricing
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-tome-navy-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">TOME</h3>
              <p className="text-gray-400 text-sm">
                Training Output Matrix Engine
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-tome-cyan transition">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-tome-cyan transition">Pricing</Link></li>
                <li><Link href="/integrations" className="hover:text-tome-cyan transition">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-tome-cyan transition">About</Link></li>
                <li><Link href="/blog" className="hover:text-tome-cyan transition">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-tome-cyan transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-tome-cyan transition">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-tome-cyan transition">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TOME. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
