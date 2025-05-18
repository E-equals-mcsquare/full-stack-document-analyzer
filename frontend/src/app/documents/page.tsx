"use client";

import { useEffect, useRef, useState } from "react";
import axios from "../../lib/api";
import SidebarLayout from "@/components/layout/SidebarLayout";
import styles from "./documents.module.scss";
import Button from "@/components/ui/Button";

export default function DocumentsPage() {
    interface Document {
        id: string;
        filename: string;
    }

    const [documents, setDocuments] = useState<Document[]>([]);
    const fileRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        (async () => {

            const res = await axios.get<Document[]>("/documents");
            setDocuments(res.data);
        })();
    }, []);

    const handleUpload = async () => {
        if (!fileRef.current?.files?.[0]) return;
        const formData = new FormData();
        formData.append("file", fileRef.current.files[0]);

        await axios.post("/documents/upload", formData);
        const res = await axios.get<Document[]>("/documents");
        setDocuments(res.data);
    };

    return (
        <div className='custom-row'>
            <SidebarLayout><></></SidebarLayout>
            <div className={`custom-col ${styles.documentsContainer}`}>
                <h1>Documents</h1>
                <div className={styles.documentsList}>
                    <ul>
                        {documents.map((doc: Document) => (
                            <li key={doc.id} className="custom-row">
                                <div><strong>Document Id: {doc.id}</strong> {doc.filename}</div>
                                <div>
                                    <Button
                                        onClick={async () => {
                                            await axios.delete(`/documents/${doc.id}`);
                                            const res = await axios.get<Document[]>("/documents");
                                            setDocuments(res.data);
                                        }}
                                        label="Delete"
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.uploadContainer}>
                    <input type="file" ref={fileRef} />
                    <Button onClick={handleUpload} label="Upload" />
                </div>
            </div>
        </div>
    );
}