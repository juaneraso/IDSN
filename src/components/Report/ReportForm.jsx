import React, { useState } from 'react';
import styles from './ReportForm.module.css';
import Header from '../Header/Header';

const ReportForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:4000/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el reporte.');
      }

      setSuccess(true);
      setFormData({ title: '', description: '', date: '' }); // Resetear formulario
    } catch (error) {
      console.error(error);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
     <>
      <Header/>   

    <div className={styles.formContainer}>
     
      <h2>Crear Reporte</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="date">Fecha</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Reporte'}
        </button>
      </form>
      {success === true && <p className={styles.success}>¡Reporte enviado con éxito!</p>}
      {success === false && <p className={styles.error}>Error al enviar el reporte.</p>}
    </div>
    </>
  );
};

export default ReportForm;
