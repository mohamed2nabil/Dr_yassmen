'use client';

import { useState } from 'react';
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
import { VoutItem, VoutItemType } from '@/types/vouts';
import { getProjects, toggleProjectVisibility, deleteProject } from '@/app/actions/projectActions';
import { getCourses, toggleCourseVisibility, deleteCourse } from '@/app/actions/courseActions';
import { getTestimonials, toggleTestimonialVisibility, deleteTestimonial } from '@/app/actions/voutActions';
import { toast } from 'sonner';

type ExtendedVoutItem = VoutItem & { dbId: number };

interface VoutsPageProps {
  initialProjects?: any[];
  initialCourses?: any[];
  initialTestimonials?: any[];
}

export function VoutsPage({
  initialProjects = [],
  initialCourses = [],
  initialTestimonials = [],
}: VoutsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<VoutItemType | 'All'>('All');
  const [visibilityFilter, setVisibilityFilter] = useState<'All' | 'Visible' | 'Hidden'>('All');

  const formatItems = (projectsList: any[], coursesList: any[], testimonialsList: any[]): ExtendedVoutItem[] => {
    const formattedProjects = projectsList.map((p) => ({
      id: `p-${p.id}`,
      dbId: p.id,
      type: 'project' as const,
      title: p.title,
      description: p.description,
      thumbnail: p.mainImage,
      category: p.category,
      isVisible: p.isVisible,
      lastModified: typeof p.createdAt === 'string' ? p.createdAt : p.createdAt.toISOString(),
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
      lastModified: typeof c.createdAt === 'string' ? c.createdAt : c.createdAt.toISOString(),
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
      lastModified: typeof t.createdAt === 'string' ? t.createdAt : t.createdAt.toISOString(),
    }));

    return [
      ...formattedProjects,
      ...formattedCourses,
      ...formattedTestimonials,
    ];
  };

  const [items, setItems] = useState<ExtendedVoutItem[]>(() =>
    formatItems(initialProjects, initialCourses, initialTestimonials)
  );
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllVouts = async () => {
    setIsLoading(true);
    try {
      const [projectsList, coursesList, testimonialsList] = await Promise.all([
        getProjects(),
        getCourses(),
        getTestimonials(),
      ]);
      setItems(formatItems(projectsList, coursesList, testimonialsList));
    } catch (e) {
      toast.error('Failed to load visibility control items');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleHide = async (item: ExtendedVoutItem) => {
    try {
      let result;
      if (item.type === 'project') {
        result = await toggleProjectVisibility(item.dbId);
      } else if (item.type === 'course') {
        result = await toggleCourseVisibility(item.dbId);
      } else {
        result = await toggleTestimonialVisibility(item.dbId);
      }

      if ('error' in result) {
        toast.error(result.error);
        return;
      }

      const updated = result.data;
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, isVisible: updated.isVisible } : i))
      );
      toast.success(
        `Visibility updated. It is now ${
          updated.isVisible ? 'visible' : 'hidden'
        } on the website.`
      );
    } catch (error) {
      toast.error('Failed to update visibility');
    }
  };

  const handleDelete = async (item: ExtendedVoutItem) => {
    try {
      let result;
      if (item.type === 'project') {
        result = await deleteProject(item.dbId);
      } else if (item.type === 'course') {
        result = await deleteCourse(item.dbId);
      } else {
        result = await deleteTestimonial(item.dbId);
      }

      if ('error' in result) {
        toast.error(result.error);
        return;
      }

      setItems((prev) => prev.filter((i) => i.id !== item.id));
      toast.success(`${item.type} deleted successfully`);
    } catch (error) {
      toast.error(`Failed to delete ${item.type}`);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = typeFilter === 'All' || item.type === typeFilter;

    let matchesVisibility = true;
    if (visibilityFilter === 'Visible') {
      matchesVisibility = item.isVisible;
    } else if (visibilityFilter === 'Hidden') {
      matchesVisibility = !item.isVisible;
    }

    return matchesSearch && matchesType && matchesVisibility;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold font-serif">Vouts Control</h1>
        <p className="text-muted-foreground mt-1">
          Manage landing page visibility for projects, courses, and testimonials
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search title, description or category..."
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
            <SelectValue placeholder="All types" />
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
            <SelectValue placeholder="All visibility" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Visibility</SelectItem>
            <SelectItem value="Visible">Visible Only</SelectItem>
            <SelectItem value="Hidden">Hidden Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Vouts Table */}
      <div className="rounded-lg border bg-card">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mb-2" />
            <p>Loading items...</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[85px]">Thumbnail</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Details / Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No items found
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="h-12 w-16 rounded object-cover border"
                        />
                      ) : (
                        <div className="flex h-12 w-16 items-center justify-center rounded border bg-muted text-muted-foreground font-semibold text-xs">
                          TEXT
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 max-w-[320px]">
                        <p className="font-medium truncate">{item.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">
                        {item.category || 'N/A'}
                      </span>
                    </TableCell>
                    <TableCell>
                      {item.isVisible ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Visible
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                          Hidden
                        </Badge>
                      )}
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
                          <DropdownMenuItem onClick={() => handleToggleHide(item)}>
                            {item.isVisible ? (
                              <>
                                <EyeOff className="mr-2 h-4 w-4" />
                                Hide from Homepage
                              </>
                            ) : (
                              <>
                                <Eye className="mr-2 h-4 w-4" />
                                Show on Homepage
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
