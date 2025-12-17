import './CommentItem.css';

import { MessageCircle, MoreHorizontal, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Avatar } from '../../components/Avatar';
import { Card } from '../../components/Card';
import { Menu, MenuItem } from '../../components/Menu';
import type { Comment } from '../../services/comment.service';
import { formatDate } from '../../utils/date';

interface CommentItemProps {
  comment: Comment;
  onReply: (parentId: string, content: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
  isDeleting: boolean;
  isCreating: boolean;
  level?: number;
}

export const CommentItem = ({
  comment,
  onReply,
  onDelete,
  isDeleting,
  isCreating,
  level = 0,
}: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    await onReply(comment.id, replyText);
    setReplyText('');
    setIsReplying(false);
  };

  return (
    <div className={`comment-item-container level-${level}`}>
      <Card className="comment-card">
        <div className="comment-layout">
          <Avatar src={comment.avatar} alt={comment.name} className="comment-avatar" />
          <div className="comment-content-column">
            <div className="comment-header-row">
              <span className="comment-author-name">{comment.name}</span>
              <span className="comment-separator">·</span>
              <span className="comment-date">{formatDate(comment.createdAt)}</span>
              <Menu
                className="comment-menu"
                trigger={
                  <button className="post-menu-button" aria-label="Comment options">
                    <MoreHorizontal size={16} />
                  </button>
                }
              >
                <MenuItem
                  onClick={() => onDelete(comment.id)}
                  disabled={isDeleting}
                  variant="destructive"
                >
                  <Trash2 size={16} />
                  Delete
                </MenuItem>
              </Menu>
            </div>
            <p className="comment-text">{comment.content}</p>

            <div className="comment-actions-row">
              <button className="comment-action-button" onClick={() => setIsReplying(!isReplying)}>
                <MessageCircle size={14} />
                Reply
              </button>
            </div>

            {isReplying && (
              <form className="reply-form" onSubmit={handleReplySubmit}>
                <textarea
                  className="reply-input"
                  placeholder="Write your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  autoFocus
                />
                <div className="reply-form-actions">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setIsReplying(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="submit-reply-button"
                    disabled={!replyText.trim() || isCreating}
                  >
                    Reply
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Card>

      {comment?.comments?.length > 0 && (
        <div className="comment-children">
          {comment?.comments?.map((child) => (
            <CommentItem
              key={child.id}
              comment={child}
              onReply={onReply}
              onDelete={onDelete}
              isDeleting={isDeleting}
              isCreating={isCreating}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
