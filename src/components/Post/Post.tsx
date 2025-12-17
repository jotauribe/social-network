import './Post.css';

import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { usePostListRepository } from '../../hooks/usePostListRepository';
import { formatDate } from '../../utils/date';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Card } from '../Card';
import { Input } from '../Input';
import { Menu, MenuItem } from '../Menu';

type PostProps = {
  post: {
    id: string;
    avatar: string;
    content: string;
    createdAt: string;
    name: string;
    title: string;
    comments?: number;
  };
  onEdit?: (id: string, content: string) => Promise<void>;
  isUpdating?: boolean;
};

export const Post = ({ post, onEdit, isUpdating }: PostProps) => {
  const { deletePost, isDeleting } = usePostListRepository();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post.content);

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    deletePost(post.id);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editText.trim() || !onEdit) return;

    await onEdit(post.id, editText);
    setIsEditing(false);
  };

  return (
    <Card className={`post-card ${isDeleting ? 'deleting' : ''}`}>
      <div className="post-layout">
        <div className="post-avatar-column">
          <Avatar src={post.avatar} alt={post.name} className="post-avatar" />
        </div>

        <div className="post-content-column">
          <div className="post-header-row">
            <span className="post-author-name">{post.name}</span>
            <span className="post-date">{formatDate(post.createdAt)}</span>
            <Menu
              className="post-menu"
              trigger={
                <button className="post-menu-button" aria-label="More options">
                  <MoreHorizontal size={18} />
                </button>
              }
            >
              {onEdit && (
                <MenuItem onClick={() => setIsEditing(true)}>
                  <Edit2 size={16} />
                  Edit
                </MenuItem>
              )}
              <MenuItem onClick={handleDelete} disabled={isDeleting} variant="destructive">
                <Trash2 size={16} />
                Delete
              </MenuItem>
            </Menu>
          </div>

          <div className="post-body">
            {post.title && <h3 className="post-title">{post.title}</h3>}
            {isEditing ? (
              <form className="edit-form" onSubmit={handleEditSubmit}>
                <Input
                  multiline
                  className="edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                />
                <div className="edit-form-actions">
                  <Button
                    type="button"
                    variant="secondary"
                    className="cancel-button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditText(post.content);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="submit-edit-button"
                    disabled={!editText.trim() || isUpdating}
                  >
                    Save
                  </Button>
                </div>
              </form>
            ) : (
              <p className="post-text">{post.content}</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
