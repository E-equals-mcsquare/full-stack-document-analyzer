import Link from "next/link";
import styles from "./sidebar-layout.module.scss";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const page = typeof window !== "undefined" ? window.location.pathname : "";
  const isActive = (path: string) => page.startsWith(path);
  const isActiveClass = (path: string) => (isActive(path) ? styles.active : "");

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <h2>Menu</h2>
        <nav>
          <ul>
            <li className={isActiveClass("/documents")}>
              <Link href="/documents">Documents</Link>
            </li>
            <li className={isActiveClass("/qa")}>
              <Link href="/qa">Q&A</Link>
            </li>
            <li className={isActiveClass("/admin/users")}>
              <Link href="/admin/users">User Management</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
}