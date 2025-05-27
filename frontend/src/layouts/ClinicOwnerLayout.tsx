import { ReactNode } from "react";
import AppShell from "../components/layout/AppShell";

interface ClinicOwnerLayoutProps {
  children: ReactNode;
}

export function ClinicOwnerLayout({ children }: ClinicOwnerLayoutProps) {
  return (
    <AppShell userType="DONO_CLINICA">
      {children}
    </AppShell>
  );
}