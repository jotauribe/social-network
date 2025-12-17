import { useQuery } from '@tanstack/react-query';

import { postService } from '../services/post.service';

export const usePostRepository = (id: string) => {
  const postQuery = useQuery({
    queryKey: ['post', id],
    queryFn: () => postService.getPostById(id),
    enabled: !!id,
  });

  return {
    post: postQuery.data,
    isLoading: postQuery.isLoading,
    error: postQuery.error,
  };
};
