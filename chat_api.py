import os
from typing import List, Dict, Any, Optional
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import json
import random

# Initialize FastAPI app
app = FastAPI(title="TOME Chat API")

# Add CORS middleware to allow cross-origin requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client
# In production, this would be set as an environment variable
openai.api_key = os.getenv("OPENAI_API_KEY", "your-openai-api-key")

# Sample work examples to showcase
SAMPLE_WORKS = [
    {
        "id": "elearning-sample-1",
        "title": "Customer Onboarding E-Learning Module",
        "type": "e-learning",
        "description": "Interactive module covering the customer onboarding process with knowledge checks and simulations.",
        "thumbnail": "https://example.com/thumbnails/elearning-1.jpg",
        "preview_url": "https://example.com/previews/elearning-1"
    },
    {
        "id": "video-sample-1",
        "title": "Compliance Training Video",
        "type": "video",
        "description": "Avatar-based explainer video for annual compliance training with engaging visuals.",
        "thumbnail": "https://example.com/thumbnails/video-1.jpg",
        "preview_url": "https://example.com/previews/video-1"
    },
    {
        "id": "process-map-sample-1",
        "title": "Product Development Process Map",
        "type": "process-map",
        "description": "Interactive visualization of the product development lifecycle with clickable stages.",
        "thumbnail": "https://example.com/thumbnails/process-map-1.jpg",
        "preview_url": "https://example.com/previews/process-map-1"
    },
    {
        "id": "job-aid-sample-1",
        "title": "Customer Service Quick Reference Guide",
        "type": "job-aid",
        "description": "Printable PDF with key procedures and troubleshooting steps for customer service representatives.",
        "thumbnail": "https://example.com/thumbnails/job-aid-1.jpg",
        "preview_url": "https://example.com/previews/job-aid-1"
    }
]

# Define request and response models
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    show_samples: Optional[bool] = False
    sample_type: Optional[str] = None

class ChatResponse(BaseModel):
    message: ChatMessage
    samples: Optional[List[Dict[str, Any]]] = None

