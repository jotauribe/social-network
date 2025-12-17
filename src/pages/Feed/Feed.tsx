import './Feed.css';

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
    return <div className="error-container">Failed to load posts.</div>;
  }

  return (
    <div className="feed-page">
      <header className="feed-header">
        <h1 className="feed-title">Home</h1>
        {user && <Avatar src={user.avatar} alt={user.username} className="user-avatar" />}
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
