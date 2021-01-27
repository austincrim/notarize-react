import { useQuery, useMutation, useQueryClient } from 'react-query';

async function getNotes() {
  const response = await fetch('/api/notes');
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Error fetching notes: ${response.statusText}`);
  }
}

async function addNote(note) {
  await fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
}

async function saveNote(note) {
  await fetch('/api/notes', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
}

async function deleteNote(id) {
  await fetch('/api/notes', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
}

export function useNotes() {
  const client = useQueryClient();
  const { data, status, error } = useQuery('/notes', getNotes);

  const addMutation = useMutation(addNote, {
    onSuccess: () => client.invalidateQueries('/notes'),
  });

  const saveMutation = useMutation(saveNote, {
    onSuccess: () => client.invalidateQueries('/notes'),
  });

  const deleteMutation = useMutation(deleteNote, {
    onSuccess: () => client.invalidateQueries('/notes'),
  });

  return {
    notes: data,
    addMutation,
    saveMutation,
    deleteMutation,
    status,
    error,
  };
}
