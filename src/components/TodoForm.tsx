import React, { useState } from 'react';
import { useAddTodoMutation } from '../lib/api';

const TodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [addTodo, { isLoading, error }] = useAddTodoMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      // Panggil mutation untuk POST todo baru
      await addTodo({ title }).unwrap();
      setTitle('');
      alert('Todo added successfully! (Note: jsonplaceholder is a fake API, so the data is not actually persisted.)');
    } catch (err) {
      console.error('Failed to add todo: ', err);
      alert('Failed to add todo.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Todo</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Todo title"
        required
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Todo'}
      </button>
      {error && <p style={{ color: 'red' }}>Error posting data.</p>}
    </form>
  );
};

export default TodoForm;