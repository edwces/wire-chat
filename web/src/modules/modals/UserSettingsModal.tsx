import { Avatar, Box, Button, Stack } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { setAccessToken, uploadAvatarImage } from "../../services";

export function UserSettingsModal({
  id,
  context,
  innerProps,
}: ContextModalProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const { data } = useCurrentUser();
  const router = useRouter();
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
        src={`${process.env.NEXT_PUBLIC_API_URL}/image/${data.avatar}`}
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
      <Button
        onClick={() => {
          context.closeModal(id);
          setAccessToken("");
          router.push("/account/login");
        }}
      >
        Logout
      </Button>
    </Stack>
  );
}
