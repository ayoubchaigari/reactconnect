// components/UserPosts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostComments from './PostComments';

function UserPosts({ user }) {
  const [posts, setPosts] = useState([]);
  const [showComments, setShowComments] = useState({});
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
      .then(res => setPosts(res.data));
  }, [user]);

  const toggleComments = (postId) => {
    setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://jsonplaceholder.typicode.com/posts', {
      userId: user.id,
      title: newPost.title,
      body: newPost.body
    }).then(res => {
      setPosts([res.data, ...posts]);
      setNewPost({ title: '', body: '' });
    });
  };

  return (
    <div>
      <h2>Posts de {user.name}</h2>

      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          placeholder="Titre du post"
          value={newPost.title}
          onChange={e => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="Contenu du post"
          value={newPost.body}
          onChange={e => setNewPost({ ...newPost, body: e.target.value })}
        />
        <button>Publier</button>
      </form>

      {posts.map(post => (
        <div key={post.id} className="card">
          <h5>{post.title}</h5>
          <p>{post.body}</p>
          <button onClick={() => toggleComments(post.id)}>
            {showComments[post.id] ? 'Masquer les commentaires' : 'Afficher les commentaires'}
          </button>
          {showComments[post.id] && <PostComments postId={post.id} />}
        </div>
      ))}
    </div>
  );
}

export default UserPosts;
