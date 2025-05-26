import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import Logo from "@/assets/v.png";

export default function Home({ authenticated }) {
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (authenticated) {
      router.visit("/dashboard");
    }
  }, [authenticated]);

  return (
    <div className="home-container container-md">
      <div className="home-header stack">
        <div className="logo-container">
          <h1>Spark</h1>
          <img src={Logo} alt="Spark" className="logo" />
        </div>

        <p className="home-header__description">
          Set a monthly spending goal. <br />
          Keep track of your purchases.
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
                  className="btn-small btn-grey"
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
                <button
                  onClick={() => setShowLogin(true)}
                  className="btn-small btn-grey"
                >
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
