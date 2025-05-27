import { ReactNode } from "react";
import AppShell from "../components/layout/AppShell";
import ClinicOwnerSidebar from "../components/layout/ClinicOwnerSidebar";

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