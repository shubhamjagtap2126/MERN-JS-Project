import { createSlice, nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// =========> Redux = Slice | Selector | Dispatch <=========
export const TodosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [
      { id: 1, todo: "Hey", completed: false },
      { id: 2, todo: "Okay", completed: false },
    ],
    loading: false,
    error: "",
  },
  reducers: {
    // dispatchType(state, action) {}
    todoAdd: (state, action) => {
      state.todos.push(action.payload);
    },
    todoToggled: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      return { ...state, todos: state.todos.filter((todo) => todo.id !== action.payload) };
    },
    isLoading: (state) => {
      return { ...state, loading: true };
    },
    isError: (state, action) => {
      return { ...state, error: action.payload };
    },
  },
});

export const selectTodos = (state) => state.todos;
export const { todoAdd, todoToggled, deleteTodo, isLoading, isError } = TodosSlice.actions;

// =========> Todos = Page <=========
export const Todos = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector(selectTodos);

  // console.log(todos);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    try {
      // console.log(newTodo);
      dispatch(todoAdd({ id: nanoid(), todo: newTodo, completed: false }));
      toast.success(`Todo: ${newTodo} created`);
    } catch (error) {
      dispatch(isError(error));
    } finally {
      setNewTodo("");
    }
  };

  const handleComplete = (todo) => {
    try {
      // console.log(todo);
      dispatch(todoToggled(todo.id));
      toast.info(`Todo: ${todo.todo} Completed`);
    } catch (error) {
      dispatch(isError(error.message));
    }
  };

  const handleDelete = (todo) => {
    try {
      console.log(todo);
      dispatch(deleteTodo(todo.id));
      toast.error(`Todo: ${todo.todo} Deleted`);
    } catch (error) {
      dispatch(isError(error.message));
    }
  };

  return (
    <>
      <h3>Using ReduxToolkit </h3>
      <div className="row align-items-center">
        <div class="input-group mb-3">
          <input type="text" className="form-control" placeholder="Add todo" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
          <button className="btn btn-primary" type="button" id="button-addon2" onClick={handleAddTodo}>
            Add
          </button>
        </div>

        {loading && <p>Loading tasks...</p>}
        {error && <p>`error: ${error}`</p>}
        {todos && (
          <ul className="list-group">
            {todos.map((todo, index) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={todo.id}>
                <div className="me-1">
                  <input className="form-check-input " type="checkbox" checked={todo.completed} onChange={() => handleComplete(todo)} />
                  <label className="form-check-label ms-2" for="firstCheckbox">
                    {todo.todo}
                  </label>
                </div>
                <button className="btn btn-danger ms-4" onClick={() => handleDelete(todo)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
