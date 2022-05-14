import { TextInput, PasswordInput, Button, Space, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
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
      <Button type="submit">Submit</Button>
    </form>
  );
}
