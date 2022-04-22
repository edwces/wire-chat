import { AppShell } from "@mantine/core";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return <AppShell>{children}</AppShell>;
}
