import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { type User, userService } from '../services/user.service';

const USER_QUERY_KEY = ['user'];

export const useUserRepository = () => {
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: userService.getUser,
    staleTime: Infinity,
  });

  const updateUserMutation = useMutation({
    mutationFn: (newUser: User) => userService.saveUser(newUser),
    onSuccess: (savedUser) => {
      queryClient.setQueryData(USER_QUERY_KEY, savedUser);
    },
  });

  return {
    user: userQuery.data,
    error: userQuery.error || updateUserMutation.error,
    isLoading: userQuery.isLoading || updateUserMutation.isPending,
    updateUser: updateUserMutation.mutateAsync,
  };
};
