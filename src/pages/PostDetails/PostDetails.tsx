import './PostDetails.css';

import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router';

import { Avatar } from '../../components/Avatar';
import { Post } from '../../components/Post';
import { useCommentRepository } from '../../hooks/useCommentRepository';
import { usePostRepository } from '../../hooks/usePostRepository';
import { useUserRepository } from '../../hooks/useUserRepository';
import { CommentItem } from './CommentItem';

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [commentText, setCommentText] = useState('');

  const { user } = useUserRepository();
  const { post, isLoading: isPostLoading, error: postError } = usePostRepository(id!);

  const {
    comments,
    isLoading: isCommentsLoading,
    error: commentsError,
    deleteComment,
    isDeletingComment,
    createComment,
    isCreatingComment,
  } = useCommentRepository(id!);

  const handleCreateComment = async (
    e?: React.FormEvent,
    parentId: string | null = null,
    content: string = commentText
  ) => {
    e?.preventDefault();
    if (!content.trim() || !user) return;

    try {
      await createComment({
        name: user.username,
        avatar: user.avatar,
        content: content,
        parentId: parentId,
      });
      if (parentId === null) {
        setCommentText('');
      }
    } catch (error) {
      console.error('Failed to create comment:', error);
    }
  };

  const handleReplyToComment = async (parentId: string, content: string) => {
    await handleCreateComment(undefined, parentId, content);
  };

  const handleDeleteComment = async (commentId: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await deleteComment({ commentId });
      } catch (error) {
        console.error('Failed to delete comment:', error);
      }
    }
  };

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
          {user && (
            <form className="comment-form" onSubmit={(e) => handleCreateComment(e)}>
              <Avatar src={user.avatar} alt={user.username} className="comment-avatar" />
              <div className="comment-input-container">
                <textarea
                  className="comment-input"
                  placeholder="Post your reply"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  disabled={isCreatingComment}
                  rows={1}
                />
                <div className="comment-actions">
                  <button
                    type="submit"
                    className="reply-button"
                    disabled={!commentText.trim() || isCreatingComment}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </form>
          )}

          {isCommentsLoading ? (
            <div className="comments-loading">Loading comments...</div>
          ) : commentsError ? (
            <div className="comments-error">Failed to load comments</div>
          ) : (
            comments?.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onReply={handleReplyToComment}
                onDelete={handleDeleteComment}
                isDeleting={isDeletingComment}
                isCreating={isCreatingComment}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
