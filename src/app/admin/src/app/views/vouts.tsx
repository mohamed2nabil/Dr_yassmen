"use client";

'use client';

import { useState } from 'react';
import { Search, Eye, EyeOff, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
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
import { mockVoutItems } from '@/lib/mock-vouts';
import { VoutItem, VoutItemType } from '@/types/vouts';
import { toast } from 'sonner';

export function VoutsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<VoutItemType | 'All'>('All');
  const [visibilityFilter, setVisibilityFilter] = useState<'All' | 'Visible' | 'Hidden'>('All');
  const [items, setItems] = useState<VoutItem[]>(mockVoutItems);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || item.type === typeFilter;
    const matchesVisibility = 
      visibilityFilter === 'All' || 
      (visibilityFilter === 'Visible' && item.isVisible) ||
      (visibilityFilter === 'Hidden' && !item.isVisible);
    return matchesSearch && matchesType && matchesVisibility;
  });

  const handleToggleVisibility = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newVisibility = !item.isVisible;
          toast.success(
            `${item.title} is now ${newVisibility ? 'visible' : 'hidden'} on the frontend`
          );
          return { ...item, isVisible: newVisibility };
        }
        return item;
      })
    );
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success('Item deleted successfully');
  };

  const getTypeColor = (type: VoutItemType) => {
    const colors = {
      project: 'bg-blue-100 text-blue-700',
      image: 'bg-purple-100 text-purple-700',
      testimonial: 'bg-green-100 text-green-700',
      course: 'bg-amber-100 text-amber-700',
    };
    return colors[type];
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
        <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as VoutItemType | 'All')}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            <SelectItem value="project">Projects</SelectItem>
            <SelectItem value="course">Courses</SelectItem>
            <SelectItem value="image">Images</SelectItem>
            <SelectItem value="testimonial">Testimonials</SelectItem>
          </SelectContent>
        </Select>
        <Select value={visibilityFilter} onValueChange={(value) => setVisibilityFilter(value as 'All' | 'Visible' | 'Hidden')}>
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
                        className="h-10 w-10 rounded object-cover"
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
                        onCheckedChange={() => handleToggleVisibility(item.id)}
                      />
                      <span className="text-sm">
                        {item.isVisible ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
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
                        <DropdownMenuItem onClick={() => handleToggleVisibility(item.id)}>
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
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
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
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredItems.length > 0 && (
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
