"use client";

import styles from "./login.module.scss";
import { useState } from "react";
import instance from "@/lib/api";
import { useRouter } from "next/navigation";
import { APIErrorResponse } from "@/types/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await instance.post<{ token: string }>("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      router.push("/documents");

    } catch (err: unknown) {
        const error = err as APIErrorResponse;
        setError(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
