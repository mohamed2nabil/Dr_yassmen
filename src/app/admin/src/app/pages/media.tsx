"use client";

'use client';

import { useState } from 'react';
import { Upload, Trash2, Search, Image as ImageIcon, MoreHorizontal, Eye, EyeOff, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { mockMedia } from '@/lib/mock-data';
import { MediaItem } from '@/types/dashboard';
import { toast } from 'sonner';

// Extended MediaItem type with category
type ExtendedMediaItem = MediaItem & { category: string };

const mockExtendedMedia: ExtendedMediaItem[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400',
    name: 'hero-background-1.jpg',
    uploadDate: '2024-06-01',
    size: '2.4 MB',
    category: 'Hero Section',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400',
    name: 'studio-workspace.jpg',
    uploadDate: '2024-05-28',
    size: '1.8 MB',
    category: 'Visual Art',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400',
    name: 'artwork-sample.jpg',
    uploadDate: '2024-05-20',
    size: '3.1 MB',
    category: 'Visual Art',
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400',
    name: 'therapy-session.jpg',
    uploadDate: '2024-05-15',
    size: '2.2 MB',
    category: 'Courses',
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400',
    name: 'interior-design-showcase.jpg',
    uploadDate: '2024-05-10',
    size: '2.7 MB',
    category: 'Interior Design',
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400',
    name: 'children-art-class.jpg',
    uploadDate: '2024-05-05',
    size: '1.9 MB',
    category: 'Courses',
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    name: 'modern-interior-living.jpg',
    uploadDate: '2024-04-28',
    size: '2.5 MB',
    category: 'Interior Design',
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400',
    name: 'abstract-painting-course.jpg',
    uploadDate: '2024-04-15',
    size: '2.0 MB',
    category: 'Visual Art',
  },
];

export function MediaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [media, setMedia] = useState<ExtendedMediaItem[]>(mockExtendedMedia);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const filteredMedia = media.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string) => {
    setMedia((prev) => prev.filter((item) => item.id !== id));
    toast.success('Media file deleted successfully');
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Media file uploaded successfully');
    setUploadDialogOpen(false);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Hero Section': 'bg-purple-100 text-purple-700',
      'Visual Art': 'bg-blue-100 text-blue-700',
      'Interior Design': 'bg-green-100 text-green-700',
      'Courses': 'bg-amber-100 text-amber-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const categories = ['All', 'Hero Section', 'Visual Art', 'Interior Design', 'Courses'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Media Library</h1>
          <p className="text-muted-foreground mt-1">
            Manage images and assets used across your portfolio
          </p>
        </div>
      </div>

      {/* Media Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search media files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Media
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Media</DialogTitle>
              <DialogDescription>
                Upload images for your portfolio. Select a category to organize your media library.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpload}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="file">Select File</Label>
                  <Input id="file" type="file" accept="image/*" required />
                  <p className="text-xs text-muted-foreground">
                    Supported formats: JPG, PNG, WebP. Max size: 10MB
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file-name">File Name (optional)</Label>
                  <Input id="file-name" placeholder="Enter a custom name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select defaultValue="Hero Section" required>
                    <SelectTrigger id="category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hero Section">Hero Section</SelectItem>
                      <SelectItem value="Visual Art">Visual Art</SelectItem>
                      <SelectItem value="Interior Design">Interior Design</SelectItem>
                      <SelectItem value="Courses">Courses</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Choose where this image will be used
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Upload</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category Tabs */}
      <Tabs value={categoryFilter} onValueChange={setCategoryFilter} className="space-y-6">
        <TabsList className="w-full justify-start overflow-x-auto">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat} className="flex-shrink-0">
              {cat}
              {cat !== 'All' && (
                <Badge variant="secondary" className="ml-2">
                  {media.filter((m) => m.category === cat).length}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={categoryFilter} className="mt-6">
          {/* Media Grid */}
          {filteredMedia.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <ImageIcon className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
                <p className="text-lg font-medium mb-1">No media files found</p>
                <p className="text-sm text-muted-foreground mb-4">
                  {categoryFilter === 'All'
                    ? 'Upload your first image to get started'
                    : `No images in the "${categoryFilter}" category`}
                </p>
                <Button onClick={() => setUploadDialogOpen(true)}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Media
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredMedia.map((item) => (
                <Card key={item.id} className="overflow-hidden group">
                  <div className="relative aspect-video">
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => window.open(item.url, '_blank')}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Full Size
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <EyeOff className="mr-2 h-4 w-4" />
                            Hide from Library
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm font-medium truncate mb-2">{item.name}</p>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className={getCategoryColor(item.category)}>
                        {item.category}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item.size}</span>
                      <span>
                        {new Date(item.uploadDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      {filteredMedia.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredMedia.length} of {media.length} media files
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
