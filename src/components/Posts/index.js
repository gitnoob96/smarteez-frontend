import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  deletePost as deletePostAction,
  getPosts,
  editPost as editPostAction,
} from "../../redux/actions/postActions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Post from "../Post";

const API_URL = "https://jsonplaceholder.typicode.com";

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const onSearchChange = (value) => {
    setSearchTerm(value);
  };

  const [filteredPosts, setFilteredPosts] = useState([]);
  useEffect(() => {
    if (searchTerm === "") setFilteredPosts(posts);
    else {
      let filtered = posts.filter((post) => {
        return (
          post.title.includes(searchTerm) || post.body.includes(searchTerm)
        );
      });
      setFilteredPosts(filtered);
    }
  }, [posts, searchTerm]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/posts?_limit=16`) // fetching only the first 16 posts as requested
      .then((res) => {
        dispatch(getPosts(res.data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => {
    setIsModalVisible(false);
    setForm({});
  };

  const [form, setForm] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  const onChange = ({ name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const onNewPost = () => {
    setIsEditMode(false);
    setIsModalVisible(true);
  };

  const addPost = () => {
    setIsActionLoading(true);
    axios
      .post(`${API_URL}/posts`, {
        title: form.title,
        body: form.body,
      })
      .then((res) => {
        dispatch(createPost(res.data));
        setIsModalVisible(false);
        setForm({});
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsActionLoading(false);
      });
  };

  const onEditPost = (id, title) => {
    setIsEditMode(true);
    setIsModalVisible(true);
    setForm({ ...form, id, title });
  };

  const editPost = () => {
    setIsActionLoading(true);
    axios
      .patch(`${API_URL}/posts/${form.id}`, {
        title: form.title,
      })
      .then((res) => {
        setIsModalVisible(false);
        setForm({});
        dispatch(editPostAction({ ...res.data, id: form.id })); // add id because it's missing when we update a post we added manually
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsActionLoading(false);
      });
  };

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [postToDeleteId, setPostToDeleteId] = useState();

  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setPostToDeleteId(null);
  };

  const onDeletePost = (id) => {
    setIsDeleteModalVisible(true);
    setPostToDeleteId(id);
  };

  const deletePost = () => {
    setIsActionLoading(true);
    axios
      .delete(`${API_URL}/posts/${postToDeleteId}`)
      .then(() => {
        setIsDeleteModalVisible(false);
        setPostToDeleteId(null);
        dispatch(deletePostAction(postToDeleteId));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsActionLoading(false);
      });
  };

  const renderSearchBar = () => (
    <Form className="mb-5">
      <Row>
        <Col sm={12} md={9} lg={10}>
          <Form.Control
            size="lg"
            placeholder="Type in order to search"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.currentTarget.value)}
          />
        </Col>
        <Col sm={12} md={3} lg={2} className="mt-2 mt-md-0">
          <Button
            size="lg"
            variant="success"
            onClick={onNewPost}
            className="w-100"
          >
            New post
          </Button>
        </Col>
      </Row>
    </Form>
  );

  return (
    <Container>
      <h1 className="text-center my-5 text-success">My Blog</h1>

      {renderSearchBar()}

      {/* Add/Edit Post Modal */}
      <Modal show={isModalVisible} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title> {isEditMode ? "Edit" : "New"} Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Post Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Post Title"
                value={form.title}
                onChange={(e) =>
                  onChange({ name: "title", value: e.currentTarget.value })
                }
              />
            </Form.Group>
            {!isEditMode && (
              <Form.Group>
                <Form.Label>Post Body</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Post Body"
                  rows={4}
                  value={form.body}
                  onChange={(e) =>
                    onChange({ name: "body", value: e.currentTarget.value })
                  }
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          {isEditMode ? (
            <Button
              variant="primary"
              onClick={editPost}
              disabled={isActionLoading}
            >
              {isActionLoading ? (
                <>
                  <Spinner animation="border" size="sm" /> Loading
                </>
              ) : (
                "Edit Post"
              )}
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={addPost}
              disabled={isActionLoading}
            >
              {isActionLoading ? (
                <>
                  <Spinner animation="border" size="sm" /> Loading
                </>
              ) : (
                "Add Post"
              )}
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Delete confirmation Modal */}
      <Modal show={isDeleteModalVisible} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={deletePost}
            disabled={isActionLoading}
          >
            {isActionLoading ? (
              <>
                <Spinner animation="border" size="sm" /> Loading
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Posts List */}
      <Row className="mb-5">
        {isLoading ? (
          <Spinner animation="border" variant="success" className="mx-auto" />
        ) : (
          filteredPosts?.map(({ id, title, body }) => (
            <Col sm={6} md={4} lg={3} className="my-2" style={{ height: 300 }}>
              <Post
                key={id}
                id={id}
                title={title}
                body={body}
                onDelete={() => onDeletePost(id)}
                onEdit={() => onEditPost(id, title)}
              />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Posts;
