import './Feed.css';

import { Avatar } from '../../components/Avatar';
import { Post } from '../../components/Post';
import { usePostRepository } from '../../hooks/usePostRepository';
import { useUserRepository } from '../../hooks/useUserRepository';

const Feed = () => {
  const { posts = [], isLoading, error } = usePostRepository();
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
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
