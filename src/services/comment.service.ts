import { filter, keyBy } from 'lodash';

export interface Comment {
  id: string;
  parentId: string | null;
  createdAt: string;
  name: string;
  avatar: string;
  content: string;
  comments: Comment[];
}

const API_BASE_URL = 'https://665de6d7e88051d60408c32d.mockapi.io/post';

const arrayToTree = (items: Comment[]) => {
  const commentsById = keyBy(
    items.map((item) => ({ ...item, comments: [] as Comment[] })),
    'id'
  );

  return filter(commentsById, (item) => {
    if (item.parentId) {
      const parent = commentsById[item.parentId];
      parent.comments.push(item);
      return false;
    }

    return true;
  });
};

export const commentService = {
  getComments: async (postId: string): Promise<Comment[]> => {
    const response = await fetch(`${API_BASE_URL}/${postId}/comment`);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    const comments: Comment[] = await response.json();
    return arrayToTree(comments);
  },

  deleteComment: async (postId: string, commentId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${postId}/comment/${commentId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete comment');
    }
  },

  createComment: async (
    postId: string,
    comment: Omit<Comment, 'id' | 'createdAt' | 'comments'>
  ): Promise<Comment> => {
    const response = await fetch(`${API_BASE_URL}/${postId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });
    if (!response.ok) {
      throw new Error('Failed to create comment');
    }
    return response.json();
  },
};
