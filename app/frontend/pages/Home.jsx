import { useEffect } from "react";
import { router } from "@inertiajs/react";
import Login from "@/Components/Login";
import Signup from "@/Components/Signup";

export default function Home({ authenticated }) {
  useEffect(() => {
    if (authenticated) {
      router.visit("/dashboard");
    }
  }, [authenticated]);

  return (
    <div>
      <h1>Welcome to Expense Tracker</h1>
      <Login />
      <Signup />
    </div>
  );
}
