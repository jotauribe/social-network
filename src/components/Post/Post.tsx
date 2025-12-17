import './Post.css';

import type { Post as PostType } from '../../services/post.service';
import { Avatar } from '../Avatar';
import { Card } from '../Card';

type PostProps = {
  post: PostType;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const Post = ({ post }: PostProps) => {
  return (
    <Card className="post-card">
      <div className="post-layout">
        <div className="post-avatar-column">
          <Avatar src={post.avatar} alt={post.name} className="post-avatar" />
        </div>

        <div className="post-content-column">
          <div className="post-header-row">
            <span className="post-author-name">{post.name}</span>
            <span className="post-date">{formatDate(post.createdAt)}</span>
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
