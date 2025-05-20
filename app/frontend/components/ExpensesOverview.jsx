import React from "react";

export default function ExpensesOverview({
  totalExpenses,
  budget,
  remainingBudget,
  dateFilter,
}) {
  return (
    <div className="expense-list-overview">
      <div className="flex justify-between">
        <p>Total Expenses</p>
        <p className="expense-list__total">{totalExpenses.toFixed(2)}</p>
      </div>

      {budget && dateFilter === "this_month" && (
        <>
          <div className="flex justify-between">
            <p>Monthly Budget</p>
            <p className="expense-list__budget">{budget.amount.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Remaining</p>
            <p
              className={`expense-list__remaining ${
                remainingBudget < 0 ? "expense-list__remaining--negative" : ""
              }`}
            >
              {remainingBudget.toFixed(2)}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
