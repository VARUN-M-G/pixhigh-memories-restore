
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, ArrowRight, Loader2, Image as ImageIcon, Download, Share2, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { processImage, getUserImages, deleteUserImage, UserImage } from "@/services/apiService";

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [userImages, setUserImages] = useState<UserImage[]>([]);
  const [refreshImages, setRefreshImages] = useState(0);
  const [isLoadingGallery, setIsLoadingGallery] = useState(false);
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('users')
          .select('id, full_name, avatar_url')
          .eq('id', user.id)
          .maybeSingle();
          
        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }
        
        if (data) {
          setProfile(data as Profile);
        }
      } catch (error) {
        console.error('Error in fetchProfile:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [user]);

  // Fetch user images from API
  useEffect(() => {
    const fetchUserImages = async () => {
      if (!user) return;
      
      setIsLoadingGallery(true);
      try {
        const images = await getUserImages();
        setUserImages(images);
      } catch (error) {
        console.error('Error fetching user images:', error);
        toast.error('Failed to load your images');
      } finally {
        setIsLoadingGallery(false);
      }
    };
    
    fetchUserImages();
  }, [user, refreshImages]);

  const getNameInitials = (name: string) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    processFile(file);
  };
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };
  
  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImage(e.target.result as string);
        setImageFile(file);
        setProcessedImage(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProcessImage = async () => {
    if (!imageFile) {
      toast.error("No image selected");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const result = await processImage(imageFile, {
        version: "1.3", // Default version
        upscale: 2      // Default upscale factor
      });
      
      setProcessedImage(result.processed_url);
      toast.success("Image successfully enhanced!");
      
      // Refresh gallery
      setRefreshImages(prev => prev + 1);
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    try {
      await deleteUserImage(imageId);
      toast.success("Image deleted successfully");
      // Refresh gallery
      setRefreshImages(prev => prev + 1);
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
    }
  };

  const handleDownloadImage = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'pixhigh-enhanced-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <MainLayout withBackground={false}>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout withBackground={false}>
      <Navbar />
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 border-2 border-white">
                <AvatarImage src={profile?.avatar_url ? profile.avatar_url : undefined} alt={profile?.full_name || "User"} />
                <AvatarFallback className="bg-blue-700 text-white text-xl">{profile?.full_name ? getNameInitials(profile.full_name) : user?.email?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-white">Welcome, {profile?.full_name || user?.email?.split('@')[0]}</h1>
                <p className="text-sm text-blue-100">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-10 px-4">
        <Tabs defaultValue="upscaler" className="w-full">
          <TabsList className="mb-6 w-full max-w-md mx-auto grid grid-cols-2">
            <TabsTrigger value="upscaler" className="text-base py-3">Image Upscaler</TabsTrigger>
            <TabsTrigger value="gallery" className="text-base py-3">Your Gallery</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upscaler">
            <Card className="glass-card mb-8 border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl">Image Upscaler</CardTitle>
                <CardDescription>Upload an image to enhance it with our AI technology</CardDescription>
              </CardHeader>
              <CardContent>
                {!image ? (
                  <div 
                    className={`border-2 ${dragActive ? 'border-blue-600 bg-blue-50/30' : 'border-dashed border-gray-300'} rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer transition-all`}
                    onClick={() => document.getElementById("imageUpload")?.click()}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <UploadCloud className="h-20 w-20 text-blue-600 mb-6" />
                    <p className="text-xl font-medium mb-2">Drag & drop or click to upload</p>
                    <p className="text-sm text-muted-foreground mb-6">PNG, JPG or WEBP (max 10MB)</p>
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById("imageUpload")?.click();
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                    >
                      Browse Files
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {processedImage ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <p className="text-sm font-medium text-muted-foreground">Original Image</p>
                          <div className="border rounded-lg overflow-hidden bg-gray-50 shadow-sm">
                            <img src={image} alt="Original" className="w-full h-auto object-contain max-h-[400px]" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <p className="text-sm font-medium text-muted-foreground">Enhanced Image</p>
                          <div className="border rounded-lg overflow-hidden bg-gray-50 shadow-sm">
                            <img src={processedImage} alt="Enhanced" className="w-full h-auto object-contain max-h-[400px]" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="border rounded-lg overflow-hidden bg-gray-50">
                          <img src={image} alt="Preview" className="w-full h-auto max-h-[500px] object-contain" />
                        </div>
                        <div className="flex justify-between">
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              setImage(null);
                              setImageFile(null);
                              setProcessedImage(null);
                            }}
                          >
                            Change Image
                          </Button>
                          <Button 
                            onClick={handleProcessImage} 
                            disabled={isProcessing}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            {isProcessing ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                Enhance Image
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              {processedImage && (
                <CardFooter className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Enhanced Image by Pixhigh',
                        text: 'Check out this image I enhanced with Pixhigh!',
                        url: processedImage
                      }).catch(err => console.error('Error sharing:', err));
                    } else {
                      toast.info('Sharing not supported on this device');
                    }
                  }}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => handleDownloadImage(processedImage, 'pixhigh-enhanced-image.jpg')}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              )}
            </Card>

            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-6">Image Enhancement Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="glass-card border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">4x Upscaling</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Increase resolution by up to 4x while maintaining quality</p>
                  </CardContent>
                </Card>
                
                <Card className="glass-card border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Face Enhancement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Restore facial details in old photos</p>
                  </CardContent>
                </Card>
                
                <Card className="glass-card border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Noise Removal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Clean up digital noise and artifacts</p>
                  </CardContent>
                </Card>
                
                <Card className="glass-card border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Color Correction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Fix color balance and restore faded images</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="gallery">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Your Enhanced Images</h2>
              <p className="text-muted-foreground">View and manage your previously enhanced photos</p>
            </div>
            
            {isLoadingGallery ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {userImages.length > 0 ? userImages.map((userImage) => (
                  <Card key={userImage.id} className="glass-card overflow-hidden border-none shadow-md">
                    <div className="relative aspect-video bg-gray-100">
                      <img 
                        src={userImage.processed_url} 
                        alt="Enhanced image" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                        }}
                      />
                    </div>
                    <CardFooter className="flex justify-between py-3">
                      <p className="text-sm font-medium truncate max-w-[150px]">
                        {new Date(userImage.created_at).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleDownloadImage(userImage.processed_url, `pixhigh-${userImage.id}.jpg`)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteImage(userImage.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                )) : (
                  <div className="col-span-3 text-center py-12">
                    <ImageIcon className="h-12 w-12 mx-auto opacity-20 mb-2" />
                    <p className="text-muted-foreground">No images yet. Enhance your first image!</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </MainLayout>
  );
}
