const API_URL = 'https://haix.ai/api';
const TABLE_NAME = 'concepts_k8m4n2p1';

export interface Concept {
  id: number;
  title: string;
  description: string;
  example_text?: string;
  image_url?: string;
  category: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  created_at: string;
  updated_at: string;
}

// GET all concepts
export async function getConcepts(): Promise<Concept[]> {
  const response = await fetch(`${API_URL}/${TABLE_NAME}`);
  if (!response.ok) throw new Error('Failed to fetch concepts');
  return response.json();
}

// CREATE a new concept
export async function createConcept(concept: Omit<Concept, 'id' | 'created_at' | 'updated_at'>): Promise<Concept> {
  const response = await fetch(`${API_URL}/${TABLE_NAME}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(concept),
  });
  if (!response.ok) throw new Error('Failed to create concept');
  return response.json();
}

// UPDATE a concept
export async function updateConcept(id: number, updates: Partial<Omit<Concept, 'id' | 'created_at' | 'updated_at'>>): Promise<Concept> {
  const response = await fetch(`${API_URL}/${TABLE_NAME}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error('Failed to update concept');
  return response.json();
}

// DELETE a concept
export async function deleteConcept(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${TABLE_NAME}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete concept');
}