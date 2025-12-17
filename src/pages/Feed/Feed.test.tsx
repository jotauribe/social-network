import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, type Mock, vi } from 'vitest';

import { usePostListRepository } from '../../hooks/usePostListRepository';
import { useUserRepository } from '../../hooks/useUserRepository';
import Feed from './Feed';

// Mock hooks
vi.mock('../../hooks/usePostListRepository');
vi.mock('../../hooks/useUserRepository');

describe('Feed Page', () => {
  it('renders loading state', () => {
    (usePostListRepository as Mock).mockReturnValue({
      isLoading: true,
      posts: [],
    });
    (useUserRepository as Mock).mockReturnValue({ user: null });

    render(
      <MemoryRouter>
        <Feed />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading posts...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (usePostListRepository as Mock).mockReturnValue({
      isLoading: false,
      error: new Error('Failed'),
      posts: [],
    });
    (useUserRepository as Mock).mockReturnValue({ user: null });

    render(
      <MemoryRouter>
        <Feed />
      </MemoryRouter>
    );

    expect(screen.getByText('No comments found.')).toBeInTheDocument();
  });

  it('renders posts when loaded', () => {
    const mockPosts = [
      {
        id: '1',
        title: 'Test Post',
        content: 'Content',
        name: 'User 1',
        avatar: 'avatar1.png',
        commentCount: 0,
        createdAt: new Date().toISOString(),
      },
    ];

    (usePostListRepository as Mock).mockReturnValue({
      isLoading: false,
      posts: mockPosts,
    });
    (useUserRepository as Mock).mockReturnValue({ user: { username: 'me', avatar: 'me.png' } });

    render(
      <MemoryRouter>
        <Feed />
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Test Post')).toBeInTheDocument();
  });
});
