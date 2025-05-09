import { useForm } from "@inertiajs/react";

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    user: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/sessions", {
      preserveScroll: true,
      preserveState: false,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

      <input
        type="email"
        value={data.user.email}
        onChange={(e) => setData("user.email", e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={data.user.password}
        onChange={(e) => setData("user.password", e.target.value)}
        placeholder="Password"
        required
      />

      <button type="submit" disabled={processing}>
        {processing ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
}
