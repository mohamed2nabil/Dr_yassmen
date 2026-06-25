'use client';

import { useState } from 'react';
import { Plus, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ProjectCategory } from '@/types/dashboard';
import { createProject } from '@/app/actions/projectActions';
import { UploadButton } from '@/utils/uploadthing';
import { toast } from 'sonner';

interface AddProjectDialogProps {
  onProjectAdded?: () => void;
}

export function AddProjectDialog({ onProjectAdded }: AddProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ProjectCategory | ''>('');
  const [dateLocation, setDateLocation] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [beforeImage, setBeforeImage] = useState('');
  const [afterImage, setAfterImage] = useState('');
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);

  const handleCategoryChange = (value: string) => {
    setCategory(value as ProjectCategory);
    setShowBeforeAfter(value === 'Interior Design');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !category || !dateLocation || !mainImage) {
      toast.error('Please fill in all required fields and upload the main image.');
      return;
    }

    setIsSubmitting(true);
    try {
      await createProject({
        title,
        category,
        description,
        dateLocation,
        mainImage,
        beforeImage: showBeforeAfter ? beforeImage : undefined,
        afterImage: showBeforeAfter ? afterImage : undefined,
      });

      toast.success('Project created successfully');
      setOpen(false);
      // Reset form
      setTitle('');
      setDescription('');
      setCategory('');
      setDateLocation('');
      setMainImage('');
      setBeforeImage('');
      setAfterImage('');
      setShowBeforeAfter(false);

      if (onProjectAdded) {
        onProjectAdded();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to create project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>
            Create a new project for your portfolio. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                placeholder="Enter project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your project..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={handleCategoryChange} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Visual Art">Visual Art</SelectItem>
                  <SelectItem value="Interior Design">Interior Design</SelectItem>
                  <SelectItem value="Art Education">Art Education</SelectItem>
                  <SelectItem value="Art Therapy">Art Therapy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Main Image *</Label>
              <div className="flex flex-col items-center justify-center border border-dashed rounded-lg p-4 bg-muted/20">
                {mainImage ? (
                  <div className="relative w-full max-w-xs aspect-video rounded overflow-hidden mb-2">
                    <img src={mainImage} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  </div>
                ) : null}
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res[0]) {
                      setMainImage(res[0].url);
                      toast.success('Main image uploaded successfully');
                    }
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`Upload failed: ${error.message}`);
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateLocation">Project Location & Date * (e.g., Cairo 2023)</Label>
              <Input
                id="dateLocation"
                placeholder="e.g. Cairo 2023"
                value={dateLocation}
                onChange={(e) => setDateLocation(e.target.value)}
                required
              />
            </div>

            {category === 'Interior Design' && (
              <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Before & After Images</Label>
                    <p className="text-xs text-muted-foreground">
                      Add transformation photos for interior design projects
                    </p>
                  </div>
                  <Switch
                    checked={showBeforeAfter}
                    onCheckedChange={setShowBeforeAfter}
                  />
                </div>

                {showBeforeAfter && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Before Image</Label>
                      <div className="flex flex-col items-center justify-center border border-dashed rounded-lg p-3 bg-muted/10">
                        {beforeImage ? (
                          <div className="relative w-full aspect-video rounded overflow-hidden mb-2">
                            <img src={beforeImage} alt="Before" className="w-full h-full object-cover" />
                          </div>
                        ) : null}
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            if (res && res[0]) {
                              setBeforeImage(res[0].url);
                              toast.success('Before image uploaded');
                            }
                          }}
                          onUploadError={(error: Error) => {
                            toast.error(`Upload failed: ${error.message}`);
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>After Image</Label>
                      <div className="flex flex-col items-center justify-center border border-dashed rounded-lg p-3 bg-muted/10">
                        {afterImage ? (
                          <div className="relative w-full aspect-video rounded overflow-hidden mb-2">
                            <img src={afterImage} alt="After" className="w-full h-full object-cover" />
                          </div>
                        ) : null}
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            if (res && res[0]) {
                              setAfterImage(res[0].url);
                              toast.success('After image uploaded');
                            }
                          }}
                          onUploadError={(error: Error) => {
                            toast.error(`Upload failed: ${error.message}`);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Project'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
