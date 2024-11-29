'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './dadosGrid.css';
import axios from 'axios';

type Locker = {
  nome_aluno: string;
  armario_idarmario: number;
  status: string;
  turma_aluno: string;
  class: string;
  numero: string;
  idarmario: string;
  data_inicio: string;
  data_validade: string;
};

export default function LockerGrid({ buildingId, floor, lockersData }) {
  const [selectedLocker, setSelectedLocker] = useState<Locker | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Locker | null>(null);
  const [lockerDetails, setLockerDetails] = useState<Locker | null>(null); // Para armazenar os dados do armário
  const router = useRouter();


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR'); // Isso formata a data no formato dd/mm/yyyy
  };

  const [dataInicioFormatada, setDataInicioFormatada] = useState('');
  const [dataValidadeFormatada, setDataValidadeFormatada] = useState('');

  // Função para buscar os detalhes do armário
  const fetchLockerDetails = async (armarioId) => {
    try {
      const response = await axios.get(`http://localhost:3001/alocacao/id/${armarioId}`);
      const data = response.data;
  
      // Verifica se a data de validade já passou e atualiza o status
      const status = checkStatus(data.data_validade);
      if (status) {
        data.status = status; // Atualiza o status para "expirado" ou "atrasado"
      }
  
      setLockerDetails(data);
      setDataInicioFormatada(formatDate(data.data_inicio));
      setDataValidadeFormatada(formatDate(data.data_validade));
      console.log('armário de lugar', data); // Atualiza os dados do armário
    } catch (error) {
      console.error(error);
    }
  };
  

  const checkStatus = (dataValidade: string) => {
    const validadeDate = new Date(dataValidade);
    const currentDate = new Date();
  
    // Verifica se a data de validade já passou
    if (validadeDate < currentDate) {
      return 'atrasado'; // ou 'expirado', dependendo de como você quer chamar
    }
  
    return ''; // Se não, retorna vazio ou outro status
  };
  

  const getStatusColor = (status) => {
    switch (status) {
      case 'ocupado':
        return 'bg-red-500 hover:bg-red-600';  // Vermelho para ocupado
      case 'disponível':
        return 'bg-green-500 hover:bg-green-600';  // Verde para disponível
      case 'expirando':
        return 'bg-yellow-500 hover:bg-yellow-600';  // Amarelo para expirando
      case 'atrasado':
        return 'bg-orange-500 hover:bg-orange-600';  // Laranja para atrasado
      default:
        return 'bg-gray-500 hover:bg-gray-600';  // Cor padrão caso o status não seja reconhecido
    }
  };

  const handleLockerClick = (locker) => {
    setSelectedLocker(locker);
    setEditData(locker);
    fetchLockerDetails(locker.idarmario);
    setIsEditing(false); // Fecha a edição automaticamente ao selecionar outro armário
    console.log('Armário selecionado:', locker.idarmario);
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const postEdit = (data) => {
    console.log("editando p.2", data)
    if (selectedLocker.status == 'ocupado') {
      console.log("edit p1")
      putAlocacao(data)
    } else {
      postAlocacao(data)
    }
  };

  async function putAlocacao(data) {
    console.log("edit p2")
    const newdata = {
      dataInicio: data.data_inicio,
      dataValidade: data.data_validade,
      armarioId: data.idarmario,
      nomeAluno: data.nome_aluno,
      turmaAluno: data.turma_aluno
    };
    console.log("editando edit p.4", newdata);
    try {
      const response = await axios.put('http://localhost:3001/editarLocacao', newdata);
      console.log('Bem editado com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao editar bem:', error);
    }
  }

  async function postAlocacao(data) {
    const newdata = {
      dataInicio: data.data_inicio,
      dataValidade: data.data_validade,
      armarioId: data.idarmario,
      nomeAluno: data.nome_aluno,
      turmaAluno: data.turma_aluno
    };
    console.log("editando p.3", newdata);
    try {
      const response = await axios.post('http://localhost:3001/alocar', newdata);
      console.log('Bem criado com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao criar bem:', error);
    }
  }

  const handleSave = () => {
    if (editData) {
      console.log("editando p.1", editData);
      postEdit(editData);
      setIsEditing(false);
    }
  };

  const handleInputChange = (field: keyof Locker, value: string) => {
    setEditData((prev) => prev && { ...prev, [field]: value });
  };

  // Função para atualizar as datas
  const handleDateChange = (field: 'data_inicio' | 'data_validade', value: string) => {
    // Atualiza diretamente no editData
    setEditData((prev) => prev && { ...prev, [field]: value });
    // Atualiza o formato das datas também
    if (field === 'data_inicio') {
      setDataInicioFormatada(formatDate(value));
    } else if (field === 'data_validade') {
      setDataValidadeFormatada(formatDate(value));
    }
  };

  return (
    <div className="locker-grid-container">
      <header className="header">
        <div className="logo">
          <img src="/logo.png" alt="CIMOL" />
          <h1>CIMOL</h1>
        </div>
        <button className="login-button">Sair</button>
      </header>

      <div className="main-content">
        <div className="header-content">
          <h1 className="title">Armários - Prédio {buildingId}</h1>
          <button
            className="back-button"
            onClick={() => router.push('/buildings')}
          >
            Voltar
          </button>
        </div>

        <div className="lockers-section">
          <h2 className="section-title">Armários prédio {buildingId}</h2>
          <div className="lockers-grid">
  {lockersData.map((arma) => {
    const status = checkStatus(arma.data_validade);
    const finalStatus = status || arma.status;  // Se o status já foi atualizado para expirado, use-o, caso contrário, use o status original

    return (
      <button
        key={arma.numero}
        className={`locker ${getStatusColor(finalStatus)}`}
        onClick={() => handleLockerClick(arma)}
      >
        {arma.numero}
      </button>
    );
  })}
</div>

        </div>

        {/* Verifica se um armário foi selecionado */}
        {selectedLocker && (
          <div className="details-section">
            <h2 className="details-title">Informações do armário</h2>
            <div className="locker-details">
              {/* Exibir sempre as informações principais (número e status) */}
              <p>Armário do prédio: {buildingId}</p>
              <p>
                Número: {lockerDetails ? lockerDetails.numero : selectedLocker?.numero}
              </p>
             <p>
  Status:{' '}
  {isEditing ? (
    <select
      value={editData?.status || ''}
      onChange={(e) => handleInputChange('status', e.target.value)}
      className="dropdown"
    >
      <option value="available">Livre</option>
      <option value="occupied">Ocupado</option>
      <option value="expiring">Expirando</option>
      <option value="overdue">Atrasado</option>
      <option value="expired">Expirado</option>  {/* Nova opção "Expirado" */}
    </select>
  ) : (
    <span className={`status-badge ${getStatusColor(editData?.status || '')}`}>
      {editData?.status || 'Não definido'}
    </span>
  )}
</p>


              {/* Exibir campos editáveis quando lockerDetails não estiver disponível */}
              <p>
                Nome do aluno:{' '}
                {isEditing ? (
                  <input
                    type="text"
                    value={editData?.nome_aluno || ''}
                    onChange={(e) => handleInputChange('nome_aluno', e.target.value)}
                    className="input-field"
                    placeholder="Digite o nome do aluno"
                  />
                ) : (
                  lockerDetails?.nome_aluno || 'Nenhum aluno atribuído'
                )}
              </p>

              <p>
                Turma do aluno:{' '}
                {isEditing ? (
                  <input
                    type="text"
                    value={editData?.turma_aluno || ''}
                    onChange={(e) => handleInputChange('turma_aluno', e.target.value)}
                    className="input-field"
                    placeholder="Digite a turma"
                  />
                ) : (
                  lockerDetails?.turma_aluno || 'Sem turma atribuída'
                )}
              </p>

              <p>
                Data de início:{' '}
                {isEditing ? (
                  <input
                    type="date"
                    value={editData?.data_inicio || ''}
                    onChange={(e) => handleDateChange('data_inicio', e.target.value)}
                    className="input-field"
                  />
                ) : (
                  dataInicioFormatada || 'Nenhuma data atribuída'
                )}
              </p>

              <p>
                Data de validade:{' '}
                {isEditing ? (
                  <input
                    type="date"
                    value={editData?.data_validade || ''}
                    onChange={(e) => handleDateChange('data_validade', e.target.value)}
                    className="input-field"
                  />
                ) : (
                  dataValidadeFormatada || 'Sem validade definida'
                )}
              </p>
            </div>
            <div className="details-actions">
              {isEditing ? (
                <>
                  <button className="save-button" onClick={handleSave}>
                    Salvar
                  </button>
                  <button className="save-button" onClick={() => setIsEditing(false)}>
                    Fechar
                  </button>
                </>
              ) : (
                <button className="edit-button" onClick={handleEditToggle}>
                  Editar
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <footer className="footer">
        <div className="legend">
          <div className="legend-item">
            <span className="legend-color available"></span> Livre
          </div>
          <div className="legend-item">
            <span className="legend-color occupied"></span> Ocupado
          </div>
          <div className="legend-item">
            <span className="legend-color expiring"></span> Expirando
          </div>
         
        </div>
      </footer>
    </div>
  );
}
