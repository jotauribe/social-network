import './PostDetails.css';

import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router';

import { Avatar } from '../../components/Avatar';
import { Card } from '../../components/Card';
import { Post } from '../../components/Post';
import { useCommentRepository } from '../../hooks/useCommentRepository';
import { usePostRepository } from '../../hooks/usePostRepository';
import { formatDate } from '../../utils/date';

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { post, isLoading: isPostLoading, error: postError } = usePostRepository(id!);

  const {
    comments,
    isLoading: isCommentsLoading,
    error: commentsError,
  } = useCommentRepository(id!);

  if (isPostLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (postError || !post) {
    return (
      <div className="error-container">
        <p>Failed to load post. Please try again later. </p>
        <Link to="/feed" className="back-link">
          Back to Feed
        </Link>
      </div>
    );
  }

  return (
    <div className="post-details-page">
      <header className="feed-header">
        <div className="header-content">
          <Link to="/feed" className="back-button">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="header-title">Post</h1>
        </div>
      </header>

      <div className="post-details-content">
        <Post post={post} />

        <div className="comments-section">
          {isCommentsLoading ? (
            <div className="comments-loading">Loading comments...</div>
          ) : commentsError ? (
            <div className="comments-error">Failed to load comments</div>
          ) : (
            comments?.map((comment) => (
              <Card key={comment.id} className="comment-card">
                <div className="comment-layout">
                  <Avatar src={comment.avatar} alt={comment.name} className="comment-avatar" />
                  <div className="comment-content-column">
                    <div className="comment-header-row">
                      <span className="comment-author-name">{comment.name}</span>
                      <span className="comment-separator">·</span>
                      <span className="comment-date">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="comment-text">{comment.comment}</p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
