'use client';

import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const fetchedUsers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(fetchedUsers);
        console.log("Usuarios obtenidos:", fetchedUsers);
      } catch (error) {
        console.error("Error obteniendo usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>ID:</strong> {user.id} <br />
            <strong>Nombre:</strong> {user.name} <br />
            <strong>Edad:</strong> {user.edad} <br />
            <strong>Carrera:</strong> {user.carrera}
          </li>
        ))}
      </ul>
    </div>
  );
}
