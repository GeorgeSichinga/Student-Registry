import { useState } from 'react';

export default function PostStudent() {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:3000/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, age: Number(form.age) }),
      });
      if (res.ok) {
        setMessage('Student added successfully.');
        setForm({
          firstName: '',
          lastName: '',
          email: '',
          age: '',
          registrationNumber: '',
          course: '',
          courseGrade: '',
        });
      } else {
        const data = await res.json();
        setMessage(data.message || 'Failed to add student.');
      }
    } catch (error) {
      setMessage('Error adding student.');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto' }}>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add Student</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}