"use client";

'use client';

import { useState } from 'react';
import { Save, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully');
  };

  const handleSaveConfiguration = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Site configuration saved successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and site configuration
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile & Security</TabsTrigger>
          <TabsTrigger value="site">Site Configuration</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>

        {/* Profile & Security Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your personal information and login credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input
                        id="first-name"
                        defaultValue="Yassmin"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input
                        id="last-name"
                        defaultValue="Allam"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      defaultValue="dryassminallam"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="admin@dryassminallam.com"
                      required
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Change Password</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="Enter new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Site Configuration Tab */}
        <TabsContent value="site" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
              <CardDescription>
                Configure your website's basic information and metadata
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveConfiguration} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-title">Site Title</Label>
                    <Input
                      id="site-title"
                      defaultValue="Dr. Yassmin Allam - Portfolio"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="site-tagline">Site Tagline</Label>
                    <Input
                      id="site-tagline"
                      defaultValue="Visual Artist, Interior Designer, Art Educator & Art Therapist"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="site-description">Meta Description</Label>
                    <Input
                      id="site-description"
                      defaultValue="Explore the creative portfolio of Dr. Yassmin Allam, featuring visual art, interior design projects, art education programs, and art therapy services."
                    />
                    <p className="text-xs text-muted-foreground">
                      Used for SEO and social media previews (150-160 characters recommended)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="site-url">Site URL</Label>
                    <Input
                      id="site-url"
                      type="url"
                      defaultValue="https://www.dryassminallam.com"
                      required
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Contact Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      defaultValue="contact@dryassminallam.com"
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">WhatsApp Number</Label>
                      <Input
                        id="whatsapp"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Business Address</Label>
                    <Input
                      id="address"
                      defaultValue="123 Art Street, Creative City, CC 12345"
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Paths & URLs</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="portfolio-url">Portfolio Page URL</Label>
                    <Input
                      id="portfolio-url"
                      defaultValue="/portfolio"
                      placeholder="/portfolio"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="courses-url">Courses Page URL</Label>
                    <Input
                      id="courses-url"
                      defaultValue="/courses"
                      placeholder="/courses"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-url">Contact Page URL</Label>
                    <Input
                      id="contact-url"
                      defaultValue="/contact"
                      placeholder="/contact"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="blog-url">Blog/News Page URL</Label>
                    <Input
                      id="blog-url"
                      defaultValue="/blog"
                      placeholder="/blog"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Save Configuration
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>
                Connect your social media profiles to display on your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveConfiguration} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      type="url"
                      placeholder="https://instagram.com/username"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      type="url"
                      placeholder="https://facebook.com/username"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="behance">Behance</Label>
                    <Input
                      id="behance"
                      type="url"
                      placeholder="https://behance.net/username"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pinterest">Pinterest</Label>
                    <Input
                      id="pinterest"
                      type="url"
                      placeholder="https://pinterest.com/username"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter / X</Label>
                    <Input
                      id="twitter"
                      type="url"
                      placeholder="https://twitter.com/username"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="youtube">YouTube</Label>
                    <Input
                      id="youtube"
                      type="url"
                      placeholder="https://youtube.com/@username"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Save Social Links
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
