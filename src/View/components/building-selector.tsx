'use client';

import React from "react";
import { useRouter } from 'next/navigation';
import './selector.css'; // Importando o CSS

const buildings = [
  { id: 'A', name: 'Prédio A', floors: ['Ver armários' ] },
  { id: 'B', name: 'Prédio B', floors: ['Ver armários'] },
  { id: 'C', name: 'Prédio C', floors: ['Ver armários'] },
  { id: 'D', name: 'Prédio D', floors: ['Ver armários'] },
];

export default function BuildingSelector() {
  const router = useRouter();

  const handleSelect = (buildingId: string, floor: string) => {
    console.log("id",buildingId)
    router.push(`/lockers/${buildingId}/${floor.replace('º', '')}`);
  };

  return (
    <div className="building-selector-container">
      <header className="header">
        <div className="logo">
          <img src="/logo.png" alt="CIMOL Logo" className="logo-image" />
          <h1>CIMOL</h1>
        </div>
        <button className="logout-button">Logado</button>
      </header>
      <div className="content">
        <h2 className="title">ARMÁRIOS</h2>
        <p className="subtitle">Bem vindo, ciclano! Selecione o Prédio e andar que deseja ver!</p>
        <div className="grid">
          {buildings.map((building) => (
            <div key={building.id} className="card">
              <h3 className="building-name">{building.name}</h3>
              <div className="floors">
                {building.floors.map((floor) => (
                  <button
                    key={floor}
                    className="floor-button"
                    onClick={() => handleSelect(building.id, floor)}
                  >
                    {floor}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
