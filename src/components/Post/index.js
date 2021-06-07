import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Post = ({ id, title, body, onEdit, onDelete }) => {
  title = title?.substring(0, 14); // Showing only the first 14 characters of the post title
  body = body?.substring(0, 100); // Showing only the first 100 characters of the post body

  return (
    <div
      style={{ backgroundColor: "lightblue", borderRadius: 6 }}
      className="h-100 pt-3 d-flex flex-column justify-content-between"
    >
      <h3 className="text-center">{title}...</h3>
      <p className="text-center">{body}...</p>

      <Link to={`/post/${id}`} className="align-self-end px-2">
        <span>Read more...</span>
      </Link>

      <Row>
        <Col xs={6}>
          <Button variant="warning" onClick={onEdit} className="w-100">
            Edit
          </Button>
        </Col>
        <Col xs={6}>
          <Button variant="danger" onClick={onDelete} className="w-100">
            Delete
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Post;
