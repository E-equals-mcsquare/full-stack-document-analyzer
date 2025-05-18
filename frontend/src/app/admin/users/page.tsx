"use client";

import { useEffect, useState, useRef } from "react";
import axios from "../../../lib/api";
import SidebarLayout from "@/components/layout/SidebarLayout";
import styles from "./users.module.scss";
import Button from "@/components/ui/Button";

interface User {
  id: string;
  email: string;
  role: string;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {

      const res = await axios.get<User[]>("/users");
      setUsers(res.data);
    })()
  }, []);

  return (
    <div className='custom-row'>
      <SidebarLayout><></></SidebarLayout>
      <div className={`custom-col ${styles.usersContainer}`}>
        <h1>User Management</h1>
        <div className={styles.usersList}>
          <ul>
            {users.map((user: User) => (
              <li key={user.id} className="custom-row">
                <div><strong>User Id: {user.id}</strong> {user.email}<br /><strong>Role: </strong>{user.role}</div>
                <div>
                  <Button 
                    onClick={async () => {
                      await axios.patch(`/users/${user.id}/role`, { role: user.role === "admin" ? "viewer" : "admin" });
                      const res = await axios.get<User[]>("/users");
                      setUsers(res.data);
                    }}
                    label={user.role === "admin" ? "Revoke Admin" : "Make Admin"}
                    />
                    &nbsp;
                    &nbsp;
                  <Button
                    onClick={async () => {
                      await axios.delete(`/users/${user.id}`);
                      const res = await axios.get<User[]>("/users");
                      setUsers(res.data);
                    }}
                    label="Delete"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}