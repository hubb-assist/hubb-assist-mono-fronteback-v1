import { ReactNode } from "react";
import AppShell from "../components/layout/AppShell";
import PatientSidebar from "../components/layout/PatientSidebar";

interface PatientLayoutProps {
  children: ReactNode;
}

export function PatientLayout({ children }: PatientLayoutProps) {
  return (
    <AppShell userType="PACIENTE">
      {children}
    </AppShell>
  );
}