import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, type Mock, vi } from 'vitest';

import { useUserRepository } from '../../hooks/useUserRepository';
import SetupProfile from './SetupProfile';

vi.mock('../../hooks/useUserRepository');

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('SetupProfile Page', () => {
  it('renders profile setup form', () => {
    (useUserRepository as Mock).mockReturnValue({
      updateUser: vi.fn(),
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <SetupProfile />
      </MemoryRouter>
    );

    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByText('Start Posting')).toBeInTheDocument();
  });

  it('handles user input', () => {
    (useUserRepository as Mock).mockReturnValue({
      updateUser: vi.fn(),
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <SetupProfile />
      </MemoryRouter>
    );

    const input = screen.getByLabelText('Username');
    fireEvent.change(input, { target: { value: 'cooluser' } });

    expect(input).toHaveValue('cooluser');
  });
});
