import { useForm } from "@inertiajs/react";
import PasswordInput from "./PasswordInput";

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
      preserveState: true,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        <div className="form-field">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={data.user.email}
            onChange={(e) => setData("user.email", e.target.value)}
            placeholder="Email"
            required
            className="form-input"
          />
        </div>

        <PasswordInput
          id="password"
          label="Password"
          value={data.user.password}
          onChange={(e) => setData("user.password", e.target.value)}
          placeholder="Password"
          required
        />
        {errors.message && <div className="text-error">{errors.message}</div>}
        {errors.user?.email && (
          <div className="text-error">{errors.user.email}</div>
        )}
        {errors.user?.password && (
          <div className="text-error">{errors.user.password}</div>
        )}

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
