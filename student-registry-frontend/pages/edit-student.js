import { useState } from 'react';

export default function EditStudent() {
  const [id, setId] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    registrationNumber: '',
    course: '',
    courseGrade: '',
  });
  const [message, setMessage] = useState('');
  const [loaded, setLoaded] = useState(false);

  const handleIdSearch = async () => {
    setMessage('');
    setLoaded(false);
    if (!id) {
      setMessage('Please enter a student ID.');
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/students/${id}`);
      if (!res.ok) {
        setMessage('Student not found.');
        return;
      }
      const data = await res.json();
      setForm({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        age: data.age,
        registrationNumber: data.registrationNumber,
        course: data.course,
        courseGrade: data.courseGrade,
      });
      setLoaded(true);
    } catch {
      setMessage('Error fetching student.');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(`http://localhost:3000/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, age: Number(form.age) }),
      });
      if (res.ok) {
        setMessage('Student updated successfully.');
      } else {
        const data = await res.json();
        setMessage(data.message || 'Failed to update student.');
      }
    } catch {
      setMessage('Error updating student.');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto' }}>
      <h2>Edit Student</h2>
      <div>
        <label>
          Student ID:
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={{ marginLeft: 10 }}
          />
        </label>
        <button type="button" onClick={handleIdSearch} style={{ marginLeft: 10 }}>
          Load Student
        </button>
      </div>
      {loaded && (
        <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
          <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
          <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required style={{ marginLeft: 10 }} />
          <br /><br />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} required style={{ marginLeft: 10 }} />
          <br /><br />
          <input name="registrationNumber" placeholder="Registration Number" value={form.registrationNumber} onChange={handleChange} required />
          <input name="course" placeholder="Course" value={form.course} onChange={handleChange} required style={{ marginLeft: 10 }} />
          <br /><br />
          <input name="courseGrade" placeholder="Course Grade" value={form.courseGrade} onChange={handleChange} required />
          <br /><br />
          <button type="submit">Update Student</button>
        </form>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}