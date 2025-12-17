import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, expect, it, type Mock, vi } from 'vitest';

import { useCommentRepository } from '../../hooks/useCommentRepository';
import { usePostListRepository } from '../../hooks/usePostListRepository';
import { usePostRepository } from '../../hooks/usePostRepository';
import { useUserRepository } from '../../hooks/useUserRepository';
import PostDetails from './PostDetails';

vi.mock('../../hooks/usePostRepository');
vi.mock('../../hooks/usePostListRepository');
vi.mock('../../hooks/useCommentRepository');
vi.mock('../../hooks/useUserRepository');

describe('PostDetails Page', () => {
  const mockPost = {
    id: '123',
    title: 'Detail Post',
    content: 'Long content',
    name: 'Author',
    avatar: 'author.png',
    commentCount: 1,
    createdAt: new Date().toISOString(),
  };

  it('renders loading state', () => {
    (usePostRepository as Mock).mockReturnValue({
      isLoading: true,
      post: null,
    });
    (useCommentRepository as Mock).mockReturnValue({
      isLoading: false,
      comments: [],
    });
    (useUserRepository as Mock).mockReturnValue({ user: null });

    const { container } = render(
      <MemoryRouter initialEntries={['/post/123']}>
        <Routes>
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(container.querySelector('.spinner')).toBeInTheDocument();
  });

  it('renders post details', () => {
    (usePostRepository as Mock).mockReturnValue({
      isLoading: false,
      post: mockPost,
    });
    (usePostListRepository as Mock).mockReturnValue({
      deletePost: vi.fn(),
      isDeleting: false,
    });
    (useCommentRepository as Mock).mockReturnValue({
      isLoading: false,
      comments: [],
    });
    (useUserRepository as Mock).mockReturnValue({ user: null });

    render(
      <MemoryRouter initialEntries={['/post/123']}>
        <Routes>
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Detail Post')).toBeInTheDocument();
    expect(screen.getByText('Long content')).toBeInTheDocument();
  });
});
