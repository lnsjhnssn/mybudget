import { useMemo } from "react";

export function useExpenseData(expenses, budget) {
  const totalExpenses = useMemo(() => {
    return (
      expenses?.reduce((sum, expense) => {
        const amount = parseFloat(expense?.amount);
        if (isNaN(amount)) {
          console.warn("Invalid amount found:", expense);
          return sum;
        }
        return sum + amount;
      }, 0) || 0
    );
  }, [expenses]);

  const remainingBudget = useMemo(() => {
    return budget ? budget.amount - totalExpenses : 0;
  }, [budget, totalExpenses]);

  const expensesByTag = useMemo(() => {
    return (
      expenses?.reduce((acc, expense) => {
        expense.tags.forEach((tag) => {
          if (!acc[tag.name]) {
            acc[tag.name] = {
              total: 0,
              expenses: [],
            };
          }
          acc[tag.name].total += parseFloat(expense.amount);
          acc[tag.name].expenses.push(expense);
        });
        return acc;
      }, {}) || {}
    );
  }, [expenses]);

  const sortedTags = useMemo(() => {
    return Object.entries(expensesByTag).sort(
      ([, a], [, b]) => b.total - a.total
    );
  }, [expensesByTag]);

  return {
    totalExpenses,
    remainingBudget,
    expensesByTag,
    sortedTags,
  };
}
