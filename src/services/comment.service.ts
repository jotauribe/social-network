export interface Comment {
  id: string;
  postId: string;
  createdAt: string;
  name: string;
  avatar: string;
  comment: string;
}

const API_BASE_URL = 'https://665de6d7e88051d60408c32d.mockapi.io/post';

export const commentService = {
  getComments: async (postId: string): Promise<Comment[]> => {
    const response = await fetch(`${API_BASE_URL}/${postId}/comments`);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    return response.json();
  },

  deleteComment: async (postId: string, commentId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${postId}/comments/${commentId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete comment');
    }
  },
};
