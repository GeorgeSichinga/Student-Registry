import { useState } from 'react';

export default function DeleteStudent() {
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!id) {
      setMessage('Please enter a student ID.');
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/students/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setMessage('Student deleted successfully.');
      } else {
        const data = await res.json();
        setMessage(data.message || 'Failed to delete student.');
      }
    } catch (error) {
      setMessage('Error deleting student.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Delete Student</h2>
      <form onSubmit={handleDelete}>
        <label>
          Student ID:
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={{ marginLeft: 10 }}
          />
        </label>
        <button type="submit" style={{ marginLeft: 10 }}>
          Delete
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}