import { Paper, Space, Title } from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";
import { RegisterForm } from "../../modules/auth";
import { AuthLayout } from "../../modules/layout/AuthLayout";

const Register: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout>
        <Paper radius="md" p="xl" withBorder sx={{ width: 400 }}>
          <Title>Register</Title>
          <Space h="lg" />
          <RegisterForm onSubmit={(values) => console.log(values)} />
        </Paper>
      </AuthLayout>
    </>
  );
};

export default Register;