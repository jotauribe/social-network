const STORAGE_KEY = 'user';

export interface User {
  username: string;
  avatar: string;
}

export const userService = {
  getUser: async (): Promise<User | null> => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  saveUser: async (user: User): Promise<User> => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },
};
