'use client';

import { useState, useEffect } from 'react';
import { Search, Eye, EyeOff, MoreHorizontal, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { Switch } from '@/components/ui/switch';
import { VoutItem, VoutItemType } from '@/types/vouts';
import { getProjects, toggleProjectVisibility, deleteProject } from '@/app/actions/projectActions';
import { getCourses, toggleCourseVisibility, deleteCourse } from '@/app/actions/courseActions';
import { getTestimonials, toggleTestimonialVisibility, deleteTestimonial } from '@/app/actions/testimonialActions';
import { toast } from 'sonner';

type ExtendedVoutItem = VoutItem & { dbId: number };

export function VoutsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<VoutItemType | 'All'>('All');
  const [visibilityFilter, setVisibilityFilter] = useState<'All' | 'Visible' | 'Hidden'>('All');
  const [items, setItems] = useState<ExtendedVoutItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllVouts = async () => {
    setIsLoading(true);
    try {
      const [projectsList, coursesList, testimonialsList] = await Promise.all([
        getProjects(),
        getCourses(),
        getTestimonials(),
      ]);

      const formattedProjects = projectsList.map((p) => ({
        id: `p-${p.id}`,
        dbId: p.id,
        type: 'project' as const,
        title: p.title,
        description: p.description,
        thumbnail: p.mainImage,
        category: p.category,
        isVisible: p.isVisible,
        lastModified: p.createdAt.toISOString(),
      }));

      const formattedCourses = coursesList.map((c) => ({
        id: `c-${c.id}`,
        dbId: c.id,
        type: 'course' as const,
        title: c.title,
        description: c.description,
        thumbnail: c.imageUrl,
        category: c.category,
        isVisible: c.isVisible,
        lastModified: c.createdAt.toISOString(),
      }));

      const formattedTestimonials = testimonialsList.map((t) => ({
        id: `t-${t.id}`,
        dbId: t.id,
        type: 'testimonial' as const,
        title: t.clientName,
        description: `${t.role}: ${t.content}`,
        thumbnail: undefined,
        category: undefined,
        isVisible: t.isVisible,
        lastModified: t.createdAt.toISOString(),
      }));

      setItems([
        ...formattedProjects,
        ...formattedCourses,
        ...formattedTestimonials,
      ]);
    } catch (e) {
      toast.error('Failed to load visibility control items');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllVouts();
  }, []);

  const handleToggleVisibility = async (item: ExtendedVoutItem) => {
    try {
      if (item.type === 'project') {
        await toggleProjectVisibility(item.dbId);
      } else if (item.type === 'course') {
        await toggleCourseVisibility(item.dbId);
      } else if (item.type === 'testimonial') {
        await toggleTestimonialVisibility(item.dbId);
      }

      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, isVisible: !i.isVisible } : i))
      );
      toast.success(`${item.title} visibility updated successfully`);
    } catch (error) {
      toast.error('Failed to toggle visibility');
    }
  };

  const handleDelete = async (item: ExtendedVoutItem) => {
    try {
      if (item.type === 'project') {
        await deleteProject(item.dbId);
      } else if (item.type === 'course') {
        await deleteCourse(item.dbId);
      } else if (item.type === 'testimonial') {
        await deleteTestimonial(item.dbId);
      }

      setItems((prev) => prev.filter((i) => i.id !== item.id));
      toast.success('Item deleted successfully');
    } catch (error) {
      toast.error('Failed to delete item');
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || item.type === typeFilter;
    const matchesVisibility =
      visibilityFilter === 'All' ||
      (visibilityFilter === 'Visible' && item.isVisible) ||
      (visibilityFilter === 'Hidden' && !item.isVisible);
    return matchesSearch && matchesType && matchesVisibility;
  });

  const getTypeColor = (type: VoutItemType) => {
    const colors = {
      project: 'bg-blue-100 text-blue-700',
      image: 'bg-purple-100 text-purple-700',
      testimonial: 'bg-green-100 text-green-700',
      course: 'bg-amber-100 text-amber-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const getTypeLabel = (type: VoutItemType) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const stats = {
    total: items.length,
    visible: items.filter((i) => i.isVisible).length,
    hidden: items.filter((i) => !i.isVisible).length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Vouts - Visibility Control</h1>
        <p className="text-muted-foreground mt-1">
          Control which content appears on your live website
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Items</p>
              <p className="text-2xl font-semibold mt-1">{stats.total}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <Eye className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Visible</p>
              <p className="text-2xl font-semibold mt-1 text-green-600">{stats.visible}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Hidden</p>
              <p className="text-2xl font-semibold mt-1 text-muted-foreground">{stats.hidden}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <EyeOff className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={typeFilter}
          onValueChange={(value) => setTypeFilter(value as VoutItemType | 'All')}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            <SelectItem value="project">Projects</SelectItem>
            <SelectItem value="course">Courses</SelectItem>
            <SelectItem value="testimonial">Testimonials</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={visibilityFilter}
          onValueChange={(value) => setVisibilityFilter(value as 'All' | 'Visible' | 'Hidden')}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by visibility" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Items</SelectItem>
            <SelectItem value="Visible">Visible Only</SelectItem>
            <SelectItem value="Hidden">Hidden Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Items Table */}
      <div className="rounded-lg border bg-card">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mb-2" />
            <p>Loading visibility items...</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]"></TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No items found
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.thumbnail && (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="h-10 w-10 rounded object-cover border"
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{item.title}</p>
                        {item.description && (
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getTypeColor(item.type)}>
                        {getTypeLabel(item.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {item.category ? (
                        <span className="text-sm text-muted-foreground">{item.category}</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={item.isVisible}
                          onCheckedChange={() => handleToggleVisibility(item)}
                        />
                        <span className="text-sm">
                          {item.isVisible ? (
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              <Eye className="mr-1 h-3 w-3" />
                              Visible
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-muted text-muted-foreground">
                              <EyeOff className="mr-1 h-3 w-3" />
                              Hidden
                            </Badge>
                          )}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {new Date(item.lastModified).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleToggleVisibility(item)}>
                            {item.isVisible ? (
                              <>
                                <EyeOff className="mr-2 h-4 w-4" />
                                Hide
                              </>
                            ) : (
                              <>
                                <Eye className="mr-2 h-4 w-4" />
                                Show
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(item)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && filteredItems.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredItems.length} of {items.length} items
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
