import { useQuery } from 'react-query';

async function getNotes() {
  const response = await fetch('/api/notes');
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Error fetching notes: ${response.statusText}`);
  }
}

export function useNotes() {
  const { data, status, error } = useQuery('/notes', getNotes);

  return {
    notes: data,
    status,
    error,
  };
}
