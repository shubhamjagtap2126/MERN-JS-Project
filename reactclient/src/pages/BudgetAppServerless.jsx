import { toast } from "react-toastify";
import { LocalStorageLoader } from "../Helper";
import { Form, redirect, useLoaderData } from "react-router-dom";

// =========> Page = BudgetApp <=========
export const BudgetServerless = ({ title = true }) => {
  return (
    <div>
      {title ? <h1>BudgetServerless</h1> : <h1 hidden>BudgetServerless</h1>}
      <UserForm />
    </div>
  );
};

// =========> Loader  <=========
export function ServiceLoader() {
  const userName = LocalStorageLoader("userName");
  const budgets = LocalStorageLoader("budgets");
  const expenses = LocalStorageLoader("expenses");
  return { budgets, expenses, userName };
}

// =========> Actions  <=========
export async function ServiceAction({ request }) {
  // await waait();

  const data = await request.formData();
  //   console.log(data, request);
  const { _action, ...values } = Object.fromEntries(data);
  // console.log(_action);
  //   console.log(values.userName);

  // new user submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      throw new Error("There was a problem creating your account.");
    }
  }
}

// =========> Form = User <=========
export function UserForm() {
  const { userName } = useLoaderData();

  return (
    <div>
      <section id="UserForm" className="UserForm">
        <div className="container">
          <div className="tab-content" data-aos="fade-right">
            {userName ? (
              <div className="d-flex flex-row justify-content-center card my-4 p-4">
                <h4 className="">
                  Hello and Welcome ! <span className=" text-primary">{userName}</span>
                </h4>
                <button className="btn btn-danger ms-auto">Delete User</button>
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
// =========> Budget = Card <=========
// =========> Budget = Page <=========
// =========> Expense = Form <=========
// =========> Expense = List <=========
// =========> Budget Page = Expense List <=========
