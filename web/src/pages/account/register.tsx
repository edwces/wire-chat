import { Paper, Space, Title } from "@mantine/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { RegisterForm } from "../../modules/auth";
import { AuthLayout } from "../../modules/layout";
import { register } from "../../services";
import { RegisterFields } from "../../types/interfaces";

const Register: NextPage = () => {
  const router = useRouter();

  const callRegister = async (values: RegisterFields) => {
    const data = await register(values);
    router.push("/account/login");
  };

  return (
    <AuthLayout>
      <Paper radius="md" p="xl" withBorder sx={{ width: 400 }}>
        <Title>Register</Title>
        <Space h="lg" />
        <RegisterForm onSubmit={callRegister} />
      </Paper>
    </AuthLayout>
  );
};

export default Register;
