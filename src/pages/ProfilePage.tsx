
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isValid } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, ChevronLeft, Edit2, Loader2, LogOut, UploadCloud } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user: authUser, signOut } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    gender: "",
    dob: null as Date | null,
    phone: "",
    profilePic: ""
  });

  // Separate local state for date picker
  const [date, setDate] = useState<Date | undefined>(user.dob || undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user data from Supabase
  useEffect(() => {
    async function fetchUserData() {
      if (!authUser?.id) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", authUser.id)
          .single();

        if (error) {
          console.error("Error fetching user data:", error);
          toast.error("Failed to load profile data");
          return;
        }

        if (data) {
          setUser({
            id: data.id,
            name: data.full_name || "",
            email: data.email || authUser.email || "",
            gender: data.gender || "",
            dob: data.date_of_birth ? new Date(data.date_of_birth) : null,
            phone: data.phone_number || "",
            profilePic: data.avatar_url || ""
          });

          if (data.date_of_birth) {
            setDate(new Date(data.date_of_birth));
          }
        }
      } catch (error) {
        console.error("Error in fetchUserData:", error);
        toast.error("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [authUser?.id, authUser?.email]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
  };

  const handleUpdate = async () => {
    if (!authUser) return;

    setIsSubmitting(true);

    try {
      // Upload new profile image if exists
      let avatarUrl = user.profilePic;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${authUser.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, imageFile);

        if (uploadError) {
          throw new Error(`Error uploading image: ${uploadError.message}`);
        }

        const { data: publicUrlData } = await supabase.storage.from('avatars').getPublicUrl(fileName);
        avatarUrl = publicUrlData.publicUrl;
      }

      // Update profile record
      const { error } = await supabase
        .from('users')
        .update({
          full_name: user.name,
          gender: user.gender || null,
          date_of_birth: date ? date.toISOString() : null,
          phone_number: user.phone || null,
          avatar_url: avatarUrl
        })
        .eq('id', authUser.id);

      if (error) {
        throw new Error(`Error updating profile: ${error.message}`);
      }

      toast.success('Profile updated successfully!');
      setIsEditing(false);
      setImageFile(null);

      // Refetch updated data
      const { data: latest, error: latestError } = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser.id)
        .single();
      if (!latestError && latest) {
        setUser({
          id: latest.id,
          name: latest.full_name || "",
          email: latest.email || authUser.email || "",
          gender: latest.gender || "",
          dob: latest.date_of_birth ? new Date(latest.date_of_birth) : null,
          phone: latest.phone_number || "",
          profilePic: latest.avatar_url || ""
        });
        if (latest.date_of_birth) setDate(new Date(latest.date_of_birth));
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };

  return (
    <MainLayout withBackground={false}>
      {/* --- Soothing Profile Background --- */}
      <div
        className="min-h-[100dvh] w-full relative flex justify-center items-start"
        style={{
          background: "linear-gradient(109.6deg, #D3E4FD 11.2%, #F1F0FB 91.1%)"
        }}
      >
        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0" style={{
          background:
            "rgba(255,255,255,0.4)",
          backdropFilter: "blur(18px)",
        }}></div>

        {/* Main Content */}
        <div className="container mx-auto py-10 px-4 relative z-10 flex flex-col items-center">
          <div className="mb-6 w-full max-w-2xl">
            <Button variant="ghost" asChild className="pl-0">
              <Link to="/dashboard">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Card className="max-w-2xl w-full mx-auto glass-card shadow-xl rounded-2xl border-none">
              <CardHeader className="relative">
                <div className="absolute right-6 top-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditing(!isEditing)}
                    aria-label="Edit Profile"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-col items-center">
                  <Avatar className="h-20 w-20 mb-2 shadow-lg rounded-2xl">
                    <AvatarImage src={user.profilePic || undefined} alt={user.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl font-bold rounded-2xl">
                      {user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-2xl font-bold text-center">{user.name || "User"}</CardTitle>
                  <CardDescription className="text-center">{user.email}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        className="glass-input rounded-2xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={user.email}
                        disabled
                        className="glass-input rounded-2xl opacity-70"
                      />
                      <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        value={user.gender}
                        onValueChange={(value) => setUser({ ...user, gender: value })}
                      >
                        <SelectTrigger className="glass-input rounded-2xl">
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
                              "w-full justify-start text-left font-normal glass-input rounded-2xl",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date
                              ? format(date, "yyyy-MM-dd")
                              : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 pointer-events-auto">
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
                        value={user.phone}
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                        className="glass-input rounded-2xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Profile Picture</Label>
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16 rounded-2xl">
                          <AvatarImage src={user.profilePic || undefined} alt={user.name} />
                          <AvatarFallback className="bg-blue-100 text-blue-700 rounded-2xl">
                            {user.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <Input
                            id="profilePicture"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById("profilePicture")?.click()}
                            className="rounded-lg"
                          >
                            <UploadCloud className="mr-2 h-4 w-4" />
                            Change Photo
                          </Button>
                          {imageFile && (
                            <p className="text-xs mt-1 text-muted-foreground">
                              {imageFile.name.length > 20
                                ? `${imageFile.name.substring(0, 20)}...`
                                : imageFile.name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h3>
                        <p>{user.name || "Not provided"}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                        <p>{user.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Gender</h3>
                        <p className="capitalize">{user.gender || "Not provided"}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Date of Birth</h3>
                        <p>
                          {user.dob && isValid(new Date(user.dob))
                           ? format(new Date(user.dob), "yyyy-MM-dd")
                           : "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone Number</h3>
                      <p>{user.phone || "Not provided"}</p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className={isEditing ? "justify-between" : "justify-center"}>
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="rounded-lg"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleUpdate}
                      disabled={isSubmitting}
                      className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : "Save Changes"}
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    className="text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Button>
                )}
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

// Reminder: This file is getting long. Consider refactoring it into smaller, focused components for maintainability.
