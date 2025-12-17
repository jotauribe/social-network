import { useQuery } from '@tanstack/react-query';

import { postService } from '../services/post.service';

const POSTS_QUERY_KEY = ['posts'];

export const usePostListRepository = () => {
  const postsQuery = useQuery({
    queryKey: POSTS_QUERY_KEY,
    queryFn: postService.getPosts,
  });

  return {
    posts: postsQuery.data,
    isLoading: postsQuery.isLoading,
    error: postsQuery.error,
  };
};
