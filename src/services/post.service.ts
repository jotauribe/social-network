export interface Post {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  content: string;
  title: string;
}

const API_URL = 'https://665de6d7e88051d60408c32d.mockapi.io/post';

export const postService = {
  getPosts: async (): Promise<Post[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data: Post[] = await response.json();
    return data;
  },
};
