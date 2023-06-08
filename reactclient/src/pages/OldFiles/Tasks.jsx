import {
  useEffect,
  useState,
  useReducer,
  createContext,
  useContext,
} from "react";
import { Form } from "react-router-dom";
import { Helmet } from "react-helmet";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import { useAuthContext } from "../../Hooks";
import { PGTitle } from "../Home";

export const TasksContext = createContext();

export const TasksContextProvider = ({ children }) => {
  const initialState = { tasks: [], loading: false, error: null };
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  // console.log(state);

  return (
    <TasksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  // console.log(context);

  if (!context) {
    throw Error("ERROR: TaskContext not loaded properly");
  }
  return context;
};

export const ACTIONS = {
  GET_TODOS: "GET-TODOS",
  SET_TODOS: "SET-TODOS",
  DONE_TODOS: "DONE_TODOS",
  DELETE_TODOS: "DELETE_TODOS",
};

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.GET_TODOS:
      return { ...state, tasks: action.payload, loading: false, error: "" };
    case ACTIONS.SET_TODOS:
      return { ...state, tasks: action.payload, loading: false, error: "" };
    case ACTIONS.DONE_TODOS:
      return { ...state, tasks: doneTask };
    case ACTIONS.DELETE_TODOS:
      return { ...state, tasks: deleteTask };
    default:
      return state;
  }
};

export const API_URL = "http://localhost:8000/api";
// const { token } = JSON.parse(localStorage.getItem("user"));

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const getTasks = async (token) => {
  const response = await axiosInstance.get("/tasks", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const setTasks = async ({ token, task }) => {
  const response = await axiosInstance.post(
    "/tasks",
    { task },
    {
      headers: { Authorization: `Bearer ${token}` },
      // dispatch({ type: ACTIONS.SET_TODOS, payload: response.data });
    }
  );
};

export const doneTask = async (id, completed) => {
  try {
    await axiosInstance.put(`/tasks/${id}`, { isDone: checked });
    // dispatch({ type: ACTIONS.DONE_TODOS, payload: { id, checked } });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (id) => {
  try {
    await axiosInstance.delete(`/tasks/${id}`);
    // dispatch({ type: ACTIONS.DELETE_TODOS, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const Tasks = () => {
  // const user = useAuthContext();
  const { user, token } = JSON.parse(localStorage.getItem("user"));
  const { dispatch, tasks } = useTasksContext();
  const [task, setTask] = useState("");
  // const [tasks, settasks] = useState("");

  useEffect(() => {
    getTasks(token).then((res) => {
      dispatch({ type: ACTIONS.GET_TODOS, payload: res.data });
      // console.log(res.data);
    });
  }, [task]);

  // console.log(tasks);
  // settasks(tasks);
  function handleSubmit(e) {
    e.preventDefault();
    setTasks({ token, task }).then((res, error) => {
      dispatch({
        type: ACTIONS.SET_TODOS,
        payload: { task, user_id: user._id },
        error,
        loading: true,
      });

      setTask("");
    });
    // console.log(task);
  }

  return (
    <div>
      <PGTitle title="Tasks" />
      <div className="container col-md-6 my-4">
        <h1>{`Welcome! ${user.name}`}</h1>

        <Form onSubmit={handleSubmit}>
          <input
            className="form-control"
            onChange={(e) => setTask(e.target.value)}
            value={task}
            name="task"
            type="text"
            placeholder="Enter your tasks"
            id="task"
          />
        </Form>
      </div>
      <div>
        <div className="task-list">
          <ul>
            {tasks ? (
              tasks.map((task) => {
                <li key={task._id}>{task.task}</li>;
              })
            ) : (
              <p>Not Task to load</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

// export const Tasks = () => {
//   // const [isLoading, setisLoading] = useState(false);
//   // const [error, setError] = useState(null);
//   // const [tasks, setTasks] = useState(null);
//   // const [task, setTask] = useState(null);
//   // const [user, setUser] = useState("");

//   // useEffect(() => {
//   //   const fetchTasks = async () => {
//   //     const response = await fetch("/api/tasks");
//   //     const json = await response.json();
//   //     //   console.log(json);
//   //     if (response.ok) {
//   //       setTasks(json);
//   //     }
//   //   };
//   //   fetchTasks();
//   // }, [tasks]);

//   // const createTask = async (e) => {
//   //   e.preventDefault();
//   //   setisLoading(true);
//   //   const res = { user_id: user, task };
//   //   console.log(res);
//   //   // Create a new post
//   //   const response = await fetch("/api/tasks", {
//   //     method: "POST",
//   //     headers: { "Content-Type": "application/json" },
//   //     body: JSON.stringify(res),
//   //   });
//   //   const newTask = await response.json();
//   //   if (!response.ok) {
//   //     setError(newTask.error);
//   //     setisLoading(false);
//   //     setTask(null);
//   //   }
//   //   if (response.ok) {
//   //     //   setTasks([...tasks, newTask]);
//   //     //   console.log(newTask);
//   //     setError(null);
//   //     setisLoading(false);
//   //     setTask("");
//   //   }
//   // };

//   // const deleteTask = async () => {
//   //   const id = tasks._id;
//   //   console.log(id);
//   // };

//   return (
//     <>
//       <Helmet>
//         <title>Tasks</title>
//       </Helmet>

//       <Tasks2 />

//       {/* <div className="posts2">
//         <TaskApp />
//       </div> */}
//     </>
//   );
// };

//       <div className="row container-fluid mt-4">
//         <div className="col">
//           <div className="taskForm col-sm-12">
//             <div className="">
//               <i className="bi bi-list-task mx-2"></i>
//               <span className="h3">Create Tasks</span>
//             </div>
//             <form onSubmit={"createTask"}>
//               {/*// TODO: */}
//               <label className="form-lable">Task</label>
//               <input
//                 className="form-control d-inline-flex"
//                 type="text"
//                 id="task"
//                 placeholder="Enter Task"
//                 value={task}
//                 onChange={(e) => setTask(e.target.value)}
//               />
//               {isLoading && (
//                 <button className="btn btn-disable mt-2 d-inline-flex">
//                   {" "}
//                   Submiting..
//                 </button>
//               )}
//               {!isLoading && (
//                 <button className="btn btn-info mt-2"> Submit Task</button>
//               )}
//               {error && (
//                 <div className="alert alert-danger mt-2" role="alert">
//                   {error}
//                 </div>
//               )}
//             </form>
//           </div>
//         </div>

//         <div className="col overflow-auto">
//           <div className="list-group col-sm-12 my-3">
//             {tasks &&
//               tasks.map((task) => (
//                 <div className="list-group-item" key={task._id}>
//                   <div className="d-flex w-100 align-content-center justify-content d-inline-flex">
//                     <input
//                       type="checkbox"
//                       className="form-check-input mx-0"
//                       id={task._id}
//                       value={task.isDone}
//                     ></input>
//                     <label className="form-check-label" for={task._id}>
//                       <h5 className="mb-0 mx-4">{task.task}</h5>

//                       {/* <span className="text-muted mb-0">{task.createdAt}</span> */}
//                       <span className="text-muted mb-0">
//                         {formatDistanceToNow(new Date(task.createdAt), {
//                           addSuffix: true,
//                         })}
//                       </span>
//                     </label>
//                     <span>
//                       <i className="bi bi-trash" onClick={deleteTask}></i>
//                     </span>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
