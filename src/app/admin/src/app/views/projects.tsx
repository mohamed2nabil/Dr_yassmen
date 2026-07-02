'use client';

import { useState } from 'react';
import { MoreHorizontal, Eye, Search, EyeOff, Plus, Trash2, Loader2 } from 'lucide-react';
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
import { AddProjectDialog } from '@/components/projects/add-project-dialog';
import { Project, ProjectCategory } from '@/types/dashboard';
import { getProjects, deleteProject, toggleProjectVisibility } from '@/app/actions/projectActions';
import { toast } from 'sonner';

interface ProjectsPageProps {
  initialProjects?: any[];
}

export function ProjectsPage({ initialProjects = [] }: ProjectsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ProjectCategory | 'All'>('All');
  
  const mapProjects = (list: any[]): Project[] => {
    return list.map((p) => ({
      id: String(p.id),
      title: p.title,
      description: p.description,
      category: p.category as ProjectCategory,
      thumbnail: p.mainImage,
      date: p.dateLocation,
      beforeImage: p.beforeImage || undefined,
      afterImage: p.afterImage || undefined,
      isVisible: p.isVisible,
    }));
  };

  const [projects, setProjects] = useState<Project[]>(() => mapProjects(initialProjects));
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllProjects = async () => {
    setIsLoading(true);
    try {
      const data = await getProjects();
      setProjects(mapProjects(data));
    } catch (e) {
      toast.error('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteProject(Number(id));
      if ('error' in result) {
        toast.error(result.error);
        return;
      }
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.success('Project deleted successfully');
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  const handleToggleHide = async (id: string) => {
    try {
      const result = await toggleProjectVisibility(Number(id));
      if ('error' in result) {
        toast.error(result.error);
        return;
      }
      
      const updated = result.data;
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isVisible: updated.isVisible } : p))
      );
      toast.success(
        `Project visibility updated. It is now ${
          updated.isVisible ? 'visible' : 'hidden'
        } on the website.`
      );
    } catch (error) {
      toast.error('Failed to toggle project visibility');
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || project.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: ProjectCategory) => {
    const colors = {
      'Visual Art': 'bg-purple-100 text-purple-700',
      'Interior Design': 'bg-blue-100 text-blue-700',
      'Art Education': 'bg-green-100 text-green-700',
      'Art Therapy': 'bg-amber-100 text-amber-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold font-serif">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your portfolio projects across all specializations
          </p>
        </div>
        <AddProjectDialog onProjectAdded={fetchAllProjects} />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={categoryFilter}
          onValueChange={(value) => setCategoryFilter(value as ProjectCategory | 'All')}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            <SelectItem value="Visual Art">Visual Art</SelectItem>
            <SelectItem value="Interior Design">Interior Design</SelectItem>
            <SelectItem value="Art Education">Art Education</SelectItem>
            <SelectItem value="Art Therapy">Art Therapy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Projects Table */}
      <div className="rounded-lg border bg-card">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mb-2" />
            <p>Loading projects...</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Thumbnail</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location & Date</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No projects found
                  </TableCell>
                </TableRow>
              ) : (
                filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="h-12 w-16 rounded object-cover border"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{project.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {project.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getCategoryColor(project.category)}>
                        {project.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{project.date}</TableCell>
                    <TableCell>
                      {project.isVisible ? (
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
                          <DropdownMenuItem onClick={() => handleToggleHide(project.id)}>
                            {project.isVisible ? (
                              <>
                                <EyeOff className="mr-2 h-4 w-4" />
                                Hide from Portfolio
                              </>
                            ) : (
                              <>
                                <Eye className="mr-2 h-4 w-4" />
                                Show on Portfolio
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(project.id)}
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
      {!isLoading && filteredProjects.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
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