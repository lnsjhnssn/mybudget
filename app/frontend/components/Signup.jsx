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
      preserveState: true,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>

        <div className="form-field">
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
        </div>
        {errors.user?.email && (
          <div className="text-error">{errors.user.email}</div>
        )}

        <div className="form-field">
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
        </div>

        <div className="form-field">
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
          {errors.user?.password && (
            <div className="text-error">{errors.user.password}</div>
          )}
          {errors.user?.password_confirmation && (
            <div className="text-error">
              {errors.user.password_confirmation}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="btn-large btn-blue"
        >
          {processing ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
