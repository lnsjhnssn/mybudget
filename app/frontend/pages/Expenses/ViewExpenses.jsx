import "../../styles/expenses.css";
import Navbar from "../../components/Navbar";

export default function ViewExpenses({ expenses, user }) {
  return (
    <>
      <Navbar />
      <div className="expense-list">
        <div className="expense-list__header">
          <h2 className="expense-list__title">All Expenses</h2>
          <p className="expense-list__welcome">Welcome, {user.email}</p>
        </div>
        <div>
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id} className="expense-item">
                <div className="expense-item__header">
                  <div>
                    <span className="expense-item__place">{expense.place}</span>
                    <span className="expense-item__date">{expense.date}</span>
                  </div>
                  <div className="cluster">
                    <span className="expense-item__amount">
                      €{expense.amount}
                    </span>
                    <div className="expense-item__tags">
                      {expense.tags.map((tag) => (
                        <span key={tag.id} className="expense-tag">
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
