import { Center, Container } from "@mantine/core";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Container
      fluid
      sx={(theme) => ({
        height: "100vh",
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
      })}
    >
      <Center sx={{ height: "inherit" }}>{children}</Center>
    </Container>
  );
}
