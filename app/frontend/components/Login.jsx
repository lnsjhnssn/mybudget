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
    <div>
      <form onSubmit={handleSubmit} className="stack login-form">
        <h2>Login</h2>

        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          value={data.user.email}
          onChange={(e) => setData("user.email", e.target.value)}
          placeholder="Email"
          required
          className="form-input"
        />
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          value={data.user.password}
          onChange={(e) => setData("user.password", e.target.value)}
          placeholder="Password"
          required
          className="form-input"
        />

        <button type="submit" disabled={processing} className="btn-primary">
          {processing ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
