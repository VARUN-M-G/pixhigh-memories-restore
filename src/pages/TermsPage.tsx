
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TermsPage() {
  return (
    <MainLayout withBackground={true}>
      <Navbar />
      <div className="container mx-auto py-10 space-y-6 px-4">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Terms & Conditions</CardTitle>
            <p className="text-center text-muted-foreground">Effective Date: May 1, 2025</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <p>
              Welcome to PiXhigh! These Terms and Conditions ("Terms") govern your access to and use of the PiXhigh website 
              and associated services (the "Service") provided by PiXhigh ("we", "our", or "us").
            </p>
            <p>
              By accessing or using our Service, you agree to these Terms. If you do not agree, do not use the Service.
            </p>
            
            <h2 className="text-xl font-semibold pt-4">1. Use of Service</h2>
            <Separator className="my-2" />
            <ul className="list-disc pl-6 space-y-1">
              <li>You must be at least 13 years old to use PiXhigh.</li>
              <li>You agree to use PiXhigh only for lawful purposes and not to infringe on any third-party rights.</li>
              <li>You are responsible for the accuracy and legality of the content you upload.</li>
            </ul>
            
            <h2 className="text-xl font-semibold pt-4">2. User Content</h2>
            <Separator className="my-2" />
            <ul className="list-disc pl-6 space-y-1">
              <li>You retain all rights to the images you upload.</li>
              <li>By uploading, you grant us a limited, non-exclusive license to process and store your content for restoration and display purposes only.</li>
              <li>We do not claim ownership of your content.</li>
            </ul>
            
            <h2 className="text-xl font-semibold pt-4">3. Prohibited Uses</h2>
            <Separator className="my-2" />
            <p>You agree <strong>not</strong> to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Upload copyrighted or offensive material without permission</li>
              <li>Use the platform for illegal or unauthorized purposes</li>
              <li>Attempt to reverse-engineer or disrupt the service</li>
            </ul>
            
            <h2 className="text-xl font-semibold pt-4">4. Intellectual Property</h2>
            <Separator className="my-2" />
            <p>
              All content on the site, including UI, logos, and branding (except user uploads), is the property of PiXhigh 
              and may not be reused without permission.
            </p>
            
            <h2 className="text-xl font-semibold pt-4">5. Disclaimer</h2>
            <Separator className="my-2" />
            <p>
              PiXhigh is provided on an "as is" basis. We do not guarantee the quality, accuracy, or availability of restored images.
            </p>
            
            <h2 className="text-xl font-semibold pt-4">6. Limitation of Liability</h2>
            <Separator className="my-2" />
            <p>
              We are not liable for any damages, loss of data, or image misuse resulting from your use of the platform.
            </p>
            
            <h2 className="text-xl font-semibold pt-4">7. Account & Authentication</h2>
            <Separator className="my-2" />
            <p>
              If you register an account, you are responsible for maintaining its security. Do not share your login credentials.
            </p>
            
            <h2 className="text-xl font-semibold pt-4">8. Termination</h2>
            <Separator className="my-2" />
            <p>
              We may suspend or terminate your access if you violate these Terms.
            </p>
            
            <h2 className="text-xl font-semibold pt-4">9. Changes to Terms</h2>
            <Separator className="my-2" />
            <p>
              We may update these Terms occasionally. Continued use after changes constitutes your agreement.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
