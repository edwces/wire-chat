import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useConnection } from "../../stores/useConnection";
import { useCurrentUser } from "../../stores/useCurrentUser";

export function MessageInput() {
  const form = useForm({
    initialValues: {
      message: "",
    },
  });
  const connection = useConnection((state) => state.connection);
  const router = useRouter();
  const userId = useCurrentUser((state) => state.id);

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        const data = {
          content: values.message,
          conversation: router.query.id,
          sender: userId,
        };

        connection?.send(JSON.stringify({ type: "TEXT_MESSAGE", data }));
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
