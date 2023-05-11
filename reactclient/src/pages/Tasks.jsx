import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import MainNav from "../components/MainNav";

export default function Tasks() {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [task, setTask] = useState(null);
  const [user, setUser] = useState("644e044838846e2d25544153");

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
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    setisLoading(true);
    const res = { user_id: user, task };
    console.log(res);
    // Create a new post
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(res),
    });
    const newTask = await response.json();
    if (!response.ok) {
      setError(newTask.error);
      setisLoading(false);
    }
    if (response.ok) {
      //   setTasks([...tasks, newTask]);
      console.log(newTask);
      setError(null);
      setisLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Tasks</title>
      </Helmet>
      <MainNav />
      <div className="row container-fluid mt-4">
        <div className="col-6">
          <div className="taskForm container col-7">
            <h3>Create Tasks</h3>
            <form onSubmit={createTask}>
              <label className="form-lable">User</label>
              <input
                exact
                className="form-control"
                type="text"
                id="user"
                placeholder="Enter user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
              <label className="form-lable">Task</label>
              <input
                exact
                className="form-control"
                type="text"
                id="task"
                placeholder="Enter Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              {isLoading && (
                <button className="btn btn-disable mt-2"> Submiting..</button>
              )}
              {!isLoading && (
                <button className="btn btn-info mt-2"> Submit Task</button>
              )}
              {error && (
                <div class="alert alert-danger mt-2" role="alert">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="col-6">
          <div className="list-group container mt-3">
            {tasks &&
              tasks.map((task) => (
                <div className="list-group-item">
                  <div
                    className="d-flex w-100 justify-content-between"
                    key={task._id}
                  >
                    <input
                      type="checkbox"
                      className="form-check-input mx-0"
                      id="task"
                      value={task.isDone}
                    ></input>
                    <h5 className="mb-0 mx-4">{task.task}</h5>
                    {/* <p className="card-text">{task.isDone}</p> */}
                    <p class="mb-0">
                      <small class="text-muted">{task.createdAt}</small>
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
