import React, { useEffect, useState } from 'react';
import { z } from 'zod';

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface CommentsProps {
  slug: string;
  apiUrl: string;
}

const Comments: React.FC<CommentsProps> = ({ slug, apiUrl }) => {
  console.log('Rendering Comments component'); // Add this line

  const commentSchema = z.object({
    id: z.number(),
    author: z.string(),
    body: z.string(),
    post_slug: z.string(),
  });

  const responseSchema = z.object({
    success: z.boolean(),
    results: z.array(commentSchema),
  });

  type Comment = z.infer<typeof commentSchema>;

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    console.log("I'M HERE"); // Add this line
    console.log('Slug:', slug); // Add this line
    console.log('Base URL: ', apiUrl); // Add this line
    fetch(`${apiUrl}/api/posts/${slug}/comments`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Add this line
        const parsedData = responseSchema.parse(data);
        setComments(parsedData.results);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [slug, apiUrl]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/posts/${slug}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author, body: newComment }),
      });
      const data = await response.json();
      console.log('Raw response data:', data);

      // Instead of parsing single comment, parse whole response
      const parsedData = responseSchema.parse(data);
      // Get the newly created comment from results array
      const createdComment = parsedData.results[0]; // Changed variable name here
      setComments([...comments, createdComment]);
      setNewComment('');
      setAuthor('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <strong>{comment.author}</strong>: {comment.body}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
          required
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Your comment"
          required
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default Comments;