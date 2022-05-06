import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useConnection } from "../../stores/useConnection";

export function MessageInput() {
  const form = useForm({
    initialValues: {
      message: "",
    },
  });
  const connection = useConnection((state) => state.connection);

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        connection?.send(
          JSON.stringify({ type: "TEXT_MESSAGE", data: values.message })
        );
        form.reset();
      })}
    >
      <Group>
        <TextInput
          sx={{ flexGrow: 1 }}
          {...form.getInputProps("message")}
        ></TextInput>
        <Button type="submit">Send</Button>
      </Group>
    </form>
  );
}
