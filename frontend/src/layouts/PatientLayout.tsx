import { ReactNode } from "react";
import AppShell from "../components/layout/AppShell";

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