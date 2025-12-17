import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { commentService } from '../services/comment.service';

export const useCommentRepository = (postId: string) => {
  const queryClient = useQueryClient();

  const commentsQuery = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => commentService.getComments(postId),
    enabled: !!postId,
  });

  const deleteCommentMutation = useMutation({
    mutationFn: ({ commentId }: { commentId: string }) =>
      commentService.deleteComment(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });

  return {
    comments: commentsQuery.data,
    isLoading: commentsQuery.isLoading,
    error: commentsQuery.error,
    deleteComment: deleteCommentMutation.mutateAsync,
    isDeletingComment: deleteCommentMutation.isPending,
  };
};
