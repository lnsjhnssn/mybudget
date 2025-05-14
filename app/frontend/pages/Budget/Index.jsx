import { useForm } from "@inertiajs/react";

export default function BudgetShow({ budget }) {
  const { data, setData, put } = useForm({
    month: budget.month,
    amount: budget.amount,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put("/budget", { data });
  };

  return (
    <div>
      <h2>Your Monthly Budget</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="month"
          value={data.month}
          onChange={(e) => setData("month", e.target.value)}
        />
        <input
          type="number"
          value={data.amount}
          onChange={(e) => setData("amount", e.target.value)}
        />
        <button type="submit">Update Budget</button>
      </form>
    </div>
  );
}
