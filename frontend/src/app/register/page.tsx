"use client";

import styles from "./register.module.scss";
import { useState } from "react";
import instance from "@/lib/api";
import { useRouter } from "next/navigation";
import { APIErrorResponse } from "@/types/api";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await instance.post("/auth/register", { email, password });
      router.push("/login");
    } catch (err: unknown) {
        const error = err as APIErrorResponse;
        setError(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className={styles.registerContainer}>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <h2>Register</h2>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}