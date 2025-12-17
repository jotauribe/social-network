import { useQuery } from '@tanstack/react-query';

import { commentService } from '../services/comment.service';

export const useCommentRepository = (postId: string) => {
  const commentsQuery = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => commentService.getComments(postId),
    enabled: !!postId,
  });

  return {
    comments: commentsQuery.data,
    isLoading: commentsQuery.isLoading,
    error: commentsQuery.error,
  };
};
