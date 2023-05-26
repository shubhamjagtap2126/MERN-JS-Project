import axios from "axios";
import { useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useFetch } from "../Hooks";
import { PGTitle } from "./Home";

// Reducer
export const initialPosts = {
  posts: [],
  loading: false,
  error: false,
};

export const reducer = (state = initialPosts, action) => {
  switch (action.type) {
    case "FETCH_POSTS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_POSTS_SUCCESS":
      return { ...state, posts: action.payload, loading: false };
    case "FETCH_POSTS_FAILURE":
      return { ...state, error: true, loading: false };
    case "CREATE_POST_REQUEST":
      return { ...state, loading: true };
    case "CREATE_POST_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_POST_FAILURE":
      return { ...state, error: true, loading: false };
    case "CREATE_COMMENT_REQUEST":
      return { ...state, loading: true };
    case "CREATE_COMMENT_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_COMMENT_FAILURE":
      return { ...state, error: true, loading: false };
    case "CREATE_REPLY_REQUEST":
      return { ...state, loading: true };
    case "CREATE_REPLY_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_REPLY_FAILURE":
      return { ...state, error: true, loading: false };
    default:
      return state;
  }
};

// Actions
export const fetchPosts = () => async (dispatch) => {
  dispatch({ type: "FETCH_POSTS_REQUEST" });
  try {
    const res = await axios.get("/api/posts");
    dispatch({ type: "FETCH_POSTS_SUCCESS", payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: "FETCH_POSTS_FAILURE" });
  }
};

export default function Posts() {
  // State
  const [posts, setPosts] = useState("");
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("");

  const { loading, data, error } = useFetch("/api/posts");
  // if (loading) return <h1>Loading....</h1>;
  // if (error) return <pre>{error}</pre>;
  // if (data)
  // Redux
  // const dispatch = useDispatch();
  // const posts = useSelector((state) => state.posts);
  // const [state, dispatch] = useReducer(reducer, { posts: null });

  // Effects
  // useEffect(() => {
  //   dispatch(fetchPosts());
  // }, []);
  // const posts = [
  //   { id: 1, content: "hi" },
  //   { id: 2, content: "Hello" },
  // ];
  console.log(data);
  return (
    <>
      <PGTitle title="Posts" />
      <h1>Posts</h1>
      {/* Create Posts */}
      {/* {posts.map((post) => (
        <p>{post.content}</p>
      ))} */}
      {/* Get Posts  */}
      {/* {posts && posts.map((p, index) => <p className=""> {p}</p>)} */}
      <div className="card d-flex flex-column col-6 container">
        <div className="card-body">
          <div className="d-flex flex-row align-items-start">
            <div className="p-1">
              <img
                src="https://via.placeholder.com/50"
                alt="User Avatar"
                className="rounded-circle"
              />
            </div>
            <div className="p-1">
              <h6 className="mb-0">Post User</h6>
              <p>2 hours</p>
            </div>
          </div>
          <div className="p-1">
            <p className="card-text">Post Content</p>
            <img
              src="https://via.placeholder.com/100"
              alt="User Avatar"
              className="card-img"
            />
          </div>
          <div className="p-1">Likes, comments, views</div>
          <div className="p-1">Like, comment, share</div>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="">
                <div className="d-flex flex-row align-items-start">
                  <div className="p-1">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="User Avatar"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="p-1">
                    <h6 className="mb-0">Commenter Name</h6>
                    <p>Comment Content</p>
                  </div>
                </div>
                <div className="p-1">Likes, reply</div>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div>
                    <div className="d-flex flex-row align-items-start">
                      <div className="p-1">
                        <img
                          src="https://via.placeholder.com/50"
                          alt="User Avatar"
                          className="rounded-circle"
                        />
                      </div>
                      <div className="p-1">
                        <h6 className="mb-0">Replier Name</h6>
                        <p>Reply Content</p>
                      </div>
                    </div>
                    <div className="p-1">Likes, reply</div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
