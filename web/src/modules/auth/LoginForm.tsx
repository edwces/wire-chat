import { TextInput, PasswordInput, Button } from "@mantine/core";
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
      <TextInput required label="email" {...form.getInputProps("email")} />
      <PasswordInput
        required
        label="password"
        {...form.getInputProps("password")}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
