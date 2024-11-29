'use client';

import LockerGrid from "../../../../components/locker-grid";
import axios from "axios";
import { useEffect, useState } from "react";

export default function LockersPage({ params }: { params: { buildingId, floor} }) {
  const { buildingId, floor } = params;
  const [data, setData] = useState([])


 async function getData() {
    try {
     console.log("id2", buildingId)
      const response = await axios.get(`http://localhost:3001/armario/local/${buildingId}`);
      console.log(response.data);
      setData(response.data)
      console.log("resp", data)
    } catch (error) { 
      console.error('Erro ao pegar armários de local:', error);
      throw error;
    }
  }

useEffect(() => {
  getData();
},[])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <LockerGrid
        buildingId={buildingId}
        floor={floor}
        lockersData={data} // Passando os dados corretamente
      />
    </main>
  );
}
