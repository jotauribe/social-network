import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { postService } from '../services/post.service';

const POSTS_QUERY_KEY = ['posts'];

export const usePostListRepository = () => {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: POSTS_QUERY_KEY,
    queryFn: postService.getPosts,
  });

  const createPostMutation = useMutation({
    mutationFn: postService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
    },
  });

  return {
    posts: postsQuery.data,
    isLoading: postsQuery.isLoading,
    error: postsQuery.error,
    createPost: createPostMutation.mutateAsync,
    isCreating: createPostMutation.isPending,
  };
};
