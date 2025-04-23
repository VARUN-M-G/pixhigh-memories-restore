import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, UploadCloud, X, Loader2, UserCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function RegisterProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [defaultAvatarUrl, setDefaultAvatarUrl] = useState("");

  useEffect(() => {
    if (user?.email) {
      const seed = encodeURIComponent(user.email.replace(/@.*$/, ""));
      const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=4f46e5`;
      setDefaultAvatarUrl(avatarUrl);
    }
  }, [user?.email]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setProfileImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      let avatarUrl = defaultAvatarUrl;
      
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, imageFile);
          
        if (uploadError) {
          throw new Error(`Error uploading image: ${uploadError.message}`);
        }
        
        const { data: publicUrlData } = await supabase.storage.from('avatars').getPublicUrl(fileName);
        avatarUrl = publicUrlData.publicUrl;
      }
      
      const { error } = await supabase.from('users').insert({
        id: user.id,
        full_name: fullName,
        gender: gender || null,
        date_of_birth: date ? new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().split('T')[0] : null,
        phone_number: phoneNumber || null,
        avatar_url: avatarUrl,
        email: user.email || '',
        username: fullName.replace(/\s+/g, '_').toLowerCase() || user.email?.split('@')[0] || 'user'
      });
      
      if (error) {
        throw new Error(`Error creating profile: ${error.message}`);
      }
      
      toast.success('Profile created successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message);
      console.error('Error saving profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto flex flex-col justify-center items-center px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Pixhigh</h1>
        </div>
        <Card className="w-full max-w-md glass-card animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Complete Your Profile</CardTitle>
            <CardDescription className="text-center">
              Tell us a bit more about yourself
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2 flex flex-col items-center">
                <Label className="text-center">Profile Picture (Optional)</Label>
                
                {profileImage ? (
                  <div className="relative w-32 h-32 mx-auto">
                    <Avatar className="w-32 h-32 border-2 border-primary">
                      <AvatarImage 
                        src={profileImage} 
                        alt="Profile Preview" 
                        className="object-cover"
                      />
                    </Avatar>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-8 w-8"
                      type="button"
                      onClick={() => {
                        setProfileImage(null);
                        setImageFile(null);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-32 h-32 border-2 border-primary">
                      <AvatarImage src={defaultAvatarUrl} alt="Default Avatar" />
                      <AvatarFallback><UserCircle className="w-20 h-20" /></AvatarFallback>
                    </Avatar>
                    
                    <div className="flex items-center justify-center">
                      <Input
                        id="profilePicture"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex items-center"
                        onClick={() => document.getElementById("profilePicture")?.click()}
                      >
                        <UploadCloud className="mr-2 h-4 w-4" />
                        Select Image
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2 mt-6">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  placeholder="Enter your full name" 
                  className="glass-input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal glass-input",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input 
                  id="phoneNumber" 
                  placeholder="Enter your phone number" 
                  className="glass-input"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : "Save Profile"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
}
