import { useState, useEffect } from 'react';
import { getConcepts, createConcept, updateConcept, deleteConcept, type Concept } from '@/lib/api';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Brain } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

const Manage = () => {
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingConcept, setEditingConcept] = useState<Concept | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    example_text: '',
    image_url: '',
    category: 'general',
    difficulty_level: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
  });

  useEffect(() => {
    loadConcepts();
  }, []);

  async function loadConcepts() {
    try {
      setLoading(true);
      const data = await getConcepts();
      setConcepts(data);
    } catch (err: any) {
      showError('Failed to load concepts');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editingConcept) {
        await updateConcept(editingConcept.id, formData);
        showSuccess('Concept updated successfully');
      } else {
        await createConcept(formData);
        showSuccess('Concept created successfully');
      }
      
      await loadConcepts();
      setIsDialogOpen(false);
      resetForm();
    } catch (err: any) {
      showError('Failed to save concept');
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this concept?')) return;
    
    try {
      await deleteConcept(id);
      showSuccess('Concept deleted successfully');
      await loadConcepts();
    } catch (err: any) {
      showError('Failed to delete concept');
    }
  }

  function resetForm() {
    setFormData({
      title: '',
      description: '',
      example_text: '',
      image_url: '',
      category: 'general',
      difficulty_level: 'beginner',
    });
    setEditingConcept(null);
  }

  function openEditDialog(concept: Concept) {
    setEditingConcept(concept);
    setFormData({
      title: concept.title,
      description: concept.description,
      example_text: concept.example_text || '',
      image_url: concept.image_url || '',
      category: concept.category || 'general',
      difficulty_level: concept.difficulty_level || 'beginner',
    });
    setIsDialogOpen(true);
  }

  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Brain className="text-purple-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Manage Concepts</h1>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="flex items-center gap-2">
                <Plus size={20} />
                Add Concept
              </Button>
            </DialogTrigger>
            
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingConcept ? 'Edit Concept' : 'Add New Concept'}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Concept Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    required
                  />
                </div>
                
                <div>
                  <Textarea
                    placeholder="Example (optional)"
                    value={formData.example_text}
                    onChange={(e) => setFormData({ ...formData, example_text: e.target.value })}
                    rows={2}
                  />
                </div>
                
                <div>
                  <Input
                    placeholder="Image URL (optional)"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="programming">Programming</SelectItem>
                        <SelectItem value="language">Language</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="art">Art</SelectItem>
                        <SelectItem value="philosophy">Philosophy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Select value={formData.difficulty_level} onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => setFormData({ ...formData, difficulty_level: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingConcept ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {concepts.map((concept) => (
            <Card key={concept.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{concept.title}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(concept)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(concept.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Badge className={difficultyColor[concept.difficulty_level]}>
                    {concept.difficulty_level}
                  </Badge>
                  <Badge variant="outline">{concept.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {concept.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {concepts.length === 0 && (
          <div className="text-center py-12">
            <Brain className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No concepts yet</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first learning concept</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Manage;