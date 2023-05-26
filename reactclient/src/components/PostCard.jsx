import { useState } from "react";
import { Card, Button } from "react-bootstrap";

export function PostCard({ post, comments, onDelete, onComment }) {
  const [commentText, setCommentText] = useState("");

  // const handleCommentSubmit = (event) => {
  //   event.preventDefault();
  //   onComment(post.id, commentText);
  //   setCommentText("");
  // };

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
        {/* <h5>Comments:</h5>
        {comments.map((comment) => (
          <Card key={comment.id}>
            <Card.Body>
              <Card.Text>{comment.body}</Card.Text>
              <Card.Subtitle className="mb-2 text-muted">
                {comment.author}
              </Card.Subtitle>
            </Card.Body>
          </Card>
        ))}
        <Form onSubmit={handleCommentSubmit}>
          <Form.Group controlId="commentText">
            <Form.Control
              type="text"
              placeholder="Leave a comment"
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form> */}
      </Card.Body>
    </Card>
  );
}
