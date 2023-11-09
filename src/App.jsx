import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    sex: '',
    id: '', // Nuevo campo para el ID
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://192.168.25.187/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newStudent = await response.json();
        console.log('Nuevo estudiante agregado:', newStudent);
        setStudents([...students, newStudent]);
      } else {
        console.error('Error al agregar estudiante:', response.statusText);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };


  const handleUpdate = async () => {
    if (!formData.id) {
      console.error('Por favor, ingresa un ID válido.');
      return;
    }

    try {
      const response = await fetch(`http://192.168.25.187/students/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedStudent = await response.json();
        console.log('Estudiante actualizado:', updatedStudent);

        // Actualiza la lista de estudiantes reemplazando el estudiante con el mismo ID.
        const updatedStudents = students.map((student) =>
          student.id === updatedStudent.id ? updatedStudent : student
        );

        setStudents(updatedStudents);
      } else {
        console.error('Error al actualizar estudiante:', response.statusText);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud de actualización:', error);
    }
  };

  const handleDelete = async () => {
    if (!formData.id) {
      console.error('Por favor, ingresa un ID válido.');
      return;
    }
  
    try {
      const response = await fetch(`http://192.168.25.187/students/${formData.id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log(`Estudiante con ID ${formData.id} eliminado correctamente.`);
        // Actualiza la lista de estudiantes excluyendo el estudiante con el ID especificado.
        const updatedStudents = students.filter((student) => student.id !== formData.id);
        setStudents(updatedStudents);
      } else {
        console.error(`Error al eliminar estudiante con ID ${formData.id}:`, response.statusText);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud de eliminación:', error);
    }
  };
  

  useEffect(() => {
    // Realiza una solicitud GET a la API y actualiza el estado 'students' con los datos.
    fetch('http://192.168.25.187/students')
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error al obtener los datos:', error));

      
  }, []);


  return (
    <>
      <div>
        <h1>Formulario de Datos Personales</h1>
        <form >
          <div>
            <label htmlFor="name">Id:</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="lastname">Apellido:</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="sex">Sexo:</label>
            <select
              id="sex"
              name="sex"
              value={formData.sex}
              onChange={handleInputChange}
            >
              <option value="">Selecciona el sexo</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <button type="submit" onClick={handleAdd}>Enviar</button>
          <button type="submit" onClick={handleUpdate} >Actualizar</button>
          <button type="submit" onClick={handleDelete} >Eliminar</button>
        </form>
      </div>


      <h2>Tabla de Estudiantes</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Sexo</th>
          </tr>
        </thead>
        <tbody>
         
          {students.map((student) => (
            <tr key={student.idstudent}>
              <td>{student.idstudent}</td>
              <td>{student.name}</td>
              <td>{student.lastname}</td>
              <td>{student.sex}</td>
            </tr>
          ))}
        </tbody>
      </table>


    </>
  )
}

export default App
