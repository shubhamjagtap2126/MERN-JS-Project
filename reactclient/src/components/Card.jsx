import { useState } from "react";
import { Card, Button } from "react-bootstrap";

export function PostCard({ post, comments, onDelete, onComment }) {
  const [commentText, setCommentText] = useState("");
  return (
    <Card>
      <Card.Body>
        {/* <Card.Title>{post.title}</Card.Title> */}
        <Card.Text>{post.content}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">{post.id}</Card.Subtitle>
        <Button variant="danger" onClick={() => onDelete(post.id)}>
          Delete
        </Button>
        <hr />
      </Card.Body>
    </Card>
  );
}
