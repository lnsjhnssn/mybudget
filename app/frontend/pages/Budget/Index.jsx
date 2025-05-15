import React, { useState } from "react";
import { router } from "@inertiajs/react";
import "../../styles/expenses.css";
import Navbar from "../../components/Navbar";

export default function BudgetIndex({ budget, user }) {
  const [amount, setAmount] = useState(budget?.amount || "");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (budget) {
      // Update existing budget
      router.put(
        `/budgets/${budget.id}`,
        { budget: { amount: parseFloat(amount) } },
        {
          onError: (errors) => setErrors(errors),
          preserveScroll: true,
        }
      );
    } else {
      // Create new budget
      router.post(
        "/budgets",
        { budget: { amount: parseFloat(amount) } },
        {
          onError: (errors) => setErrors(errors),
          preserveScroll: true,
        }
      );
    }
  };

  const formatAmount = (amount) => {
    const numAmount = parseFloat(amount);
    return isNaN(numAmount) ? "0.00" : numAmount.toFixed(2);
  };

  return (
    <>
      <Navbar />
      <div className="budget-page">
        <div className="budget-page__header">
          <h2 className="budget-page__title">Monthly Budget</h2>
          <p className="budget-page__welcome">Welcome, {user.email}</p>
        </div>

        <div className="budget-form">
          <form onSubmit={handleSubmit} className="budget-form__form">
            <div className="budget-form__field">
              <label htmlFor="amount" className="budget-form__label">
                Monthly Budget Amount (€)
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="budget-form__input"
                step="0.01"
                min="0"
                required
              />
              {errors.amount && (
                <div className="text-error">{errors.amount}</div>
              )}
            </div>
            <button type="submit" className="budget-form__button">
              {budget ? "Update Budget" : "Set Budget"}
            </button>
          </form>
        </div>

        {budget && (
          <div className="budget-info">
            <div className="budget-info__current">
              <h3>Current Budget</h3>
              <p className="budget-info__amount">
                €{formatAmount(budget.amount)}
              </p>
              <p className="budget-info__period">
                For{" "}
                {new Date(budget.month).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
