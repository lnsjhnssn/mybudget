import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import logoSpark from "../assets/logo_spark.svg";

export default function Home({ authenticated }) {
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (authenticated) {
      router.visit("/dashboard");
    }
  }, [authenticated]);

  return (
    <div className="home-container">
      <div className="home-header stack">
        <h1>
          <img src={logoSpark} alt="Spark" className="navbar__logo" />
        </h1>

        <p className="home-header__description">
          Set up your monthly spending goal and start tracking your expenses.
        </p>
      </div>

      <div className="auth-container">
        <div className="auth-box">
          {showLogin ? (
            <>
              <Login />
              <p className="auth-switch">
                Don't have an account?{" "}
                <button
                  onClick={() => setShowLogin(false)}
                  className="btn-link"
                >
                  Sign up
                </button>
              </p>
            </>
          ) : (
            <>
              <Signup />
              <p className="auth-switch">
                Already have an account?{" "}
                <button onClick={() => setShowLogin(true)} className="btn-link">
                  Log in
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
