import { Stack } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { createConversation, getAllUsers } from "../../services";
import { useAuthStatus } from "../../stores/useAuthStatus";
import { UserProfileButton, useUserConversations } from "../navigation";
import { User } from "../../types/interfaces";

// TODO: THIS NEEDS REFACTORING
export function AddFriendsModal({
  id,
  context,
  innerProps,
}: ContextModalProps) {
  const currentId = useAuthStatus((state) => state.id);
  const queryClient = useQueryClient();
  const friends = useUserConversations(currentId!, (data) =>
    data.map((friend) =>
      friend.participants.find((participant) => participant.id !== currentId)
    )
  );
  const { data } = useQuery(["user"], () => getAllUsers(), {
    select: (data) =>
      data.filter(
        (user) =>
          ![
            ...friends.data.map((friend: User) => friend.id),
            currentId,
          ].includes(user.id)
      ),
    enabled: !!friends.data,
  });
  const addFriendMutation = useMutation(
    (ids: number[]) => createConversation(ids),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["user", "conversations"]);
        context.closeModal(id);
      },
    }
  );

  const onClick = (ids: number[]) => {
    addFriendMutation.mutate(ids);
  };

  if (!data || !friends.data) return <div>Loading</div>;

  return (
    <Stack spacing="md">
      {data.map((user) => (
        <UserProfileButton
          key={user.id}
          name={user.name}
          image={`${process.env.NEXT_PUBLIC_API_URL}/image/${user.avatar}`}
          onClick={() => onClick([currentId!, user.id])}
        />
      ))}
    </Stack>
  );
}
