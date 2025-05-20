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

        {errors.user?.email && (
          <div className="text-error">{errors.user.email}</div>
        )}
        {errors.user?.password && (
          <div className="text-error">{errors.user.password}</div>
        )}
        {errors.message && <div className="text-error">{errors.message}</div>}

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

        <button
          type="submit"
          disabled={processing}
          className="btn-large btn-blue"
        >
          {processing ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
