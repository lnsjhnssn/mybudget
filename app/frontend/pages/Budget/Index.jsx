import React, { useState } from "react";
import { router } from "@inertiajs/react";
import "../../styles/theme.css";
import Layout from "../../components/Layout";

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
    <Layout>
      <main className="container-sm bg-secondary">
        <div className="page-header">
          <h2 className="page-title">Budget</h2>
        </div>
        <div className="p-m">
          {budget && (
            <div className="pb-xl flex justify-between font-bold font-1">
              <div>
                <p>Monthly Budget</p>
              </div>
              <div>
                <p>{formatAmount(budget.amount)}</p>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="stack">
            <div className="form-field">
              <label htmlFor="amount" className="form-label">
                Set Budget
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="form-input"
                step="0.01"
                min="0"
                required
              />
              {errors.amount && (
                <div className="text-error">{errors.amount}</div>
              )}
            </div>
            <button type="submit" className="btn-primary">
              {budget ? "Save changes" : "Save Budget"}
            </button>
          </form>
        </div>
      </main>
    </Layout>
  );
}
