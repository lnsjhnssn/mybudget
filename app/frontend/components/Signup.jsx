import { useForm } from "@inertiajs/react";

export default function Signup() {
  const { data, setData, post, processing, errors } = useForm({
    user: {
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/users", {
      preserveScroll: true,
      preserveState: false,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="stack login-form">
        <h2>Sign Up</h2>

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

        <label htmlFor="password_confirmation" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          value={data.user.password_confirmation}
          onChange={(e) =>
            setData("user.password_confirmation", e.target.value)
          }
          placeholder="Confirm Password"
          required
          className="form-input"
        />

        <button type="submit" disabled={processing} className="btn-primary">
          {processing ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
