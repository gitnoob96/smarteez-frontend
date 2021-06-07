import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const PostDetails = () => {
  const { id } = useParams();
  const posts = useSelector((state) => state.posts.posts);

  const [post, setPost] = useState({});

  useEffect(() => {
    const p = posts?.find((post) => String(post.id) === id);
    setPost(p);
  }, [posts]);

  return (
    <Container>
      <h2 className="text-center my-4">Post Details</h2>
      <Card className="w-50 mx-auto mt-5">
        {post && (
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.body}</Card.Text>
          </Card.Body>
        )}
      </Card>
    </Container>
  );
};

export default PostDetails;
