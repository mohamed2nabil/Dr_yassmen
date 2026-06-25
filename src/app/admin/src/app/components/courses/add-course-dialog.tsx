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
import { createCourse } from '@/app/actions/courseActions';
import { UploadButton } from '@/utils/uploadthing';
import { toast } from 'sonner';

interface AddCourseDialogProps {
  onCourseAdded?: () => void;
}

export function AddCourseDialog({ onCourseAdded }: AddCourseDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [capacity, setCapacity] = useState('20');
  const [status, setStatus] = useState('Draft');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !date || !duration || !imageUrl) {
      toast.error('Please fill in all required fields and upload the course image.');
      return;
    }

    setIsSubmitting(true);
    try {
      await createCourse({
        title,
        description,
        category: 'Art Education', // Default category or could add a selector if needed, but let's default to a logical category.
        date,
        duration,
        capacity: Number(capacity),
        status,
        imageUrl,
      });

      toast.success('Course created successfully');
      setOpen(false);
      // Reset form
      setTitle('');
      setDescription('');
      setDate('');
      setDuration('');
      setCapacity('20');
      setStatus('Draft');
      setImageUrl('');

      if (onCourseAdded) {
        onCourseAdded();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to create course');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Course
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Course</DialogTitle>
          <DialogDescription>
            Create a new course offering. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="course-title">Course Title *</Label>
              <Input
                id="course-title"
                placeholder="Enter course title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="course-description">Detailed Description *</Label>
              <Textarea
                id="course-description"
                placeholder="Describe what students will learn..."
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="course-date">Start Date *</Label>
                <Input
                  id="course-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="course-duration">Duration *</Label>
                <Input
                  id="course-duration"
                  placeholder="e.g., 8 weeks"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="course-capacity">Capacity *</Label>
                <Input
                  id="course-capacity"
                  type="number"
                  min="1"
                  placeholder="Maximum students"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="course-status">Status *</Label>
                <Select value={status} onValueChange={setStatus} required>
                  <SelectTrigger id="course-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Course Image *</Label>
              <div className="flex flex-col items-center justify-center border border-dashed rounded-lg p-4 bg-muted/20">
                {imageUrl ? (
                  <div className="relative w-full max-w-xs aspect-video rounded overflow-hidden mb-2">
                    <img src={imageUrl} alt="Course Preview" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  </div>
                ) : null}
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res[0]) {
                      setImageUrl(res[0].url);
                      toast.success('Course image uploaded successfully');
                    }
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`Upload failed: ${error.message}`);
                  }}
                />
              </div>
            </div>
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
                'Create Course'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
