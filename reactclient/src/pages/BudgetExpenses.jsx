import { createContext, useReducer, useContext, useEffect, useState } from "react";
import { Form, useParams, Link, Outlet } from "react-router-dom";
import { PGTitle } from "./Home";
import { toast } from "react-toastify";
import { useAuthContext } from "../Hooks";
import { axiosInstance } from "./OldFiles/Tasks";
import { AuthContext } from "../context/AuthContext";
import { ProgressBar } from "react-bootstrap";
import { TabsMenu } from "../components/Tabs";
import { SiteData } from "../SiteData";

// =========> Page = Outlet <=========
export function BudgetPage() {
  return (
    <div>
      <section className="my-2 d-flex justify-content-center  ">
        <TabsMenu tabData={SiteData.PrivateMenus.BudgetTabMenu} />
      </section>

      <Outlet />
    </div>
  );
}

export function BudgetExpensesPage() {
  // const { user } = useContext(AuthContext);
  //   console.log(user.user.name);

  return (
    <div className="my-4 container">
      <section className="my-4">
        <PGTitle title="Budget" />
        <BudgetProvider>
          {/* <h3>
            Greetings <b className="text-primary">{user.user.name} </b>
          </h3> */}
          <div className="row">
            <div className="col">
              <BudgetForm />
            </div>
            <div className="col">
              <ExpensesForm />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <AllBudget />
            </div>
          </div>
        </BudgetProvider>
      </section>
    </div>
  );
}

// =========> Budget = Contect <=========

export const initialState = {
  budgets: [],
  expenses: [],
  loading: false,
  error: null,
};

export const ACTIONS = {
  FETCH_BUDGETS_REQUEST: "FETCH_BUDGETS_REQUEST",
  FETCH_BUDGETS_SUCCESS: "FETCH_BUDGETS_SUCCESS",
  FETCH_BUDGETS_ERROR: "FETCH_BUDGETS_ERROR",
  ADD_BUDGET: "ADD_BUDGET",
  UPDATE_BUDGET: "UPDATE_BUDGET",
  DELETE_BUDGET: "DELETE_BUDGET",
  ADD_EXPENSE: "ADD_EXPENSE",
  UPDATE_EXPENSE: "UPDATE_EXPENSE",
  DELETE_EXPENSE: "DELETE_EXPENSE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_BUDGETS_REQUEST:
      return { ...state, loading: true };
    case ACTIONS.FETCH_BUDGETS_SUCCESS:
      return { ...state, loading: false, budgets: action.payload };
    case ACTIONS.FETCH_BUDGETS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ACTIONS.ADD_BUDGET:
      return { ...state, budgets: [...state.budgets, action.payload] };
    case ACTIONS.UPDATE_BUDGET:
      return { ...state, budgets: [...state.budgets, action.payload] };
    case ACTIONS.DELETE_BUDGET:
      return { ...state, budgets: [...state.budgets, action.payload] };
    default:
      return state;
  }
};

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <BudgetContext.Provider value={{ state, dispatch }}>{children}</BudgetContext.Provider>;
};

// =========> components = Budget <=========

