import { Form, Outlet, useFetcher, useLoaderData } from "react-router-dom";
import { PGTitle } from "./Home";
import { LocalStorageLoader, waait } from "../Helper";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

// =========> Loader = LocalStorage <=========
export function BudgetLoader() {
  const user = LocalStorageLoader("user");
  //   const user = LocalStorageLoader("Budget");
  //   const user = LocalStorageLoader("Expenses");
  //   console.log(user);
  return { user };
}

// =========> Action =  <=========
export async function BudgetAction({ request }) {
  //   await waait();

  const data = await request.formData();
  console.log({ data, action });

  //   const { _action, ...values } = Object.fromEntries(data);

  //   // Budget Creation
  //   if (_action === "createBudget") {
  //     try {
  //       console.log(...values);

  //       //   createBudget({
  //       //     name: values.newBudget,
  //       //     amount: values.newBudgetAmount,
  //       //   });
  //       return toast.success("Budget created!");
  //     } catch (e) {
  //       throw new Error("There was a problem creating your budget.");
  //     }
  //   }
}

// =========> components = Budget <=========

export const BudgetForm = () => {
  const Fetcher = useFetcher();
  const isSubmitting = Fetcher.state === "submitting";

  //   const formRef = useRef();
  //   const focusRef = useRef();
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    Category: "",
    BudgetPrice: "",
  });
  const { Category, BudgetPrice } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/budget", {
        method: "POST",
        body: JSON.stringify({ Category, BudgetPrice }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      localStorage.setItem("budget", data);
    } catch (error) {
      setError("Problem");
    }
  };

  //   useEffect(() => {
  //     if (!isSubmitting) {
  //       formRef.current.reset();
  //       focusRef.current.focus();
  //     }
  //   }, [isSubmitting]);

  return (
    <div className="BudgetForm container">
      <div className="card col-md-6">
        {/* style={{ width: "30rem" }} */}
        <div className="card-body mt-2  ">
          <h5 className="card-title">Create your Budget </h5>
          <Form method="post">
            <div className="mb-3 forminput">
              <label htmlFor="newBudget">Budget Name</label>
              <input
                id="newBudget"
                type="text"
                name="Category"
                value={Category}
                placeholder="Eg. Grocery"
                className="form-control"
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3 forminput">
              <label htmlFor="newBudgetAmount">Amount</label>
              <input
                type="text"
                name="BudgetPrice"
                value={BudgetPrice}
                id="newBudgetAmount"
                placeholder="Eg. Rs 2000"
                className="form-control"
                onChange={onChange}
                required
              />
            </div>
            <input type="hidden" name="_action" value="createBudget" />
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn btn-primary my-4"
            >
              {isSubmitting ? (
                <span>Submitting…</span>
              ) : (
                <span>Create budget</span>
              )}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

// =========> Page = Outlet <=========

export const BudgetExpensesPage = () => {
  return (
    <div>
      {/* <h1>BudgetExpenses Page</h1> */}
      <Outlet />
    </div>
  );
};

// =========> Budget =  <=========
export const Budget = () => {
  const { user } = useLoaderData();

  return (
    <>
      <PGTitle title="Budget" />
      {user ? (
        <div className="BudgetPage container my-5 justify-content-center">
          <h3>
            Greetings <b className="text-primary">{user.user.name} </b>
          </h3>
          <BudgetForm />
        </div>
      ) : (
        <div className="error">{<Error />}</div>
      )}
    </>
  );
};

// =========> Expenses =  <=========
export const Expenses = () => {
  return (
    <>
      <PGTitle title="Expenses" />
      <div className="ExpensePage">Expenses</div>
    </>
  );
};
