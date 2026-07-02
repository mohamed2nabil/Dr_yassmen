'use client';

import { useState } from 'react';
import { MoreHorizontal, Trash2, Search, Users, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { AddCourseDialog } from '@/components/courses/add-course-dialog';
import { Course, CourseStatus } from '@/types/dashboard';
import { getCourses, deleteCourse, toggleCourseVisibility } from '@/app/actions/courseActions';
import { toast } from 'sonner';

interface CoursesPageProps {
  initialCourses?: any[];
}

export function CoursesPage({ initialCourses = [] }: CoursesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<CourseStatus | 'All'>('All');

  const mapCourses = (list: any[]): Course[] => {
    return list.map((c) => ({
      id: String(c.id),
      title: c.title,
      description: c.description,
      status: c.status as CourseStatus,
      date: typeof c.date === 'string' ? c.date.split('T')[0] : c.date.toISOString().split('T')[0],
      duration: c.duration,
      capacity: c.capacity,
      enrolled: c.enrolled,
      image: c.imageUrl,
    }));
  };

  const [courses, setCourses] = useState<Course[]>(() => mapCourses(initialCourses));
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllCourses = async () => {
    setIsLoading(true);
    try {
      const data = await getCourses();
      setCourses(mapCourses(data));
    } catch (e) {
      toast.error('Failed to load courses');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteCourse(Number(id));
      if ('error' in result) {
        toast.error(result.error);
        return;
      }
      setCourses((prev) => prev.filter((c) => c.id !== id));
      toast.success('Course deleted successfully');
    } catch (error) {
      toast.error('Failed to delete course');
    }
  };

  const handleToggleHide = async (id: string) => {
    try {
      const result = await toggleCourseVisibility(Number(id));
      if ('error' in result) {
        toast.error(result.error);
        return;
      }
      
      const updated = result.data;
      toast.success(`Course is now ${updated.isVisible ? 'visible' : 'hidden'} on the website.`);
    } catch (error) {
      toast.error('Failed to toggle course visibility');
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold font-serif">Courses</h1>
          <p className="text-muted-foreground mt-1">
            Manage your course offerings and track enrollments
          </p>
        </div>
        <AddCourseDialog onCourseAdded={fetchAllCourses} />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as CourseStatus | 'All')}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Published">Published</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Courses Table */}
      <div className="rounded-lg border bg-card">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mb-2" />
            <p>Loading courses...</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Enrollment</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No courses found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCourses.map((course) => {
                  const enrollmentPercentage = (course.enrolled / course.capacity) * 100;

                  return (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="h-12 w-16 rounded object-cover border"
                          />
                          <div className="space-y-1">
                            <p className="font-medium">{course.title}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {course.description}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={course.status === 'Published' ? 'default' : 'secondary'}
                        >
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2 min-w-[160px]">
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {course.enrolled}/{course.capacity}
                            </span>
                            <span className="text-muted-foreground">
                              {Math.round(enrollmentPercentage)}%
                            </span>
                          </div>
                          <Progress value={enrollmentPercentage} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>{course.duration}</TableCell>
                      <TableCell>
                        {new Date(course.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
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
                            <DropdownMenuItem onClick={() => handleToggleHide(course.id)}>
                              <EyeOff className="mr-2 h-4 w-4" />
                              Toggle Visibility
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDelete(course.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && filteredCourses.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredCourses.length} of {courses.length} courses
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