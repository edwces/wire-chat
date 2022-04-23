import { Paper, ScrollArea, Stack } from "@mantine/core";

export function MessageList() {
  return (
    <ScrollArea sx={{ flexGrow: 1 }}>
      <Stack spacing={5} sx={{ alignItems: "flex-start" }}>
        <Paper p={5} shadow="xs">
          Hello there
        </Paper>
        <Paper p={5} shadow="xs" sx={{ alignSelf: "flex-end" }}>
          Oh Hi!
        </Paper>
      </Stack>
    </ScrollArea>
  );
}
