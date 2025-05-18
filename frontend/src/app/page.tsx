"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const navigate = useRouter()
  return (
    <main style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Welcome to the RAG Document Q&A System</h1>
      <Button onClick={() => {navigate.push("/login")}} label="Login"/>
        &nbsp;
      <Button onClick={() => {navigate.push("/register")}} label="Register"/>
    </main>
  );
}
