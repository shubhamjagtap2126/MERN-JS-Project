import { toast } from "react-toastify";
import ShortUniqueId from "short-unique-id";
import { LocalStorageLoader, deleteItem, generateRandomColor, getAllMatchingItems } from "../Helper";
import { Form, Link, redirect, useFetcher, useLoaderData } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ProgressBar } from "react-bootstrap";

// =========> Page = BudgetApp <=========
export const BudgetServerless = ({ title = true }) => {
  const { budgets, expenses } = useLoaderData();
  return (
    <div>
      {title ? <h1>BudgetServerless</h1> : <h1 hidden>BudgetServerless</h1>}
      <section className="budgetForm container card my-3" data-aos="fade-right">
        <div className="card-body">
          <UserForm />
        </div>
      </section>
      <section className="forms container card d-md-flex flex-md-row">
        {budgets && budgets.length > 0 ? (
          <>
            <div className="card-body" data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="1000">
              <BudgetForm />
            </div>
            <div className="card-body " data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="2000">
              <ExpenseForm />
            </div>
          </>
        ) : (
          <div className="card-body" data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="1000">
            <BudgetForm />
          </div>
        )}
      </section>
      {budgets && budgets.length > 0 ? (
        <>
          <section className="lists container card d-lg-flex flex-lg-row mt-3">
            <div className="card-body" data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="1000">
              <BudgetCard budgets={budgets} />
            </div>
          </section>
          <section>
            <div className="card container my-3" data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="1000">
              <ExpenseList expenses={expenses} />
            </div>
          </section>
        </>
      ) : (
        <p className="container m-4">Try creating Budget</p>
      )}
    </div>
  );
};

// =========> Loader  <=========
export function BudgetLoader() {
  const userName = LocalStorageLoader("userName");
  const budgets = LocalStorageLoader("budgets");
  const expenses = LocalStorageLoader("expenses");
  return { budgets, expenses, userName };
}

// =========> Actions  <=========
export async function BudgetAction({ request }) {
  // await waait();

  const data = await request.formData();
  //   console.log(data, request);
  const { _action, ...values } = Object.fromEntries(data);
  // console.log({ _action, values });
  //   console.log(values.userName);
  // new user submission
  if (_action === "newUser") {
    try {
      // createUser({ userName: values.userName });
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      throw new Error(e.message);
    }
  }
  // new Budget
  if (_action === "createBudget") {
    try {
      // console.log({ budget: values.budget, budgetAmount: values.budgetAmount });
      createBudget({ values });
      return toast.success(`Success, ${values.budget} created`);
    } catch (e) {
      throw new Error(e.message);
    }
  }
  // new expenses
  if (_action === "createExpense") {
    try {
      // console.log({ expense: values.expense, expenseAmount: values.expenseAmount });
      createExpense({ values });
      return toast.success(`Success, ${values.expense} created`);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

// =========> Actions = Helper <=========
// Uuid
const uid = new ShortUniqueId({ length: 6 });

// Logout Actions
export async function LogOutAction() {
  // delete the user
  deleteItem({
    key: "userName",
  });
  toast.success("Successfully LogOut !");
  // return redirect
  return redirect("/budget/serverless");
}

// Delete Actions
export async function UserDeleteAction() {
  // delete the user
  deleteItem({
    key: "userName",
  });
  deleteItem({
    key: "budgets",
  });
  deleteItem({
    key: "expenses",
  });
  toast.success("Successfully Deleted !");
  // return redirect
  return redirect("/budget/serverless");
}

// create users
export const createUser = ({ userName }) => {
  const newItem = {
    id: uid(),
    userName: userName,
    createdAt: Date.now(),
  };
  const existingUsers = LocalStorageLoader("userName") ?? [];
  return localStorage.setItem("userName", JSON.stringify([...existingUsers, newItem]));
};

// create budget
export const createBudget = ({ values }) => {
  const newItem = {
    id: uid(),
    budget: values.budget,
    createdAt: Date.now(),
    budgetAmount: +values.budgetAmount,
    color: generateRandomColor(),
  };
  const existingBudgets = LocalStorageLoader("budgets") ?? [];
  return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]));
};

// create expense
export const createExpense = ({ values }) => {
  // console.log(calculateSpentByBudget(values.budget));
  // console.log(values.budget);

  const newItem = {
    id: uid(),
    expense: values.expense,
    budgetId: values.budget,
    createdAt: Date.now(),
    expenseAmount: +values.expenseAmount,
    // color: generateRandomColor(),
  };
  const existingExpenses = LocalStorageLoader("expenses") ?? [];
  return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]));
};

// total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = LocalStorageLoader("expenses") ?? [];
  // console.log(expenses);

  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) return acc;
    return (acc += expense.expenseAmount);
  }, 0);
  return budgetSpent;
};

export const colorCode = (index) => `#${(((1 << 80) * Math.random(index)) | 0).toString(16).padStart(6, "0")}`;

// Format currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "INR",
  });
};

// Date Format
export const formatDateToLocaleString = (val) => new Date(val).toLocaleDateString();

