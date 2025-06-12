import { useState } from 'react';

export default function EditStudent() {
  const [registrationNumber, setRegistrationNumber] = useState('');
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

  const handleRegSearch = async () => {
    setMessage('');
    setLoaded(false);
    if (!registrationNumber) {
      setMessage('Please enter a registration number.');
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/students?registrationNumber=${registrationNumber}`);
      if (!res.ok) {
        setMessage('Student not found.');
        return;
      }
      const data = await res.json();
      if (!data || data.length === 0) {
        setMessage('Student not found.');
        return;
      }
      const student = data[0];
      setForm({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        age: student.age,
        registrationNumber: student.registrationNumber,
        course: student.course,
        courseGrade: student.courseGrade,
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
      // Find the student by registration number to get the id
      const resFind = await fetch(`http://localhost:3000/students?registrationNumber=${registrationNumber}`);
      const dataFind = await resFind.json();
      if (!dataFind || dataFind.length === 0) {
        setMessage('Student not found.');
        return;
      }
      const studentId = dataFind[0].id;

      const res = await fetch(`http://localhost:3000/students/${studentId}`, {
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
          Registration Number:
          <input
            type="text"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            style={{ marginLeft: 10 }}
          />
        </label>
        <button type="button" onClick={handleRegSearch} style={{ marginLeft: 10 }}>
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