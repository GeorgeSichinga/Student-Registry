import { useState } from 'react';

export default function DeleteStudent() {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!registrationNumber) {
      setMessage('Please enter a registration number.');
      return;
    }
    try {
      // Find the student by registration number to get the id
      const resFind = await fetch(`http://localhost:3000/students?registrationNumber=${registrationNumber}`);
      const dataFind = await resFind.json();
      if (!dataFind || dataFind.length === 0) {
        setMessage('Student not found.');
        return;
      }
      const studentId = dataFind[0].id;

      const res = await fetch(`http://localhost:3000/students/${studentId}`, {
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
          Registration Number:
          <input
            type="text"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
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