// =========> Form = User <=========
export function UserForm() {
  const { userName } = useLoaderData();

  return (
    <div>
      <section id="UserForm" className="UserForm">
        <div className="container">
          <div className="tab-content">
            {userName ? (
              <div className="d-flex flex-row align-items-center my-2">
                <h4 className="">
                  Welcome ! <span className=" text-primary">{userName}</span>
                </h4>
                <div className="ms-auto">
                  <button onClick={() => UserDeleteAction()} className="btn btn-danger mx-2">
                    Delete User
                  </button>
                  <button onClick={() => LogOutAction()} className="btn btn-primary mx-2">
                    LogOut
                  </button>
                </div>
              </div>
            ) : (
              <Form method="post">
                <div className="form-group d-flex col-8">
                  <input className="form-control " type="text" name="userName" required placeholder="What is your name?" />
                  <input type="hidden" name="_action" value="newUser" />
                  <button type="submit" className="btn btn-primary  mx-4 col-4">
                    <span>Create User</span>
                  </button>
                </div>
              </Form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// =========> Budget = Form <=========
export const BudgetForm = ({ title = true }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

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
      {title ? <h1>BudgetForm</h1> : <h1 hidden>BudgetForm</h1>}
      <div className="card">
        <div className="card-body">
          <fetcher.Form method="post" ref={formRef}>
            <div className="mb-3 d-flex flex-row align-items-center">
              <label htmlFor="budget" className="form-label h4 mx-3">
                Budget
              </label>
              <input required ref={focusRef} type="text" className="form-control mx-3" id="budget" name="budget" placeholder="eg Shopping" />
            </div>
            <div className="mb-3 d-flex flex-row align-items-center">
              <label htmlFor="budgetAmount" className="form-label h4 mx-3">
                Amount
              </label>
              <input required type="number" className="form-control mx-3" name="budgetAmount" id="budgetAmount" placeholder="eg 1000" />
            </div>
            <input type="hidden" name="_action" value="createBudget" />
            <button className="btn btn-success">Submit Budget</button>
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
};

// =========> Expense = Form <=========
export const ExpenseForm = ({ title = true }) => {
  const { budgets } = useLoaderData();
  // console.log(budgets);
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

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
      {title ? <h1>ExpenseForm</h1> : <h1 hidden>ExpenseForm</h1>}
      <div className="card">
        <div className="card-body">
          <fetcher.Form method="post" ref={formRef}>
            <div className="mb-3 d-flex flex-row align-items-center">
              <label htmlFor="expense" className="form-label h4 mx-3">
                Expense
              </label>
              <input required ref={focusRef} type="text" className="form-control mx-3" id="expense" name="expense" placeholder="eg Shopping" />
            </div>
            <div className="mb-3 d-flex flex-row align-items-center">
              <label htmlFor="expenseAmount" className="form-label h4 mx-3">
                Amount
              </label>
              <input required type="number" className="form-control mx-3" name="expenseAmount" id="expenseAmount" placeholder="eg 1000" />
            </div>
            <div className="mb-3 d-flex flex-row align-items-center">
              <label htmlFor="budgetDropdown" className="form-label h4 mx-3">
                Budget
              </label>
              <select required className="form-select my-2" name="budget" id="budgetDropdown" aria-label="Default select example">
                {/* <option selected>Choose Budget</option> */}
                {budgets &&
                  budgets.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.budget}
                    </option>
                  ))}
              </select>
            </div>
            <input type="hidden" name="_action" value="createExpense" />
            <button className="btn btn-dark">Submit Expense</button>
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
};
// =========> Budget = Card <=========
export const BudgetCard = ({ budgets, title = true }) => {
  return (
    <div>
      {title ? <h1>BudgetCard</h1> : <h1 hidden>BudgetCard</h1>}
      {budgets ? (
        <div className="row row-cols-1 row-cols-md-2">
          {budgets.map((item, index) => (
            <div
              className="card col-md-6 g-1"
              key={index}
              // style={{ backgroundColor: `hsl(${item.color})`, color: "white" }}
              // style={{ color: colorCode(index) }}
            >
              <div className="card-body justify-content-end">
                <h3 className="card-title d-flex flex-row justify-content-between">
                  {item.budget}
                  <i onClick={() => console.log(item.id)} className="bi bi-trash3-fill"></i>
                </h3>
                <p>{`budgetAmount : ${formatCurrency(item.budgetAmount)}`}</p>
                <ProgressBar now={100 * (calculateSpentByBudget(item.id) / item.budgetAmount)} variant={"success"} />
                <p className="card-text d-flex flex-row justify-content-between">
                  <span className="text-danger">{`${calculateSpentByBudget(item.id)} Spent`}</span>
                  <span className="text-success">{`${item.budgetAmount - calculateSpentByBudget(item.id)} Remaining`}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h3>Add Budgets</h3>
      )}
    </div>
  );
};

// =========> Expense = List <=========
export const ExpenseList = ({ expenses, title = true, showBudget = true }) => {
  return (
    <div>
      {title ? <h1>Expenses</h1> : <h1 hidden>Expenses</h1>}
      {expenses && expenses.length > 0 && (
        <table className="table align-content-center">
          <thead>
            <tr>
              {["Sr.No.", "Name", "Amount", "Date", showBudget ? "Budget" : "", "Delete"].map((i, index) => (
                <th key={index}>{i}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expenses.map((item, index) => (
              <tr key={index} className="align-content-center">
                <ExpenseItems item={item} index={index} showBudget={showBudget} />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// =========> Expense List = Row Item <=========
export const ExpenseItems = ({ item, index, showBudget }) => {
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: item.budgetId,
  })[0];
  return (
    <>
      <td>{index + 1}</td>
      <td>{item.expense}</td>
      <td>{formatCurrency(item.expenseAmount)}</td>
      <td>{formatDateToLocaleString(item.createdAt)}</td>
      {showBudget && (
        <td>
          <Link className="btn btn-outline-primary align-content-center rounded-5" to={`/budget/${item.budgetId}`}>
            {budget.budget}
          </Link>
        </td>
      )}
      <td>
        <i onClick={() => console.log(item.id)} className="bi bi-trash3" />
      </td>
    </>
  );
};

// =========> Budget Page = Expense List <=========


