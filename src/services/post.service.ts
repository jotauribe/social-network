export interface Post {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  content: string;
  title: string;
  comments?: number;
}

const API_URL = 'https://665de6d7e88051d60408c32d.mockapi.io/post';

export const postService = {
  getPosts: async (): Promise<Post[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  },

  getPostById: async (id: string): Promise<Post> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    return response.json();
  },
};
