import { Avatar, Box, Stack } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { uploadAvatarImage } from "../../services";

export function UserSettingsModal({
  id,
  context,
  innerProps,
}: ContextModalProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const { data } = useCurrentUser();
  const queryClient = useQueryClient();
  const uploadAvatarMutation = useMutation(
    (params: { id: number; formData: FormData }) =>
      uploadAvatarImage(params.id, params.formData),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const onFileChange = () => {
    const form = new FormData();

    form.append("file", fileInput.current!.files![0]);

    uploadAvatarMutation.mutate({ id: data!.id, formData: form });
  };

  if (!data) return <div>Loading</div>;

  return (
    <Stack align="center">
      <Avatar
        radius="xl"
        size="xl"
        src={`http://localhost:3001/image/${data.avatar}`}
        sx={{ "&:hover": { filter: "brightness(80%)" } }}
        onClick={() => fileInput.current?.click()}
      />
      <Box sx={{ display: "none" }}>
        <input
          type="file"
          ref={fileInput}
          accept="image/*"
          onChange={onFileChange}
        />
      </Box>
    </Stack>
  );
}
