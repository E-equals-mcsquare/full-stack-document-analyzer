import styles from "./button.module.scss";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default function Button({ label, ...props }: ButtonProps) {
  return <button className={styles.button} {...props}>{label}</button>;
}