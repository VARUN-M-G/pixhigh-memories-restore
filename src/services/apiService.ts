
import { supabase } from "@/integrations/supabase/client";

// API configuration
const API_BASE_URL = "http://localhost:8000"; // Change this to your actual API URL
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvdmF1c3d5bnVmc3pjdWttc2FzIiwicm9zZSIsImFub24iLCJpYXQiOjE3NDM3MDU2OTgsImV4cCI6MjA1OTI4MTY5OH0.Aq9O8V7WCEtblGOFBTYfG3zVjlY7210B_9S7jkudDH8";

// Types
export interface ImageProcessingOptions {
  version?: string;
  upscale?: number;
  bg_upsampler?: string;
  bg_tile?: number;
  suffix?: string;
  only_center_face?: boolean;
  aligned?: boolean;
  ext?: string;
}

export interface ProcessedImageResult {
  status: string;
  user_id: string;
  original_url: string;
  processed_url: string;
}

export interface UserImage {
  id: string;
  user_id: string;
  original_image_path: string;
  processed_image_path: string;
  original_url: string;
  processed_url: string;
  gfpgan_version: string;
  upscale_factor: number;
  processing_params: string;
  created_at: string;
}

/**
 * Get the authentication headers required for API calls
 */
export async function getAuthHeaders(): Promise<HeadersInit> {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.access_token) {
    throw new Error("User not authenticated");
  }
  
  return {
    "Authorization": `Bearer ${session.access_token}`,
    "X-API-Key": API_KEY
  };
}

/**
 * Process an image using the FastAPI backend
 */
export async function processImage(
  file: File, 
  options: ImageProcessingOptions = {}
): Promise<ProcessedImageResult> {
  try {
    const headers = await getAuthHeaders();
    const formData = new FormData();
    
    formData.append("file", file);
    
    // Add all options to the form data
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, String(value));
      }
    });
    
    const response = await fetch(`${API_BASE_URL}/process/`, {
      method: "POST",
      headers: {
        ...headers,
        // Don't set Content-Type for FormData
      },
      body: formData
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
}

/**
 * Get all images processed by the current user
 */
export async function getUserImages(): Promise<UserImage[]> {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${API_BASE_URL}/user/images`, {
      method: "GET",
      headers
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error: ${response.status}`);
    }
    
    const result = await response.json();
    return result.images;
  } catch (error) {
    console.error("Error fetching user images:", error);
    throw error;
  }
}

/**
 * Delete a user image by its ID
 */
export async function deleteUserImage(imageId: string): Promise<{ status: string; message: string }> {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${API_BASE_URL}/user/images/${imageId}`, {
      method: "DELETE",
      headers
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}
