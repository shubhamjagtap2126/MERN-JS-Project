import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import MainNav from "../components/MainNav";
import { formatDistanceToNow } from "date-fns";
import { TaskApp } from "./Tasks2";

export default function Tasks() {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [task, setTask] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks");
      const json = await response.json();
      //   console.log(json);
      if (response.ok) {
        setTasks(json);
      }
    };
    fetchTasks();
  }, [tasks]);

  const createTask = async (e) => {
    e.preventDefault();
    setisLoading(true);
    const res = { user_id: user, task };
    console.log(res);
    // Create a new post
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(res),
    });
    const newTask = await response.json();
    if (!response.ok) {
      setError(newTask.error);
      setisLoading(false);
      setTask(null);
    }
    if (response.ok) {
      //   setTasks([...tasks, newTask]);
      //   console.log(newTask);
      setError(null);
      setisLoading(false);
      setTask("");
    }
  };

  const deleteTask = async () => {
    const id = tasks._id;
    console.log(id);
  };

  return (
    <>
      <Helmet>
        <title>Tasks</title>
      </Helmet>
      <MainNav />

      {/* <div className="posts2">
        <TaskApp />
      </div> */}

      <div className="row container-fluid mt-4">
        <div className="col">
          <div className="taskForm col-sm-12">
            <div className="">
              <i className="bi bi-list-task mx-2"></i>
              <span className="h3">Create Tasks</span>
            </div>
            <form onSubmit={createTask}>
              <label className="form-lable">Task</label>
              <input
                className="form-control d-inline-flex"
                type="text"
                id="task"
                placeholder="Enter Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              {isLoading && (
                <button className="btn btn-disable mt-2 d-inline-flex">
                  {" "}
                  Submiting..
                </button>
              )}
              {!isLoading && (
                <button className="btn btn-info mt-2"> Submit Task</button>
              )}
              {error && (
                <div className="alert alert-danger mt-2" role="alert">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="col overflow-auto">
          <div className="list-group col-sm-12 my-3">
            {tasks &&
              tasks.map((task) => (
                <div className="list-group-item" key={task._id}>
                  <div className="d-flex w-100 align-content-center justify-content d-inline-flex">
                    <input
                      type="checkbox"
                      className="form-check-input mx-0"
                      id={task._id}
                      value={task.isDone}
                    ></input>
                    <label className="form-check-label" for={task._id}>
                      <h5 className="mb-0 mx-4">{task.task}</h5>

                      {/* <span className="text-muted mb-0">{task.createdAt}</span> */}
                      <span className="text-muted mb-0">
                        {formatDistanceToNow(new Date(task.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </label>
                    <span>
                      <i className="bi bi-trash" onClick={deleteTask}></i>
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}



