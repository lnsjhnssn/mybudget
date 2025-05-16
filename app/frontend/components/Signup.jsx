import { useForm, router } from "@inertiajs/react";

export default function Signup() {
  const { data, setData, post, processing, errors } = useForm({
    user: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/users");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="stack login-form">
        <h2>Sign Up</h2>
        <p>Create an account for free.</p>
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        {errors.password_confirmation && (
          <p style={{ color: "red" }}>{errors.password_confirmation}</p>
        )}
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={data.user.name}
          onChange={(e) => setData("user.name", e.target.value)}
          placeholder="Name"
          required
          className="form-input"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={data.user.email}
          onChange={(e) => setData("user.email", e.target.value)}
          placeholder="Email"
          required
          className="form-input"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={data.user.password}
          onChange={(e) => setData("user.password", e.target.value)}
          placeholder="Password"
          required
          className="form-input"
        />
        <label htmlFor="password_confirmation">Confirm Password</label>
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

        <button className="btn-primary" type="submit" disabled={processing}>
          {processing ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
