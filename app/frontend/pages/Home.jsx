import { useState } from "react";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import Logo from "@/assets/v.png";

export default function Home({ minPasswordLength }) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="home-container container-md">
      <div className="home-header stack">
        <div className="logo-container">
          <h1>Spara</h1>
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
              <Signup minPasswordLength={minPasswordLength} />
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
