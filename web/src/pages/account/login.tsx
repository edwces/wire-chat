import { Paper, Space, Title } from "@mantine/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { LoginForm } from "../../modules/auth";
import { AuthLayout } from "../../modules/layout";
import { login, setAccessToken } from "../../services";
import { useAuthStatus } from "../../stores/useAuthStatus";
import { LoginFields } from "../../types/interfaces";

const Login: NextPage = () => {
  const router = useRouter();
  const { setLoggedIn } = useAuthStatus();

  const callLogin = async (values: LoginFields) => {
    const data = await login(values);
    setAccessToken(data.accessToken);
    setLoggedIn(Number.parseInt(data.id));
    router.push("/");
  };

  return (
    <AuthLayout>
      <Paper radius="md" p="xl" withBorder sx={{ width: 400 }}>
        <Title>Login</Title>
        <Space h="lg" />
        <LoginForm onSubmit={callLogin} />
      </Paper>
    </AuthLayout>
  );
};

export default Login;