export const AllBudget = () => {
  const { state, dispatch } = useContext(BudgetContext);
  const { user } = useAuthContext();
  //   console.log(user.token);

  useEffect(() => {
    const fetchBudgets = async () => {
      // dispatch({ type: ACTIONS.FETCH_BUDGETS_REQUEST });
      try {
        const response = await axiosInstance.get("budget", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        dispatch({
          type: ACTIONS.FETCH_BUDGETS_SUCCESS,
          payload: response.data,
        });
        // console.log(response.data);

        toast.success(`Budgets loaded succesfully`);
      } catch {
        (err) => console.log(err.message);
      }
    };
    fetchBudgets();
  }, [dispatch]);

  return (
    <div className="container my-3">
      <h1>BudgetExpenses</h1>
      {state.loading && <p>Loading...</p>}
      {state.error && <p>Error: {state.error}</p>}
      {state.budgets ? (
        <div className="allbudgets">
          {/* <span>{user.token}</span> */}
          <div className="card">
            <ul className="list-group list-group-flush">
              {state.budgets.length > 0 &&
                state.budgets.map((budget, index) => (
                  <li
                    key={budget._id}
                    style={{
                      listStyle: "none",
                    }}
                  >
                    <BudgetBox budget={budget} />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <span>Error</span>
      )}
    </div>
  );
};

export const BudgetForm = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState();
  const initialBudget = { category: "", budgetAmount: 0 };
  const [formData, setFormData] = useState(initialBudget);
  const { category, budgetAmount } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user.token);

    await axiosInstance
      .post("budget", { category, budgetAmount: +budgetAmount }, { headers: { Authorization: `Bearer ${user.token}` } })
      .then((res) => {
        const data = res.data;
        console.log(data);
        toast.success(`Budget created ${data.category}`);
        localStorage.setItem("Budgets", JSON.stringify(data));
        setFormData(initialBudget);
      })
      .catch((err) => setError(err));
  };

  return (
    <div className="card  mx-3">
      {/* style={{ width: "30rem" }} */}
      <div className="card-body mt-2  ">
        <h5 className="card-title">Create your Budget </h5>
        <Form>
          <div className="mb-3">
            <label htmlFor="newBudget">Budget Name</label>
            <input id="newBudget" type="text" name="category" value={category} placeholder="Eg. Grocery" className="form-control" onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="newBudgetAmount">Amount</label>
            <input type="number" name="budgetAmount" value={budgetAmount} id="newBudgetAmount" placeholder="Eg. Rs 2000" className="form-control" onChange={onChange} required />
          </div>
          {/* <input type="hidden" name="_action" value="createBudget" /> */}
          <button onClick={handleSubmit} className="btn btn-primary">
            {/* {isSubmitting ? (
                <span>Submitting…</span>
              ) : (
                <span>Create budget</span>
              )} */}
            Create budget
          </button>
          {error && <span>{error.message}</span>}
        </Form>
      </div>
    </div>
  );
};

// =========> Budget = Box <=========

//  <li key={b._id} className="list-group-item">
// <b>{b.category}</b>
// <span>{b.budgetAmount}</span>
// </li>

export const BudgetBox = ({ budget }) => {
  const color = `#${(((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0")}`;
  // console.log({ budget });

  return (
    <div>
      <b className="h3 card-text">{budget.category}</b> <br />
      <small className="card-subtitle">{budget.budgetAmount}</small>
      <div>
        <ProgressBar now={30} variant={color} />
        <div className="">
          <small> spent</small>
          <small> remaining</small>
        </div>
      </div>
      <CalculateExpensesBudget />
      <Link to={`${budget._id}`} className="btn btn-outline-dark mx-3">
        View Budget
      </Link>
    </div>
  );
};

// =========> Budget = Single <=========
export const OneBudget = () => {
  const params = useParams();
  return (
    <>
      <PGTitle title={`Budget`} />
      {/* <PGTitle title={`Budget|${state.budgets.category}`} /> */}
      <div className="oneBudgetPage">{params.budget_id}</div>
    </>
  );
};

// =========> Expenses = create form <=========
export const ExpensesForm = () => {
  const { state, dispatch } = useContext(BudgetContext);
  const { user } = useAuthContext();
  const initialExpense = {
    budget: null,
    expense: "",
    expenseAmount: 0,
  };
  const [formData, setFormData] = useState(initialExpense);
  const { budget, expense, expenseAmount } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({ budget, expense, expenseAmount: +expenseAmount });
      // console.log(`budget/${budget}`);
      // console.log(state.budgets);
      const res = await axiosInstance.post(`budget/${budget}`, { budget, expense, expenseAmount: +expenseAmount }, { headers: { Authorization: `Bearer ${user.token}` } });

      const data = res.data;
      console.log(data);
      toast.success(`${data.expense} Expense created`);
      localStorage.setItem("Expenses", JSON.stringify(data));
      setFormData(initialExpense);
    } catch {
      (err) => console.log(err.message);
    }
  };

  return (
    <>
      <div className="card mx-3">
        {/* style={{ width: "30rem" }} */}
        <div className="card-body mt-2  ">
          <h5 className="card-title">Create Expenses </h5>
          <Form className="form-input">
            <div className="mb-3">
              <label htmlFor="expense">Add Expense</label>
              <input className="form-control" type="text" name="expense" value={expense} id="expense" onChange={onChange} placeholder="eg. assets" />
            </div>
            <div className="mb-3">
              <label htmlFor="expenseAmount">Add Expense</label>
              <input className="form-control" type="number" name="expenseAmount" value={expenseAmount} id="expenseAmount" onChange={onChange} placeholder="eg. 0" />
            </div>
            {state.budgets && (
              <div className="input-group mb-3">
                <select className="form-select" name="budget" value={budget} onChange={onChange}>
                  <option>Choose</option>
                  {state.budgets.map((budg, i) => (
                    <option id="budget" value={budg._id} key={i}>
                      {budg.category}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button onClick={handleSubmit} className="btn btn-info">
              Add Expenses
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

// =========> Calculations =  <=========

export const CalculateExpensesBudget = () => {
  const { state } = useContext(BudgetContext);
  const { user } = AuthContext;
  // console.log(state.budgets, state.expense);

  return <div>BudgetExpenses</div>;
};
