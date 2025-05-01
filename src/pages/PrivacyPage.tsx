
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPage() {
  return (
    <MainLayout withBackground={true}>
      <Navbar />
      <div className="container mx-auto py-10 space-y-6 px-4">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Privacy & Company Policy</CardTitle>
            <p className="text-center text-muted-foreground">Effective Date: May 1, 2025</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <p>
              PiXhigh is committed to protecting your privacy. This Privacy Policy explains what data we collect, 
              how we use it, and your rights.
            </p>
            
            <h2 className="text-xl font-semibold pt-4">1. Data We Collect</h2>
            <Separator className="my-2" />
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Personal Information</strong>: Name, email, phone (if you create an account)</li>
              <li><strong>Uploaded Images</strong>: Temporarily stored for processing only</li>
              <li><strong>Usage Data</strong>: We collect basic analytics like browser type, device info, and time spent on pages</li>
            </ul>
            
            <h2 className="text-xl font-semibold pt-4">2. How We Use Your Data</h2>
            <Separator className="my-2" />
            <ul className="list-disc pl-6 space-y-1">
              <li>To provide AI-based image restoration</li>
              <li>To improve and personalize your experience</li>
              <li>To communicate important updates</li>
            </ul>
            
            <h2 className="text-xl font-semibold pt-4">3. Data Sharing</h2>
            <Separator className="my-2" />
            <ul className="list-disc pl-6 space-y-1">
              <li>We <strong>do not</strong> sell or share your personal data with third parties</li>
              <li>We may use third-party processors (e.g., Supabase) who comply with GDPR and other data protection laws</li>
            </ul>
            
            <h2 className="text-xl font-semibold pt-4">4. Cookies</h2>
            <Separator className="my-2" />
            <p>
              We use cookies to improve site performance and remember your preferences.
            </p>
            
            <h2 className="text-xl font-semibold pt-4">5. Data Security</h2>
            <Separator className="my-2" />
            <p>
              We implement standard security measures (encryption, authentication) to protect your data.
            </p>
            
            <h2 className="text-xl font-semibold pt-4">6. Your Rights</h2>
            <Separator className="my-2" />
            <ul className="list-disc pl-6 space-y-1">
              <li>You may request access, modification, or deletion of your data</li>
              <li>You may opt-out of non-essential emails</li>
            </ul>
            
            <h2 className="text-xl font-semibold pt-4">7. Data Retention</h2>
            <Separator className="my-2" />
            <p>
              Uploaded images are deleted within 24–72 hours after processing. Account data is retained until the account is deleted.
            </p>
            
            <h2 className="text-xl font-semibold pt-4">8. Third-Party Links</h2>
            <Separator className="my-2" />
            <p>
              Our site may contain links to third-party tools or sites. We are not responsible for their content or privacy practices.
            </p>
            
            <h2 className="text-xl font-semibold pt-4">9. Contact Us</h2>
            <Separator className="my-2" />
            <p>
              If you have questions about our policies, contact us at:
            </p>
            <p className="font-medium">📧 varunmg101@gmail.com</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
