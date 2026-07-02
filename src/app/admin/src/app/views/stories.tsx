'use client';

import { useState } from 'react';
import { Save, Plus, Trash2, Eye, EyeOff, Loader2, Quote } from 'lucide-react';
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
import { getTherapyStories, createTherapyStory, deleteTherapyStory, updateTherapyStory, toggleTherapyStoryVisibility } from '@/app/actions/therapyStoryActions';
import { toast } from 'sonner';

interface StoriesPageProps {
  initialStories?: any[];
}

export function StoriesPage({ initialStories = [] }: StoriesPageProps) {
  const [stories, setStories] = useState<any[]>(initialStories);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [initials, setInitials] = useState('');
  const [age, setAge] = useState('');
  const [context, setContext] = useState('');
  const [quote, setQuote] = useState('');
  const [color, setColor] = useState('var(--chapter-therapy)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchStories = async () => {
    setIsLoading(true);
    try {
      const data = await getTherapyStories();
      setStories(data);
    } catch (e) {
      toast.error('Failed to load client stories');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!initials || !age || !context || !quote) {
      toast.error('All fields are required');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingId !== null) {
        // Edit Mode
        const result = await updateTherapyStory(editingId, {
          initials,
          age,
          context,
          quote,
          color,
        });

        if ('error' in result) {
          toast.error(result.error);
          return;
        }

        toast.success('Story updated successfully');
        setEditingId(null);
      } else {
        // Create Mode
        const result = await createTherapyStory({
          initials,
          age,
          context,
          quote,
          color,
          order: stories.length + 1,
        });

        if ('error' in result) {
          toast.error(result.error);
          return;
        }

        toast.success('Client story created successfully');
      }

      // Reset
      setInitials('');
      setAge('');
      setContext('');
      setQuote('');
      setColor('var(--chapter-therapy)');
      await fetchStories();
    } catch (error) {
      toast.error('Failed to save story');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (s: any) => {
    setEditingId(s.id);
    setInitials(s.initials);
    setAge(s.age);
    setContext(s.context);
    setQuote(s.quote);
    setColor(s.color);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setInitials('');
    setAge('');
    setContext('');
    setQuote('');
    setColor('var(--chapter-therapy)');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this success story?')) return;
    try {
      const result = await deleteTherapyStory(id);
      if ('error' in result) {
        toast.error(result.error);
        return;
      }
      setStories(prev => prev.filter(s => s.id !== id));
      toast.success('Client story deleted successfully');
    } catch (e) {
      toast.error('Failed to delete story');
    }
  };

  const handleToggleHide = async (id: number) => {
    try {
      const result = await toggleTherapyStoryVisibility(id);
      if ('error' in result) {
        toast.error(result.error);
        return;
      }
      const updated = result.data;
      setStories(prev => prev.map(s => s.id === id ? { ...s, isVisible: updated.isVisible } : s));
      toast.success(`Client voice is now ${updated.isVisible ? 'visible' : 'hidden'} on the website`);
    } catch (e) {
      toast.error('Failed to toggle visibility');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold font-serif">Client Success Stories</h1>
        <p className="text-muted-foreground mt-1">
          Manage clinical success stories and testimonials for the Art Therapy department
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Stories List */}
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Current Success Stories</CardTitle>
              <CardDescription>
                All testimonials are completely anonymized to safeguard client privacy
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin mb-2" />
                  <p>Loading stories...</p>
                </div>
              ) : stories.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-12">No client stories found. Add one on the right.</p>
              ) : (
                <div className="space-y-4">
                  {stories.map((s) => {
                    const themeText = s.color.includes('therapy') ? 'Art Therapy' : s.color.includes('education') ? 'Art Education' : 'Visual Art';
                    return (
                      <div
                        key={s.id}
                        className={`p-4 border rounded-lg transition-colors flex flex-col justify-between md:flex-row md:items-start gap-4 ${
                          !s.isVisible ? 'bg-muted/40 opacity-70' : 'hover:bg-muted/30'
                        }`}
                      >
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="h-6 w-6 flex items-center justify-center rounded-full text-xs text-white font-bold" style={{ backgroundColor: s.color }}>
                              {s.initials.charAt(0)}
                            </span>
                            <span className="text-sm font-semibold">{s.initials}</span>
                            <span className="text-xs text-muted-foreground">Age {s.age}</span>
                            <span className="text-xs px-2.5 py-0.5 rounded-full border bg-muted/20 font-mono">{s.context}</span>
                            <span className="text-xs px-2.5 py-0.5 rounded-full text-white font-mono text-[10px]" style={{ backgroundColor: s.color }}>{themeText}</span>
                          </div>
                          
                          <blockquote className="text-sm italic text-muted-foreground leading-relaxed border-l-2 pl-3 mt-1.5">
                            "{s.quote}"
                          </blockquote>
                        </div>

                        <div className="flex md:flex-col items-center gap-2 justify-end border-t pt-2 md:border-none md:pt-0">
                          <Button variant="outline" size="sm" className="w-full md:w-auto" onClick={() => handleEdit(s)}>
                            Edit
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleToggleHide(s.id)} title="Toggle Visibility">
                            {s.isVisible ? <Eye className="h-4 w-4 text-green-600" /> : <EyeOff className="h-4 w-4 text-red-500" />}
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)} className="text-red-500 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Form Column */}
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="font-serif">
                {editingId !== null ? 'Edit Story' : 'Create Story'}
              </CardTitle>
              <CardDescription>
                {editingId !== null ? 'Modify details of client feedback' : 'Record an anonymized client therapeutic voice'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="initials">Initials</Label>
                    <Input
                      id="initials"
                      placeholder="e.g. S.M."
                      value={initials}
                      onChange={(e) => setInitials(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      placeholder="e.g. 34"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="context">Clinical Context</Label>
                  <Input
                    id="context"
                    placeholder="e.g. Grief Processing, Anxiety"
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quote">Client Quote</Label>
                  <Textarea
                    id="quote"
                    placeholder="Input detailed success story..."
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    rows={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme">Visual Theme / Category Color</Label>
                  <Select value={color} onValueChange={setColor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="var(--chapter-therapy)">Art Therapy (Green)</SelectItem>
                      <SelectItem value="var(--chapter-education)">Art Education (Orange)</SelectItem>
                      <SelectItem value="var(--chapter-art)">Visual Art (Teal)</SelectItem>
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
                        {editingId !== null ? 'Update Story' : 'Create Story'}
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
