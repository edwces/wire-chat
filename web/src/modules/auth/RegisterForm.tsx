import { TextInput, PasswordInput, Button, Space, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FormEvent } from "react";
import { RegisterFields } from "../../types/interfaces";

interface RegisterFormProps {
  onSubmit: (values: RegisterFields, event?: FormEvent<Element>) => void;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const form = useForm<RegisterFields>({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack spacing="sm">
        <TextInput required label="name" {...form.getInputProps("name")} />
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
