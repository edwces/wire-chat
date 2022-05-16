import { TextInput, PasswordInput, Button, Space, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FormEvent } from "react";
import { RegisterFields } from "../../types/interfaces";

interface RegisterFormProps {
  onSubmit: (values: RegisterFields, event?: FormEvent<Element>) => void;
  isSubmitting?: boolean;
}

export function RegisterForm({
  onSubmit,
  isSubmitting = false,
}: RegisterFormProps) {
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
        <TextInput
          required
          disabled={isSubmitting}
          label="name"
          {...form.getInputProps("name")}
        />
        <TextInput
          required
          disabled={isSubmitting}
          label="email"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          required
          disabled={isSubmitting}
          label="password"
          {...form.getInputProps("password")}
        />
      </Stack>
      <Space h="xl" />
      <Button type="submit" loading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
