import { useEffect, useState } from 'react';

export default function GetStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch('http://localhost:3000/students');
        if (!res.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto' }}>
      <h2>All Students</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Registration Number</th>
              <th>Course</th>
              <th>Course Grade</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>No students found.</td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>{student.registrationNumber}</td>
                  <td>{student.course}</td>
                  <td>{student.courseGrade}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}