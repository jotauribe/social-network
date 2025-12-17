import './CreatePost.css';

import { useState } from 'react';

import { usePostListRepository } from '../../hooks/usePostListRepository';
import { useUserRepository } from '../../hooks/useUserRepository';
import { Input } from '../Input';

interface CreatePostProps {
  onSuccess?: () => void;
}

export const CreatePost = ({ onSuccess }: CreatePostProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useUserRepository();
  const { createPost, isCreating } = usePostListRepository();

  const handleSubmit = async () => {
    if (!title.trim() || !user) return;

    try {
      await createPost({
        content,
        title,
        name: user.username,
        avatar: user.avatar,
      });
      setTitle('');
      setContent('');
      onSuccess?.();
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="create-post-container">
      <div className="cp-header">
        <h2 className="cp-title">Create a post</h2>
      </div>

      <div className="cp-form-area">
        <Input
          id="post-title"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="An interesting title"
          maxLength={300}
        />

        <div className="cp-input-container">
          <label htmlFor="post-content" className="cp-input-label">
            Content
          </label>
          <textarea
            id="post-content"
            className="cp-textarea-field"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="cp-footer">
          <button
            className="cp-btn-primary"
            disabled={!title.trim() || isCreating}
            onClick={handleSubmit}
          >
            {isCreating ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
};
