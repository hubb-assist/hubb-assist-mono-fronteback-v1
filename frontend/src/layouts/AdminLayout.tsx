import { ReactNode } from "react";
import AppShell from "../components/layout/AppShell";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AppShell userType="ADMIN">
      {children}
    </AppShell>
  );
}