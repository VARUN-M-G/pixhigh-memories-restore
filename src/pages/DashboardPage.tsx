
import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, ArrowRight, Loader2, Image as ImageIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  
  // Placeholder user data - in real app would come from Supabase
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    profilePic: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImage(e.target.result as string);
        setProcessedImage(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const processImage = () => {
    if (!image) return;
    
    setIsProcessing(true);
    
    // Simulate API processing
    setTimeout(() => {
      setProcessedImage(image);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <MainLayout withBackground={false}>
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 border-2 border-white">
                <AvatarImage src={user.profilePic} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold text-white">Welcome, {user.name}</h1>
                <p className="text-sm text-blue-100">{user.email}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Button variant="secondary" asChild className="glass-input">
                <Link to="/profile">
                  View Profile
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle>Image Restoration</CardTitle>
            <CardDescription>Upload an image to restore it with our AI technology</CardDescription>
          </CardHeader>
          <CardContent>
            {!image ? (
              <div 
                className="border-2 border-dashed border-muted-foreground rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => document.getElementById("imageUpload")?.click()}
              >
                <UploadCloud className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground mb-2">Drag & drop or click to upload</p>
                <p className="text-sm text-muted-foreground mb-4">PNG, JPG or WEBP (max 10MB)</p>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <Button 
                  variant="outline" 
                  onClick={(e) => {
                    e.stopPropagation();
                    document.getElementById("imageUpload")?.click();
                  }}
                >
                  Select Image
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {processedImage ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Original</p>
                      <div className="border rounded-lg overflow-hidden">
                        <img src={image} alt="Original" className="w-full h-auto object-contain" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Restored</p>
                      <div className="border rounded-lg overflow-hidden">
                        <img src={processedImage} alt="Restored" className="w-full h-auto object-contain" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="border rounded-lg overflow-hidden">
                      <img src={image} alt="Preview" className="w-full h-auto max-h-[500px] object-contain" />
                    </div>
                    <div className="flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setImage(null);
                          setProcessedImage(null);
                        }}
                      >
                        Change Image
                      </Button>
                      <Button 
                        onClick={processImage} 
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Restore Image
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
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="mr-2">
                <ImageIcon className="mr-2 h-4 w-4" />
                Save to Gallery
              </Button>
              <Button>
                Download Restored Image
              </Button>
            </CardFooter>
          )}
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Recent Photos</CardTitle>
              <CardDescription>View your recently restored photos</CardDescription>
            </CardHeader>
            <CardContent className="h-40 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
              <p className="text-muted-foreground">No photos yet</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All</Button>
            </CardFooter>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Restoration Tips</CardTitle>
              <CardDescription>Get the most out of your restorations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">• Use high-resolution images when possible</p>
              <p className="text-sm">• Photos with clear faces work best</p>
              <p className="text-sm">• Original color photos restore better than B&W</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Learn More</Button>
            </CardFooter>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Share Memories</CardTitle>
              <CardDescription>Share your restored photos with loved ones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">Create albums and share directly with family and friends.</p>
              <Button variant="outline" className="w-full">Create Album</Button>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Learn More</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </MainLayout>
  );
}
