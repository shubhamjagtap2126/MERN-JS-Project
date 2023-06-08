import { createContext, useReducer, useContext, useEffect, useState } from "react";
import { axiosInstance } from "./OldFiles/Tasks";
import { useAuthContext } from "../Hooks";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";
import { PGTitle } from "./Home";

export const TaskPage = () => {
  return (
    <div className="container col-md-8 my-4">
      <PGTitle title={"Tasks"} />
      <TasksProvider>
        <h1>Tasks</h1>
        <NewTaskForm />
        <TasksList />
      </TasksProvider>
    </div>
  );
};

export const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

export const ACTIONS = {
  FETCH_TASKS_REQUEST: "FETCH_TASKS_REQUEST",
  FETCH_TASKS_SUCCESS: "FETCH_TASKS_SUCCESS",
  FETCH_TASKS_ERROR: "FETCH_TASKS_ERROR",
  ADD_TASK: "ADD_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  DELETE_TASK: "DELETE_TASK",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_TASKS_REQUEST:
      return { ...state, loading: true };
    case ACTIONS.FETCH_TASKS_SUCCESS:
      return { ...state, loading: false, tasks: action.payload };
    case ACTIONS.FETCH_TASKS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ACTIONS.ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case ACTIONS.UPDATE_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <TasksContext.Provider value={{ state, dispatch }}>{children}</TasksContext.Provider>;
};

export const TasksList = () => {
  const { state, dispatch } = useContext(TasksContext);
  const { user } = useAuthContext();
  // console.log(state.tasks);

  useEffect(() => {
    const fetchTasks = async () => {
      dispatch({ type: ACTIONS.FETCH_TASKS_REQUEST });
      try {
        const response = await axiosInstance.get("tasks", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        dispatch({ type: ACTIONS.FETCH_TASKS_SUCCESS, payload: response.data });
        toast.success(`Tasks loaded succesfully`);
      } catch (error) {
        dispatch({ type: ACTIONS.FETCH_TASKS_ERROR, payload: error.message });
        toast.error(`Something went wrong`);
      }
    };
    fetchTasks();
  }, [user]);

  return (
    <>
      {state.loading && <p>Loading tasks...</p>}
      {state.error && <p>Error: {state.error}</p>}
      <ul className="list-group" style={{ listStyle: "none" }}>
        {state.tasks.map((task) => (
          <li key={task._id}>{<Task task={task} />}</li>
        ))}
      </ul>
    </>
  );
};

export const NewTaskForm = () => {
  const [task, setTask] = useState("");
  const { dispatch } = useContext(TasksContext);
  const { user } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("tasks", { task }, { headers: { Authorization: `Bearer ${user.token}` } });
      dispatch({ type: ACTIONS.ADD_TASK, payload: response.data });
      toast.success(`${task} added succesfully`);
      setTask("");
    } catch (error) {
      toast.error(`${error.message}`);
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <span className="input-group-text">Task</span>
        <input className="form-control" type="text" placeholder="Create your task" value={task} onChange={(event) => setTask(event.target.value)} />
        <button className="btn btn-outline-primary" type="submit">
          Add Task
        </button>
      </div>
    </form>
  );
};

export const Task = ({ task }) => {
  const [editing, setEditing] = useState(false);
  const [newTask, setTitle] = useState(task.task);
  const [isDone, setIsDone] = useState(task.isDone);
  const { dispatch } = useContext(TasksContext);
  const { user } = useAuthContext();

  const handlecomplete = async () => {
    // console.log(task.isDone);
    setIsDone((previsDone) => !previsDone);
    console.log(isDone);
    try {
      const response = await axiosInstance.patch(
        `tasks/${task._id}`,
        { isDone: isDone },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      dispatch({
        type: ACTIONS.UPDATE_TASK,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async () => {
    try {
      const response = await axiosInstance.patch(
        `tasks/${task._id}`,
        { task: newTask },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      dispatch({ type: ACTIONS.UPDATE_TASK, payload: response.data });
      console.log({ ...task, newTask });
      toast.success(`${task.task} updated wiht ${newTask}`);
      setEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      console.log({ task });

      const response = await axiosInstance.patch(
        `tasks/${task._id}`,
        { isActive: false },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      console.log(response.data);
      dispatch({ type: ACTIONS.DELETE_TASK, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="input-group ">
        {editing ? (
          <>
            <input className="form-control" type="text" value={newTask} onChange={(event) => setTitle(event.target.value)} />
            <button className="btn btn-info" onClick={handleUpdate}>
              Save
            </button>
          </>
        ) : (
          <div className="d-flex">
            <label>
              <input className="form-check-input me-1" type="checkbox" value="" aria-label="Checkbox for following text input" onClick={handlecomplete} />
              <span>{task.isDone}</span>
              <span>{task.task}</span>
              <span>{task._id}</span>
            </label>

            <div className="d-flex ms-0">
              <span>{task.isActive}</span>
              <small>
                {/* {task.createdAt} */}
                {formatDistanceToNow(new Date(task.createdAt), {
                  addSuffix: true,
                })}
              </small>
              <i className="h3 bi bi-pencil-square mx-2" onClick={() => setEditing(true)}></i>
              <i className="h3 bi bi-trash" onClick={handleDelete}></i>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};
