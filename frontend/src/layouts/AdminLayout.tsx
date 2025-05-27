import { ReactNode } from "react";
import AppShell from "../components/layout/AppShell";
import AdminSidebar from "../components/layout/AdminSidebar";

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