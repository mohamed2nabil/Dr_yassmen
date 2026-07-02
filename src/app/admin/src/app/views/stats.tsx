'use client';

import { useState } from 'react';
import { Save, Plus, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getStats, updateStat, createStat, deleteStat } from '@/app/actions/statActions';
import { toast } from 'sonner';

type StatItem = {
  id: number;
  value: string;
  label: string;
};

interface StatsPageProps {
  initialStats?: StatItem[];
}

export function StatsPage({ initialStats = [] }: StatsPageProps) {
  const [stats, setStats] = useState<StatItem[]>(initialStats);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState<Record<number, boolean>>({});
  const [isAdding, setIsAdding] = useState(false);

  // New Stat Form
  const [newValue, setNewValue] = useState('');
  const [newLabel, setNewLabel] = useState('');

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const data = await getStats();
      setStats(data);
    } catch (e) {
      toast.error('Failed to load stats');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (id: number, value: string, label: string) => {
    setIsSaving((prev) => ({ ...prev, [id]: true }));
    try {
      const result = await updateStat(id, { value, label });
      if ('error' in result) {
        toast.error(result.error);
        return;
      }
      toast.success('Stat updated successfully');
    } catch (error) {
      toast.error('Failed to update stat');
    } finally {
      setIsSaving((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newValue || !newLabel) {
      toast.error('Please enter both value and label');
      return;
    }
    setIsAdding(true);
    try {
      const result = await createStat({ value: newValue, label: newLabel });
      if ('error' in result) {
        toast.error(result.error);
        return;
      }
      
      const created = result.data;
      setStats((prev) => [...prev, created]);
      setNewValue('');
      setNewLabel('');
      toast.success('New stat added successfully');
    } catch (error) {
      toast.error('Failed to add stat');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await deleteStat(id);
      if ('error' in result) {
        toast.error(result.error);
        return;
      }
      setStats((prev) => prev.filter((item) => item.id !== id));
      toast.success('Stat deleted successfully');
    } catch (error) {
      toast.error('Failed to delete stat');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold font-serif">Stats Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage numeric values and labels for the Impact & Reach section on the homepage.
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin mb-2" />
          <p>Loading stats...</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {/* List/Edit Grid */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Impact & Reach Metrics</CardTitle>
                <CardDescription>
                  Modify the display values (e.g., "15+") and labels (e.g., "Years of Practice")
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {stats.length === 0 ? (
                  <p className="text-muted-foreground text-center py-6">No stats defined yet. Add one on the right.</p>
                ) : (
                  stats.map((stat) => (
                    <div
                      key={stat.id}
                      className="flex flex-col sm:flex-row items-end gap-4 p-4 border rounded-lg bg-card"
                    >
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={`value-${stat.id}`}>Value</Label>
                        <Input
                          id={`value-${stat.id}`}
                          value={stat.value}
                          onChange={(e) => {
                            const val = e.target.value;
                            setStats((prev) =>
                              prev.map((item) => (item.id === stat.id ? { ...item, value: val } : item))
                            );
                          }}
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={`label-${stat.id}`}>Label</Label>
                        <Input
                          id={`label-${stat.id}`}
                          value={stat.label}
                          onChange={(e) => {
                            const val = e.target.value;
                            setStats((prev) =>
                              prev.map((item) => (item.id === stat.id ? { ...item, label: val } : item))
                            );
                          }}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          onClick={() => handleUpdate(stat.id, stat.value, stat.label)}
                          disabled={isSaving[stat.id]}
                        >
                          {isSaving[stat.id] ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(stat.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Add New Card */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Add New Metric</CardTitle>
                <CardDescription>Create a new impact metric for the landing page</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdd} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newValue">Value</Label>
                    <Input
                      id="newValue"
                      placeholder="e.g. 15+, 500+, 98%"
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newLabel">Label</Label>
                    <Input
                      id="newLabel"
                      placeholder="e.g. Years of Practice"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isAdding}>
                    {isAdding ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Stat
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
