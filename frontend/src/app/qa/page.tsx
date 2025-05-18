"use client";

import { useRef, useState } from "react";
import axios from "../../lib/api";
import SidebarLayout from "@/components/layout/SidebarLayout";
import styles from "./qa.module.scss";
import Button from "@/components/ui/Button";

export default function QAPage() {
    const [query, setQuery] = useState("");
    const [answer, setAnswer] = useState("");
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const chatAreaRef = useRef<HTMLDivElement | null>(null);

    const handleAsk = async () => {
        try {
            interface QAResponse {
                answer: string;
            }

            setMessages(prev => [...prev, {
                role: "user",
                content: query
            }])
            setQuery("");

            const res = await axios.get<QAResponse>("/qa", { params: { q: query } });
            setMessages(prev => [...prev, {
                role: "ai",
                content: res.data.answer
            }])

            setAnswer(res.data?.answer);

            setTimeout(() => {
                chatAreaRef.current?.scrollTo(0, chatAreaRef.current.scrollHeight);
            }, 100);
        } catch (err) {
            console.error(err);
            setError("An error occurred while fetching the answer.");
        }
    };

    const AIMessage = ({ message }: { message: string }) => (
        <div className={styles.aiMessage}>
            <strong>AI:</strong> {message}
        </div>
    )

    const UserMessage = ({ message }: { message: string }) => (
        <div className={styles.userMessage}>
            <strong>User:</strong> {message}
        </div>
    )

    return (
        <div className='custom-row'>
            <SidebarLayout><></></SidebarLayout>
            <div className={`custom-col ${styles.qaContainer}`}>
                <h1>Ask a Question</h1>
                <div ref={chatAreaRef} className={styles.chatArea}>
                    {messages.map((message, index) => (
                        message.role === "user" ? (
                            <UserMessage key={index} message={message.content} />
                        ) : (
                            <AIMessage key={index} message={message.content} />
                        )
                    ))}
                </div>

                <div className={`custom-row ${styles.queryInput}`}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleAsk();
                    }}>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Enter your question"
                        />
                    </form>
                    <Button onClick={handleAsk} label="Ask" />
                </div>


            </div>
        </div>
    );
}
