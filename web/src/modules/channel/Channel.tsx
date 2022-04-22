import {
  Avatar,
  Box,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";

interface ChannelProps {
  image: string;
  name: string;
}

export function Channel({ image, name }: ChannelProps) {
  return (
    <section>
      <Stack sx={{ minHeight: "95vh" }}>
        <header>
          <Group>
            <Avatar radius="xl" size="lg" />
            <Text size="lg" weight={400}>
              Bob Bobby
            </Text>
          </Group>
        </header>
        <Divider mb={10} />
        <Stack spacing={5} sx={{ flexGrow: 1 }}>
          <Paper p={2}>Hello there</Paper>
          <Paper p={2} sx={{ display: "flex", flexDirection: "row-reverse" }}>
            Oh Hi!
          </Paper>
        </Stack>
        <Divider mt={10} />
        <TextInput></TextInput>
      </Stack>
    </section>
  );
}
