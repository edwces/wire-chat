import {
  TextInput,
  PasswordInput,
  Button,
  Space,
  Stack,
  Group,
  Anchor,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { NextLink } from "@mantine/next";
import { FormEvent } from "react";
import { LoginFields } from "../../types/interfaces";

interface LoginFormProps {
  onSubmit: (values: LoginFields, event?: FormEvent<Element>) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const form = useForm<LoginFields>({
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack spacing="sm">
        <TextInput required label="email" {...form.getInputProps("email")} />
        <PasswordInput
          required
          label="password"
          {...form.getInputProps("password")}
        />
      </Stack>
      <Space h="xl" />
      <Group position="apart">
        <Anchor
          component={NextLink}
          size="xs"
          color="gray"
          href="/account/register"
        >
          Don't have an account? Register here
        </Anchor>
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
