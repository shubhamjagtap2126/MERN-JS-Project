import { useState, useEffect } from "react";

const usePostsAPI = () => {
  const [posts, setPosts] = useState();
  const [comments, setComments] = useState();

  useEffect(() => {
    // Fetch all posts
    const fetchPosts = async () => {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    };

    // Fetch all comments
    const fetchComments = async () => {
      const response = await fetch("/api/comments");
      const data = await response.json();
      setComments(data);
    };

    fetchPosts();
    fetchComments();
  }, []);

  const createPost = async (postData) => {
    // Create a new post
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const newPost = await response.json();
    setPosts([...posts, newPost]);
  };

  const updatePost = async (postId, postData) => {
    // Update an existing post
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const updatedPost = await response.json();
    setPosts(posts.map((post) => (post.id === postId ? updatedPost : post)));
  };

  const deletePost = async (postId) => {
    // Delete an existing post
    await fetch(`/api/posts/${postId}`, { method: "DELETE" });
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const createComment = async (commentData) => {
    // Create a new comment
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });
    const newComment = await response.json();
    setComments([...comments, newComment]);
  };

  const updateComment = async (commentId, commentData) => {
    // Update an existing comment
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });
    const updatedComment = await response.json();
    setComments(
      comments.map((comment) =>
        comment.id === commentId ? updatedComment : comment
      )
    );
  };

  const deleteComment = async (commentId) => {
    // Delete an existing comment
    await fetch(`/api/comments/${commentId}`, { method: "DELETE" });
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  return {
    posts,
    createPost,
    updatePost,
    deletePost,
    comments,
    createComment,
    updateComment,
    deleteComment,
  };
};
