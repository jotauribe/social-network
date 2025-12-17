import './SetupProfile.css';

import { clsx } from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { useUserRepository } from '../../hooks/useUserRepository';

const AVATARS = [
  'https://api.dicebear.com/9.x/notionists/svg?seed=Felix',
  'https://api.dicebear.com/9.x/notionists/svg?seed=Aneka',
  'https://api.dicebear.com/9.x/notionists/svg?seed=Milo',
  'https://api.dicebear.com/9.x/notionists/svg?seed=Dora',
  'https://api.dicebear.com/9.x/notionists/svg?seed=Leo',
  'https://api.dicebear.com/9.x/notionists/svg?seed=Lilly',
  'https://api.dicebear.com/9.x/notionists/svg?seed=Oliver',
  'https://api.dicebear.com/9.x/notionists/svg?seed=Sasha',
];

const getAvatarName = (url: string) => {
  const seed = new URL(url).searchParams.get('seed');
  return seed || 'Avatar';
};

const SetupProfile = () => {
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const navigate = useNavigate();
  const { updateUser, isLoading } = useUserRepository();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    try {
      await updateUser({ username, avatar: selectedAvatar });
      navigate('/');
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  return (
    <div className="profile-page-container">
      <Card title="Welcome!" subtitle="Choose your avatar and set a username.">
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="avatar-section">
            <label className="avatar-label" id="avatar-label">
              Choose an Avatar
            </label>
            <div className="avatar-grid" role="radiogroup" aria-labelledby="avatar-label">
              {AVATARS.map((avatar) => {
                const name = getAvatarName(avatar);
                const isSelected = selectedAvatar === avatar;

                return (
                  <button
                    key={avatar}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={`Select ${name}`}
                    onClick={() => setSelectedAvatar(avatar)}
                    className={clsx('avatar-option', { selected: isSelected })}
                    disabled={isLoading}
                  >
                    <Avatar src={avatar} alt="" />
                  </button>
                );
              })}
            </div>
          </div>

          <Input
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. jdoe123"
            required
            autoComplete="off"
            disabled={isLoading}
          />

          <Button type="submit" disabled={isLoading || !username.trim()}>
            {isLoading ? 'Saving...' : 'Start Posting'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SetupProfile;
