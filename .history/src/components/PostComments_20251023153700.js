// components/PostComments.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PostComments({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then(res => setComments(res.data));
  }, [postId]);

  return (
    <div className="comment-section">
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <strong>{comment.name}</strong> ({comment.email})
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
}

export default PostComments;
