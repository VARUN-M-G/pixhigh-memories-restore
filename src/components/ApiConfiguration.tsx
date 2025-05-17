
import { useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

// This component helps configure and test the API connection
export function ApiConfiguration() {
  const { session } = useAuth();
  
  useEffect(() => {
    // Check API connection when component mounts
    const checkApiConnection = async () => {
      try {
        const response = await fetch("http://localhost:8000/health", {
          method: "GET"
        });
        
        if (response.ok) {
          console.log("API connection successful");
        } else {
          console.error("API connection failed");
          toast.error(
            "Unable to connect to the Pixhigh API. Some features may not work properly.", 
            { duration: 8000 }
          );
        }
      } catch (error) {
        console.error("API connection error:", error);
        toast.error(
          "Can't reach the Pixhigh API server. Make sure the server is running.", 
          { duration: 8000 }
        );
      }
    };
    
    checkApiConnection();
  }, []);
  
  return null; // This is a utility component, it doesn't render anything
}
