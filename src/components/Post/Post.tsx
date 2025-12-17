import './Post.css';

import { MoreHorizontal, Trash2 } from 'lucide-react';

import { usePostListRepository } from '../../hooks/usePostListRepository';
import { formatDate } from '../../utils/date';
import { Avatar } from '../Avatar';
import { Card } from '../Card';
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
};

export const Post = ({ post }: PostProps) => {
  const { deletePost, isDeleting } = usePostListRepository();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    deletePost(post.id);
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
              <MenuItem onClick={handleDelete} disabled={isDeleting} variant="destructive">
                <Trash2 size={16} />
                Delete
              </MenuItem>
            </Menu>
          </div>

          <div className="post-body">
            {post.title && <h3 className="post-title">{post.title}</h3>}
            <p className="post-text">{post.content}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
