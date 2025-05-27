import { ReactNode } from "react";
import AppShell from "../components/layout/AppShell";

interface CollaboratorLayoutProps {
  level: "n1" | "n2" | "n3";
  children: ReactNode;
}

export function CollaboratorLayout({ level, children }: CollaboratorLayoutProps) {
  const userType = level === "n1" ? "COLAB_N1" : level === "n2" ? "COLAB_N2" : "COLAB_N3";
  
  return (
    <AppShell userType={userType}>
      {children}
    </AppShell>
  );
}