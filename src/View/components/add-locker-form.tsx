'use client'

import React from "react";
import { useState } from 'react'

interface AddLockerFormProps {
  onSubmit: (data: {
    number: number;
    status: 'available' | 'occupied' | 'expiring' | 'overdue';
  }) => void;
}

export default function AddLockerForm({ onSubmit }: AddLockerFormProps) {
  const [formData, setFormData] = useState({
    number: '',
    status: 'available' as 'available' | 'occupied' | 'expiring' | 'overdue',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      number: parseInt(formData.number),
      status: formData.status,
    });
  };

  return (
    <div className="border rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h1 className="text-xl font-bold">Adicionar Novo Armário</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="number" className="block text-sm font-medium text-gray-700">
            Número do Armário
          </label>
          <input
            id="number"
            type="number"
            value={formData.number}
            onChange={(e) => setFormData((prev) => ({ ...prev, number: e.target.value }))}
            required
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status Inicial
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, status: e.target.value as 'available' | 'occupied' | 'expiring' | 'overdue' }))
            }
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="available">Disponível</option>
            <option value="occupied">Ocupado</option>
            <option value="expiring">Expirando</option>
            <option value="overdue">Atrasado</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Adicionar Armário
        </button>
      </form>
    </div>
  );
}
