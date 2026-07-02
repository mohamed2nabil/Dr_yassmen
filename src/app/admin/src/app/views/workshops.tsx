'use client';

import { useState } from 'react';
import { Save, Plus, Trash2, Eye, EyeOff, Loader2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getWorkshops, createWorkshop, deleteWorkshop, updateWorkshop, toggleWorkshopVisibility } from '@/app/actions/workshopActions';
import { toast } from 'sonner';

interface WorkshopsPageProps {
  initialWorkshops?: any[];
}

export function WorkshopsPage({ initialWorkshops = [] }: WorkshopsPageProps) {
  const [workshops, setWorkshops] = useState<any[]>(initialWorkshops);
  const [isLoading, setIsLoading] = useState(false);

  // New/Edit Workshop state
  const [title, setTitle] = useState('');
  const [arabicTitle, setArabicTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sessions, setSessions] = useState('');
  const [format, setFormat] = useState('');
  const [iconName, setIconName] = useState('Heart');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchWorkshops = async () => {
    setIsLoading(true);
    try {
      const data = await getWorkshops();
      setWorkshops(data);
    } catch (e) {
      toast.error('Failed to load workshops');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !arabicTitle || !description || !sessions || !format) {
      toast.error('All fields are required');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingId !== null) {
        // Edit Mode
        const result = await updateWorkshop(editingId, {
          title,
          arabicTitle,
          description,
          sessions,
          format,
          iconName,
        });

        if ('error' in result) {
          toast.error(result.error);
          return;
        }

        toast.success('Workshop updated successfully');
        setEditingId(null);
      } else {
        // Create Mode
        const result = await createWorkshop({
          title,
          arabicTitle,
          description,
          sessions,
          format,
          iconName,
          order: workshops.length + 1,
        });

        if ('error' in result) {
          toast.error(result.error);
          return;
        }

        toast.success('Workshop created successfully');
      }

      // Reset Form & reload
      setTitle('');
      setArabicTitle('');
      setDescription('');
      setSessions('');
      setFormat('');
      setIconName('Heart');
      await fetchWorkshops();
    } catch (error) {
      toast.error('Failed to save workshop');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (w: any) => {
    setEditingId(w.id);
    setTitle(w.title);
    setArabicTitle(w.arabicTitle);
    setDescription(w.description);
    setSessions(w.sessions);
    setFormat(w.format);
    setIconName(w.iconName);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setArabicTitle('');
    setDescription('');
    setSessions('');
    setFormat('');
    setIconName('Heart');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this workshop?')) return;
    try {
      const result = await deleteWorkshop(id);
      if ('error' in result) {
        toast.error(result.error);
        return;
      }
      setWorkshops(prev => prev.filter(w => w.id !== id));
      toast.success('Workshop deleted successfully');
    } catch (e) {
      toast.error('Failed to delete workshop');
    }
  };

  const handleToggleHide = async (id: number) => {
    try {
      const result = await toggleWorkshopVisibility(id);
      if ('error' in result) {
        toast.error(result.error);
        return;
      }
      const updated = result.data;
      setWorkshops(prev => prev.map(w => w.id === id ? { ...w, isVisible: updated.isVisible } : w));
      toast.success(`Workshop is now ${updated.isVisible ? 'visible' : 'hidden'} on the website`);
    } catch (e) {
      toast.error('Failed to toggle visibility');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold font-serif">Art Therapy Workshops</h1>
        <p className="text-muted-foreground mt-1">
          Manage the workshop programs displayed in the Art Therapy section
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Workshops List */}
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Current Workshops</CardTitle>
              <CardDescription>All clinical programs currently active or drafted</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin mb-2" />
                  <p>Loading workshops...</p>
                </div>
              ) : workshops.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-12">No workshops found. Create one on the right.</p>
              ) : (
                <div className="space-y-4">
                  {workshops.map((w) => (
                    <div
                      key={w.id}
                      className={`p-4 border rounded-lg transition-colors flex flex-col justify-between md:flex-row md:items-start gap-4 ${
                        !w.isVisible ? 'bg-muted/40 opacity-70' : 'hover:bg-muted/30'
                      }`}
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary font-semibold font-mono">{w.iconName}</span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold font-mono">{w.format}</span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent/20 text-accent font-semibold font-mono">{w.sessions}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{w.title}</h4>
                          <span className="text-sm text-accent italic font-serif">{w.arabicTitle}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{w.description}</p>
                      </div>

                      <div className="flex md:flex-col items-center gap-2 justify-end border-t pt-2 md:border-none md:pt-0">
                        <Button variant="outline" size="sm" className="w-full md:w-auto" onClick={() => handleEdit(w)}>
                          Edit
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleToggleHide(w.id)} title="Toggle Visibility">
                          {w.isVisible ? <Eye className="h-4 w-4 text-green-600" /> : <EyeOff className="h-4 w-4 text-red-500" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(w.id)} className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Add/Edit Form */}
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="font-serif">
                {editingId !== null ? 'Edit Workshop' : 'Create Workshop'}
              </CardTitle>
              <CardDescription>
                {editingId !== null ? 'Update the selected clinical program' : 'Add a new clinical workshop program'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">English Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Trauma Recovery"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="arabicTitle">Arabic Title</Label>
                  <Input
                    id="arabicTitle"
                    placeholder="e.g. التعافي من الصدمات"
                    value={arabicTitle}
                    onChange={(e) => setArabicTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="desc">Description</Label>
                  <Textarea
                    id="desc"
                    placeholder="Describe the therapeutic structure..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessions">Sessions</Label>
                    <Input
                      id="sessions"
                      placeholder="e.g. 12 Sessions, Ongoing"
                      value={sessions}
                      onChange={(e) => setSessions(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="format">Format</Label>
                    <Input
                      id="format"
                      placeholder="e.g. Individual, Group"
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="iconName">Display Icon</Label>
                  <Select value={iconName} onValueChange={setIconName}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select display icon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Heart">Heart</SelectItem>
                      <SelectItem value="Shield">Shield</SelectItem>
                      <SelectItem value="Sparkles">Sparkles</SelectItem>
                      <SelectItem value="Users">Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 pt-2">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {editingId !== null ? 'Update Workshop' : 'Create Workshop'}
                      </>
                    )}
                  </Button>
                  
                  {editingId !== null && (
                    <Button type="button" variant="outline" className="w-full mt-2" onClick={handleCancelEdit}>
                      Cancel Edit
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
