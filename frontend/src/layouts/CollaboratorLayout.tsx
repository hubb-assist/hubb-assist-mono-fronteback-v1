import { ReactNode } from "react";
import AppShell from "../components/layout/AppShell";
import CollaboratorSidebar from "../components/layout/CollaboratorSidebar";

interface CollaboratorLayoutProps {
  level: "n1" | "n2" | "n3";
  children: ReactNode;
}

export function CollaboratorLayout({ level, children }: CollaboratorLayoutProps) {
  return (
    <AppShell userType="COLABORADOR">
      {children}
    </AppShell>
  );
}