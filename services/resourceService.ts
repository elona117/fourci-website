
import { Resource } from '../types';

const API_BASE = process.env.NODE_ENV === 'production'
  ? '/api'
  : 'http://localhost:5000/api';

export const getResources = async (): Promise<Resource[]> => {
  try {
    const response = await fetch(`${API_BASE}/resources`);
    if (!response.ok) throw new Error('Failed to fetch resources');
    return await response.json();
  } catch (error) {
    console.error('Error fetching resources:', error);
    return [];
  }
};

export const saveResource = async (resource: Resource): Promise<void> => {
  try {
    const method = resource.id ? 'PUT' : 'POST';
    const url = resource.id
      ? `${API_BASE}/resources/${resource.id}`
      : `${API_BASE}/resources`;

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resource)
    });

    if (!response.ok) throw new Error('Failed to save resource');
  } catch (error) {
    console.error('Error saving resource:', error);
  }
};

export const deleteResource = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE}/resources/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete resource');
  } catch (error) {
    console.error('Error deleting resource:', error);
  }
};
