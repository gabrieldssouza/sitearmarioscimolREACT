'use client';
import React, { useState } from 'react';
import "./forms.css"

interface RentalFormProps {
  lockerNumber: number;
  building: string;
  onSubmit: (data: {
    name: string;
    class: string;
    phone: string;
    email: string;
  }) => void;
}

export default function RentalForm({ lockerNumber, building, onSubmit }: RentalFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    phone: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="rental-form-container">
      <div className="form-header">
        <h1>Alugar Armário {lockerNumber}</h1>
        <p>Prédio: {building}</p>
      </div>
      <form onSubmit={handleSubmit} className="form-body">
        <div className="form-group">
          <label htmlFor="name">Nome do Aluno</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="class">Turma</label>
          <input
            id="class"
            type="text"
            value={formData.class}
            onChange={(e) => setFormData((prev) => ({ ...prev, class: e.target.value }))}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Telefone</label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Alugar Armário
        </button>
      </form>
    </div>
  );
}