# Chat endpoint
@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Process the chat request
        messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]
        
        # Add system message if not present
        if not any(msg["role"] == "system" for msg in messages):
            messages.insert(0, {
                "role": "system",
                "content": """You are an AI assistant for TOME, a boutique content-creation agency that leverages AI to transform SOPs, policy docs, and knowledge articles into polished training assets. 
                Be helpful, concise, and informative. Focus on explaining how TOME works, the benefits of the service, and answer questions about pricing, process, and capabilities.
                When asked about examples or samples, mention that you can show examples of e-learning modules, videos, process maps, and job aids."""
            })
        
        # Call OpenAI API for chat completion
        # In a real implementation, this would use the actual OpenAI API
        # For now, we'll simulate the response
        
        # Simulate OpenAI response based on the last user message
        last_user_message = next((msg["content"] for msg in reversed(messages) if msg["role"] == "user"), "")
        
        # Generate appropriate response based on user query
        response_content = generate_simulated_response(last_user_message)
        
        # Determine if we should show samples
        show_samples = request.show_samples
        sample_type = request.sample_type
        
        # If the user asks about examples or samples, set show_samples to True
        if any(keyword in last_user_message.lower() for keyword in ["example", "sample", "showcase", "portfolio", "work"]):
            show_samples = True
            
            # Try to determine the sample type from the message
            if "e-learning" in last_user_message.lower() or "elearning" in last_user_message.lower():
                sample_type = "e-learning"
            elif "video" in last_user_message.lower():
                sample_type = "video"
            elif "process" in last_user_message.lower() or "map" in last_user_message.lower():
                sample_type = "process-map"
            elif "job" in last_user_message.lower() or "aid" in last_user_message.lower() or "pdf" in last_user_message.lower():
                sample_type = "job-aid"
        
        # Filter samples if a specific type is requested
        samples = SAMPLE_WORKS
        if show_samples and sample_type:
            samples = [sample for sample in SAMPLE_WORKS if sample["type"] == sample_type]
        elif not show_samples:
            samples = None
        
        return ChatResponse(
            message=ChatMessage(role="assistant", content=response_content),
            samples=samples
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def generate_simulated_response(user_message: str) -> str:
    """Generate a simulated response based on the user message."""
    # Convert to lowercase for easier matching
    user_message_lower = user_message.lower()
    
    # Check for different types of queries and return appropriate responses
    
    # About TOME
    if any(keyword in user_message_lower for keyword in ["what is tome", "about tome", "tell me about", "what does tome do"]):
        return """TOME is a boutique content-creation agency that leverages the latest generative-AI engines to transform your standard operating procedures (SOPs), policy docs, and knowledge articles into polished, multi-format training assets. We deliver e-learning modules, avatar-based explainer videos, interactive process maps, and PDF job aids—all in as little as 72 hours. Every asset is reviewed by human instructional-design experts, so you get Silicon-speed production without sacrificing accuracy, compliance, or instructional value."""
    
    # Pricing
    elif any(keyword in user_message_lower for keyword in ["pricing", "cost", "price", "how much", "credits"]):
        return """TOME uses a credit-based pricing model that scales with your needs. Instead of unpredictable hourly billing, you purchase monthly credit packs that give you flexibility and budget clarity. Our Starter package includes 50 credits per month, while Professional (150 credits) and Enterprise (500+ credits) tiers offer additional features and volume discounts. Unused credits roll over for one month, so your budget flexes with busy and quiet periods. Different asset types require different credit amounts: e-learning modules (10 credits), videos (15 credits), process maps (8 credits), and job aids (5 credits)."""
    
    # How it works
    elif any(keyword in user_message_lower for keyword in ["how does it work", "process", "workflow", "steps", "how to use"]):
        return """TOME works in four simple steps: 1) Submit - Upload your SOP or paste a SharePoint link into our secure portal and select which formats you want. 2) Specify - Answer three quick prompts about audience, tone, and must-keep compliance text. 3) Review - Within 48–72 hours you receive a preview link. You can approve or request up to two minor tweaks (included). 4) Launch - Download SCORM/xAPI, MP4, or high-res PDF files and drop them straight into your LMS or intranet. Behind the scenes, specialized AI pipelines power the transformation, but human QA ensures accuracy and accessibility."""
    
    # Updates and maintenance
    elif any(keyword in user_message_lower for keyword in ["update", "maintenance", "change", "revise", "edit"]):
        return """TOME makes updates and maintenance simple. For minor changes, just email us or drop the new document in the portal; we'll regenerate the affected screens at no additional credit cost within 60 days of the original creation. For major revamps, we'll quote the extra credit count upfront and queue the job automatically—no new statement of work needed. Because humans remain in the loop, you avoid AI hallucination risk and maintain a clean audit trail."""
    
    # Examples or samples
    elif any(keyword in user_message_lower for keyword in ["example", "sample", "showcase", "portfolio", "work"]):
        return """I'd be happy to show you some examples of TOME's work! We create four types of training assets: 1) E-learning modules with interactive elements and knowledge checks, 2) Avatar-based explainer videos with professional narration, 3) Interactive process maps that visualize complex workflows, and 4) PDF job aids for quick reference. I'm displaying some samples now that you can click to preview. Would you like to see more examples of a specific format?"""
    
    # Benefits or advantages
    elif any(keyword in user_message_lower for keyword in ["benefit", "advantage", "why", "better", "different"]):
        return """TOME offers several key advantages: 1) Speed + Quality - Three-day lead time plus enterprise-grade QA, 2) Zero IT Integration Required - A secure upload link is all it takes, 3) Fixed-Budget Clarity - Credits eliminate scope creep and procurement headaches, 4) Multi-format Delivery - One document in, four asset types out; no juggling point tools, 5) Human QA Safety Net - Every asset is checked, narrated, and visually polished before release. We're ideal for mid-size to enterprise organizations with frequent SOP updates, lean L&D teams needing to scale content output, and compliance-driven environments where stale training leads to audit findings."""
    
    # Future plans
    elif any(keyword in user_message_lower for keyword in ["future", "roadmap", "coming soon", "plan", "next"]):
        return """TOME has an exciting roadmap ahead! In Q3 2025, we're launching multilingual pipelines for instant Spanish, French, and Mandarin localization at half the normal credit cost. Q4 2025 will bring opt-in auto-watch integration for SharePoint and Confluence. In H1 2026, we'll introduce a partner portal so external instructional-design agencies can burn credits on behalf of shared clients. Our long-term vision is to connect directly to your document libraries via secure API, automatically detecting changes and regenerating only the affected content—eliminating stale courses and creating a single, always-current source of truth."""
    
    # Getting started
    elif any(keyword in user_message_lower for keyword in ["start", "begin", "sign up", "register", "trial"]):
        return """Getting started with TOME is easy! You can sign up for an account directly on our website and choose a credit package that fits your needs. We offer a small trial package for new customers who want to test our service with a single document before committing to a monthly plan. Once registered, you'll have immediate access to our secure portal where you can upload your first document and specify your requirements. Our team will guide you through the process, and you'll have your first training assets within 72 hours. Would you like me to show you some examples of what we can create?"""
    
    # Default response for other queries
    else:
        return """Thank you for your interest in TOME! We transform standard operating procedures and documentation into engaging training assets in just 72 hours. Our AI-powered process, combined with human quality assurance, ensures accurate, compliant, and instructionally sound materials delivered at Silicon speed. We offer e-learning modules, avatar-based videos, interactive process maps, and PDF job aids through a simple credit-based pricing model. How can I help you learn more about our services?"""

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "TOME Chat API"}

# Main entry point
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
