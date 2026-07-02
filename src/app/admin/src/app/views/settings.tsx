'use client';

import { useState } from 'react';
import { Save, Eye, EyeOff, Loader2, Plus, Trash2, Shield, Heart, Sparkles, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { updateProfile, updateAdminCredentials } from '@/app/actions/profileActions';
import { createCredential, updateCredential, deleteCredential } from '@/app/actions/credentialActions';
import { toast } from 'sonner';

interface SettingsPageProps {
  initialProfile?: {
    name: string;
    bio: string;
    contactEmail: string;
    professions?: string;
    quote?: string;
    quoteAuthor?: string;
    heroImage1?: string;
    heroImage2?: string;
    heroImage3?: string;
    aboutQuote?: string;
    aboutText1?: string;
    aboutText2?: string;
    aboutText3?: string;
    aboutText4?: string;
    aboutImage1?: string;
    aboutImage2?: string;
    therapyIntro?: string;
    instagramUrl?: string | null;
    facebookUrl?: string | null;
    linkedinUrl?: string | null;
  };
  initialCredentials?: {
    email: string;
  };
  initialCredentialsList?: any[];
}

export function SettingsPage({ initialProfile, initialCredentials, initialCredentialsList = [] }: SettingsPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  // Profile settings
  const [name, setName] = useState(initialProfile?.name || '');
  const [bio, setBio] = useState(initialProfile?.bio || '');
  const [contactEmail, setContactEmail] = useState(initialProfile?.contactEmail || '');
  const [professions, setProfessions] = useState(initialProfile?.professions || '');
  const [quote, setQuote] = useState(initialProfile?.quote || '');
  const [quoteAuthor, setQuoteAuthor] = useState(initialProfile?.quoteAuthor || '');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Hero & About Images settings
  const [heroImage1, setHeroImage1] = useState(initialProfile?.heroImage1 || '');
  const [heroImage2, setHeroImage2] = useState(initialProfile?.heroImage2 || '');
  const [heroImage3, setHeroImage3] = useState(initialProfile?.heroImage3 || '');
  const [aboutImage1, setAboutImage1] = useState(initialProfile?.aboutImage1 || '');
  const [aboutImage2, setAboutImage2] = useState(initialProfile?.aboutImage2 || '');
  const [isSavingImages, setIsSavingImages] = useState(false);

  // Detailed Texts
  const [aboutQuote, setAboutQuote] = useState(initialProfile?.aboutQuote || '');
  const [aboutText1, setAboutText1] = useState(initialProfile?.aboutText1 || '');
  const [aboutText2, setAboutText2] = useState(initialProfile?.aboutText2 || '');
  const [aboutText3, setAboutText3] = useState(initialProfile?.aboutText3 || '');
  const [aboutText4, setAboutText4] = useState(initialProfile?.aboutText4 || '');
  const [therapyIntro, setTherapyIntro] = useState(initialProfile?.therapyIntro || '');
  const [isSavingTexts, setIsSavingTexts] = useState(false);

  // Security settings (Username/Password)
  const [adminEmail, setAdminEmail] = useState(initialCredentials?.email || '');
  const [adminPassword, setAdminPassword] = useState('');
  const [isSavingCredentials, setIsSavingCredentials] = useState(false);

  // Social Media Links
  const [instagramUrl, setInstagramUrl] = useState(initialProfile?.instagramUrl || '');
  const [facebookUrl, setFacebookUrl] = useState(initialProfile?.facebookUrl || '');
  const [linkedinUrl, setLinkedinUrl] = useState(initialProfile?.linkedinUrl || '');
  const [isSavingSocial, setIsSavingSocial] = useState(false);

  // Credentials list management state
  const [credentialsList, setCredentialsList] = useState<any[]>(initialCredentialsList);
  const [newDegree, setNewDegree] = useState('');
  const [newField, setNewField] = useState('');
  const [newInst, setNewInst] = useState('');
  const [isAddingCredential, setIsAddingCredential] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      const result = await updateProfile({
        name,
        bio,
        contactEmail,
        professions,
        quote,
        quoteAuthor,
      });

      if ('error' in result) {
        toast.error(result.error);
        return;
      }

      toast.success('Public profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleSaveImages = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingImages(true);
    try {
      const result = await updateProfile({
        name,
        bio,
        contactEmail,
        heroImage1,
        heroImage2,
        heroImage3,
        aboutImage1,
        aboutImage2,
      });

      if ('error' in result) {
        toast.error(result.error);
        return;
      }

      toast.success('Collage and content images saved successfully');
    } catch (error) {
      toast.error('Failed to update images');
    } finally {
      setIsSavingImages(false);
    }
  };

  const handleSaveTexts = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingTexts(true);
    try {
      const result = await updateProfile({
        name,
        bio,
        contactEmail,
        aboutQuote,
        aboutText1,
        aboutText2,
        aboutText3,
        aboutText4,
        therapyIntro,
      });

      if ('error' in result) {
        toast.error(result.error);
        return;
      }

      toast.success('Details and paragraphs updated successfully');
    } catch (error) {
      toast.error('Failed to update paragraphs');
    } finally {
      setIsSavingTexts(false);
    }
  };

  const handleSaveCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingCredentials(true);
    try {
      const result = await updateAdminCredentials({
        email: adminEmail,
        password: adminPassword || undefined,
      });

      if ('error' in result) {
        toast.error(result.error);
        return;
      }

      setAdminPassword('');
      toast.success('Admin credentials updated successfully');
    } catch (error) {
      toast.error('Failed to update credentials');
    } finally {
      setIsSavingCredentials(false);
    }
  };

  const handleSaveSocial = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSocial(true);
    try {
      const result = await updateProfile({
        name,
        bio,
        contactEmail,
        instagramUrl: instagramUrl || null,
        facebookUrl: facebookUrl || null,
        linkedinUrl: linkedinUrl || null,
      });

      if ('error' in result) {
        toast.error(result.error);
        return;
      }

      toast.success('Social media links updated successfully');
    } catch (error) {
      toast.error('Failed to update social links');
    } finally {
      setIsSavingSocial(false);
    }
  };

  // Credential Actions
  const handleAddCredential = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDegree || !newField || !newInst) {
      toast.error('Please fill out all fields for the credential.');
      return;
    }
    setIsAddingCredential(true);
    try {
      const result = await createCredential({
        degree: newDegree,
        field: newField,
        institution: newInst,
        order: credentialsList.length + 1,
      });

      if ('error' in result) {
        toast.error(result.error);
        return;
      }

      setCredentialsList([...credentialsList, result.data]);
      setNewDegree('');
      setNewField('');
      setNewInst('');
      toast.success('Credential added successfully');
    } catch (error) {
      toast.error('Failed to add credential');
    } finally {
      setIsAddingCredential(false);
    }
  };

  const handleDeleteCredential = async (id: number) => {
    if (!confirm('Are you sure you want to delete this credential?')) return;
    try {
      const result = await deleteCredential(id);
      if ('error' in result) {
        toast.error(result.error);
        return;
      }
      setCredentialsList(credentialsList.filter(c => c.id !== id));
      toast.success('Credential deleted successfully');
    } catch (error) {
      toast.error('Failed to delete credential');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold font-serif">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings, profile texts, collage images, and social links
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 h-auto gap-2 bg-transparent p-0">
          <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border py-2 rounded-md">General Profile</TabsTrigger>
          <TabsTrigger value="texts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border py-2 rounded-md">Detailed Texts</TabsTrigger>
          <TabsTrigger value="images" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border py-2 rounded-md">Site Images</TabsTrigger>
          <TabsTrigger value="credentials" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border py-2 rounded-md">Credentials</TabsTrigger>
          <TabsTrigger value="social" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border py-2 rounded-md">Socials & Security</TabsTrigger>
        </TabsList>

        {/* Profile & Info Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">General Profile</CardTitle>
              <CardDescription>
                Update your basic credentials, professions, and quotes displayed in the Hero banner
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input
                      id="fullname"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email Address</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="professions">Professions (separated by "|")</Label>
                  <Input
                    id="professions"
                    value={professions}
                    onChange={(e) => setProfessions(e.target.value)}
                    placeholder="Visual Artist | Interior Designer"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Intro Tagline / Bio summary</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="quote">Hero Quote</Label>
                    <Input
                      id="quote"
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quoteAuthor">Quote Author</Label>
                    <Input
                      id="quoteAuthor"
                      value={quoteAuthor}
                      onChange={(e) => setQuoteAuthor(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button type="submit" disabled={isSavingProfile}>
                    {isSavingProfile ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Profile Settings
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Detailed Texts Tab */}
        <TabsContent value="texts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Detailed Biography & Philosophy Paragraphs</CardTitle>
              <CardDescription>
                Manage the specific texts displayed in the "About Me" and "Art Therapy" sections.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveTexts} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="aboutQuote">About Welcome Quote</Label>
                  <Input
                    id="aboutQuote"
                    value={aboutQuote}
                    onChange={(e) => setAboutQuote(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aboutText1">About Paragraph 1</Label>
                  <Textarea
                    id="aboutText1"
                    value={aboutText1}
                    onChange={(e) => setAboutText1(e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aboutText2">About Paragraph 2</Label>
                  <Textarea
                    id="aboutText2"
                    value={aboutText2}
                    onChange={(e) => setAboutText2(e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aboutText3">About Paragraph 3</Label>
                  <Textarea
                    id="aboutText3"
                    value={aboutText3}
                    onChange={(e) => setAboutText3(e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aboutText4">About Paragraph 4</Label>
                  <Textarea
                    id="aboutText4"
                    value={aboutText4}
                    onChange={(e) => setAboutText4(e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="therapyIntro">Art Therapy Introduction Text</Label>
                  <Textarea
                    id="therapyIntro"
                    value={therapyIntro}
                    onChange={(e) => setTherapyIntro(e.target.value)}
                    rows={5}
                    required
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <Button type="submit" disabled={isSavingTexts}>
                    {isSavingTexts ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Detailed Paragraphs
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Site Images Tab */}
        <TabsContent value="images" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Collage & Showcase Images</CardTitle>
              <CardDescription>
                Input the URLs of the photos displayed on your landing page. Make sure they are high quality.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveImages} className="space-y-4">
                <h3 className="text-lg font-medium border-b pb-1 mt-2">Hero Section Collage</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="heroImage1">Hero Image 1 (Large - Left Collage Side)</Label>
                  <Input
                    id="heroImage1"
                    value={heroImage1}
                    onChange={(e) => setHeroImage1(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="heroImage2">Hero Image 2 (Top Right)</Label>
                    <Input
                      id="heroImage2"
                      value={heroImage2}
                      onChange={(e) => setHeroImage2(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heroImage3">Hero Image 3 (Bottom Right)</Label>
                    <Input
                      id="heroImage3"
                      value={heroImage3}
                      onChange={(e) => setHeroImage3(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      required
                    />
                  </div>
                </div>

                <h3 className="text-lg font-medium border-b pb-1 mt-6">Art Therapy Showcase Images</h3>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="aboutImage1">Therapy Image 1</Label>
                    <Input
                      id="aboutImage1"
                      value={aboutImage1}
                      onChange={(e) => setAboutImage1(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aboutImage2">Therapy Image 2</Label>
                    <Input
                      id="aboutImage2"
                      value={aboutImage2}
                      onChange={(e) => setAboutImage2(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={isSavingImages}>
                    {isSavingImages ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Update Collage Images
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Credentials Tab */}
        <TabsContent value="credentials" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {/* List Credentials */}
            <div className="md:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Current Credentials</CardTitle>
                  <CardDescription>
                    These are shown in the credentials side section under "About Me" on the website
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {credentialsList.length === 0 ? (
                    <p className="text-muted-foreground text-sm text-center py-6">No credentials listed in DB yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {credentialsList.map((c, i) => (
                        <div key={c.id} className="flex justify-between items-start p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div>
                            <span className="text-xs font-mono text-primary font-bold">{c.degree}</span>
                            <h4 className="text-sm font-semibold">{c.field}</h4>
                            <p className="text-xs text-muted-foreground">{c.institution}</p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteCredential(c.id)} className="text-red-500 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Add Credential Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Add Credential</CardTitle>
                  <CardDescription>Add a new degree or certification record</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddCredential} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="deg">Degree / Label</Label>
                      <Input
                        id="deg"
                        placeholder="e.g. Ph.D., M.A., Cert."
                        value={newDegree}
                        onChange={(e) => setNewDegree(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fld">Field of Study</Label>
                      <Input
                        id="fld"
                        placeholder="e.g. Fine Arts, Interior Design"
                        value={newField}
                        onChange={(e) => setNewField(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="inst">Institution / Accreditation Body</Label>
                      <Input
                        id="inst"
                        placeholder="e.g. Cairo University, BAAT"
                        value={newInst}
                        onChange={(e) => setNewInst(e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isAddingCredential}>
                      {isAddingCredential ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Credential
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Socials & Security Tab */}
        <TabsContent value="social" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Social Media Card */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Social Media Links</CardTitle>
                <CardDescription>
                  URLs of your profiles displayed in the contact and navigation bars
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveSocial} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram Account / URL</Label>
                    <Input
                      id="instagram"
                      type="text"
                      placeholder="e.g. @username or https://instagram.com/..."
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook URL</Label>
                    <Input
                      id="facebook"
                      type="url"
                      placeholder="https://facebook.com/..."
                      value={facebookUrl}
                      onChange={(e) => setFacebookUrl(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input
                      id="linkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/..."
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button type="submit" disabled={isSavingSocial}>
                      {isSavingSocial ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Social Links
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Login Credentials Card */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Security Settings</CardTitle>
                <CardDescription>
                  Change your admin login email/username and password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveCredentials} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Admin Login Email (Username)</Label>
                    <Input
                      id="username"
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin_password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="admin_password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Leave blank to keep current password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a6e5f] hover:text-[#1c1812]"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button type="submit" disabled={isSavingCredentials}>
                      {isSavingCredentials ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Update Credentials
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
