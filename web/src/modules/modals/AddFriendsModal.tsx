import { Button, Stack } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { useMutation, useQuery } from "react-query";
import { createConversation, getAllUsers } from "../../services";
import { useAuthStatus } from "../../stores/useAuthStatus";
import { UserProfileButton } from "../navigation";

export function AddFriendsModal({
  id,
  context,
  innerProps,
}: ContextModalProps) {
  const { data } = useQuery(["user"], () => getAllUsers());
  const currentId = useAuthStatus((state) => state.id);
  const addFriendMutation = useMutation((ids: number[]) =>
    createConversation(ids)
  );

  const onClick = (ids: number[]) => {
    addFriendMutation.mutate(ids);
  };

  if (!data) return <div>Loading</div>;

  return (
    <>
      <Stack spacing="md">
        {data.map((user) => (
          <UserProfileButton
            key={user.id}
            name={user.name}
            image={user.avatar}
            onClick={() => onClick([currentId!, user.id])}
          />
        ))}
      </Stack>
    </>
  );
}
