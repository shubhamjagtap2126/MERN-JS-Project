// # TasksSlice in TASKApp

import { PGTitle } from "./Home";
import { useFetcher, useLoaderData } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";
import { LocalStorageLoader } from "../Helper";
import { toast } from "react-toastify";
import ShortUniqueId from "short-unique-id";

// =========> Loader  <=========
export function TaskLoader() {
  const tasks = LocalStorageLoader("tasks");
  return { tasks };
}

// =========> Forms = Actions <=========
export async function TaskAction({ request }) {
  const data = await request.formData();
  //   console.log(data, request);
  const { _action, ...values } = Object.fromEntries(data);
  console.log({ _action, values });

  // Form submission
  if (_action === "newTask") {
    try {
      // dispatch(taskAdded({ action: values }));
      console.log(values.task);
      createTasks(values);
      return toast.success(`Welcome, ${values.task}`);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

// =========> Task = App <=========
export const TasksApp = () => {
  const tasks = useLoaderData();
  // console.log(tasks);

  const Fetcher = useFetcher();
  const isSubmitting = Fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div>
      <PGTitle title={"Tasks"} />
      <h3>Using Storage + Fetcher Form Loader & Actions</h3>
      <section>
        <Fetcher.Form method="post" ref={formRef}>
          <div className="mb-3">
            <input required ref={focusRef} type="text" className="form-control mx-3" name="task" placeholder="eg sleep" />
          </div>
          <input type="hidden" name="_action" value="newTask" />
          <button className="btn btn-primary">Create Task</button>
        </Fetcher.Form>
      </section>
    </div>
  );
};

// create tasks
const uid = new ShortUniqueId({ length: 6 }); // Uuid
export const createTasks = ({ values }) => {
  const newItem = {
    id: uid(),
    task: values.newTask,
    createdAt: Date.now(),
  };
  const existingTasks = LocalStorageLoader("tasks") ?? [];
  return localStorage.setItem("tasks", JSON.stringify([...existingTasks, newItem]));
};
