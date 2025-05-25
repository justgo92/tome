// This file contains the test script for the TOME web app
// It will be used to verify all functionality before deployment

import { test, expect } from '@playwright/test';

// Test the landing page
test('landing page loads correctly', async ({ page }) => {
  await page.goto('/');
  
  // Check for key elements
  await expect(page.locator('h1:has-text("Agency‑Powered, AI‑Driven Training")')).toBeVisible();
  await expect(page.locator('a:has-text("Get Started")')).toBeVisible();
  await expect(page.locator('h2:has-text("How It Works")')).toBeVisible();
  await expect(page.locator('h2:has-text("Why Choose TOME")')).toBeVisible();
});

// Test navigation
test('navigation works correctly', async ({ page }) => {
  await page.goto('/');
  
  // Navigate to Upload page
  await page.click('a:has-text("Get Started")');
  await expect(page).toHaveURL('/upload');
  await expect(page.locator('h1:has-text("Document Upload Portal")')).toBeVisible();
  
  // Navigate to Dashboard
  await page.goto('/');
  await page.click('a:has-text("Dashboard")');
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();
  
  // Navigate to Chat
  await page.goto('/');
  await page.click('a:has-text("Live Demo")');
  await expect(page).toHaveURL('/chat');
  await expect(page.locator('h1:has-text("Chat with TOME Assistant")')).toBeVisible();
});

// Test document upload form
test('document upload form works correctly', async ({ page }) => {
  await page.goto('/upload');
  
  // Check form elements
  await expect(page.locator('text=Submit Your Document')).toBeVisible();
  await expect(page.locator('text=Upload Document')).toBeVisible();
  await expect(page.locator('text=Document Name')).toBeVisible();
  await expect(page.locator('text=Select Output Formats')).toBeVisible();
  
  // Test form validation (submit without required fields)
  await page.click('button:has-text("Submit Document")');
  // Should show validation error
  await expect(page.locator('text=Please select a document to upload')).toBeVisible();
});

// Test dashboard
test('dashboard displays correctly', async ({ page }) => {
  await page.goto('/dashboard');
  
  // Check dashboard elements
  await expect(page.locator('text=Asset Dashboard')).toBeVisible();
  await expect(page.locator('text=Credit Balance')).toBeVisible();
  await expect(page.locator('text=Your Assets')).toBeVisible();
  
  // Check empty state
  await expect(page.locator('text=No assets')).toBeVisible();
  await expect(page.locator('text=Get started by submitting your first document')).toBeVisible();
});

// Test chat interface
test('chat interface works correctly', async ({ page }) => {
  await page.goto('/chat');
  
  // Check chat elements
  await expect(page.locator('text=TOME Assistant')).toBeVisible();
  await expect(page.locator('text=Ask about our services')).toBeVisible();
  
  // Test sending a message
  await page.fill('input[placeholder*="Ask about TOME"]', 'What is TOME?');
  await page.click('button[type="submit"]');
  
  // Should show response
  await expect(page.locator('text=TOME is a boutique content-creation agency')).toBeVisible();
});

// Test responsive design
test('responsive design works correctly', async ({ page }) => {
  // Test on mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  
  // Check that mobile layout is correct
  await expect(page.locator('h1:has-text("Agency‑Powered, AI‑Driven Training")')).toBeVisible();
  
  // Test on tablet viewport
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto('/');
  
  // Check that tablet layout is correct
  await expect(page.locator('h1:has-text("Agency‑Powered, AI‑Driven Training")')).toBeVisible();
  
  // Test on desktop viewport
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  
  // Check that desktop layout is correct
  await expect(page.locator('h1:has-text("Agency‑Powered, AI‑Driven Training")')).toBeVisible();
});
