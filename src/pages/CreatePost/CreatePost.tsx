import './CreatePost.css';

import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

import { CreatePost as CreatePostForm } from '../../components/CreatePost';

const CreatePost = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/feed');
  };

  return (
    <div className="create-post-page">
      <header className="create-post-header">
        <div className="header-content">
          <Link to="/feed" className="back-button">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="header-title">Create post</h1>
        </div>
      </header>

      <div className="create-post-content">
        <CreatePostForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default CreatePost;
