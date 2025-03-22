'use client';

import { useEffect, useState } from 'react';
import { FirebaseUserRepository } from '@/app/core/infra/repositories/firebaseUserRepository';
import { GetUsers } from '@/app/core/usecases/getUsers';
import { User } from '@/app/domain/entities/user';


export default function LoginPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      const repo = new FirebaseUserRepository();
      const getUsersUserCase = new GetUsers(repo);
      const data = await getUsersUserCase.execute();
      setUsers(data);
    };
    loadUsers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl">Usuarios</h1>
      <ul className="list-disc list-inside">
        {users.map(user => (
          <li key={user.id} className="border p-2 rounded">
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Edad:</strong> {user.edad}</p>
            <p><strong>Carrera:</strong> {user.carrera}</p>
            <p><strong>User_pic:</strong> {user.user_pic}</p>
            <p><strong>CreateAt:</strong> {user.createAt.toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
