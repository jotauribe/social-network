import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { type Post, postService } from '../services/post.service';

export const usePostRepository = (id: string) => {
  const postQuery = useQuery({
    queryKey: ['post', id],
    queryFn: () => postService.getPostById(id),
    enabled: !!id,
  });

  const queryClient = useQueryClient();

  const updatePostMutation = useMutation({
    mutationFn: (post: Partial<Post>) => postService.updatePost(id, post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', id] });
    },
  });

  return {
    post: postQuery.data,
    isLoading: postQuery.isLoading,
    error: postQuery.error,
    updatePost: updatePostMutation.mutateAsync,
    isUpdatingPost: updatePostMutation.isPending,
  };
};
