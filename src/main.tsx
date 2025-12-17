import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import App from './App.tsx';
import CreatePostPage from './pages/CreatePost';
import Feed from './pages/Feed';
import PostDetails from './pages/PostDetails';
import SetupProfile from './pages/SetupProfile/SetupProfile.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/profile" element={<SetupProfile />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
