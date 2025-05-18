import "../styles/globals.scss";

export const metadata = {
  title: "Document Analyzer",
  description: "RAG-based QA and document management",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
