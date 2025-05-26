import { useForm } from "@inertiajs/react";
import PasswordInput from "./PasswordInput";

export default function Signup() {
  const { data, setData, post, processing, errors } = useForm({
    user: {
      email: "",
      password: "",
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

        <PasswordInput
          id="password"
          label="Password"
          value={data.user.password}
          onChange={(e) => setData("user.password", e.target.value)}
          placeholder="Password"
          required
          showRequirements={true}
        />
        {errors.user?.password && (
          <div className="text-error">{errors.user.password}</div>
        )}

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
