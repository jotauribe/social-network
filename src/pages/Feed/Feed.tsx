import './Feed.css';

import { Plus } from 'lucide-react';
import { Link } from 'react-router';

import { Avatar } from '../../components/Avatar';
import { Post } from '../../components/Post';
import { usePostListRepository } from '../../hooks/usePostListRepository';
import { useUserRepository } from '../../hooks/useUserRepository';

const Feed = () => {
  const { posts = [], isLoading, error } = usePostListRepository();
  const { user } = useUserRepository();

  if (isLoading) {
    return <div className="loading-container">Loading posts...</div>;
  }

  if (error) {
    return <div className="error-container">No comments found.</div>;
  }

  return (
    <div className="feed-page">
      <header className="feed-header">
        <h1 className="feed-title">Home</h1>
        <div className="feed-header-actions">
          <Link to="/create" className="create-post-button">
            <Plus size={24} />
          </Link>
          {user && <Avatar src={user.avatar} alt={user.username} className="user-avatar" />}
        </div>
      </header>

      <div className="feed-content">
        {posts.map((post) => (
          <Link key={post.id} to={`/post/${post.id}`} className="post-link">
            <Post post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Feed;
