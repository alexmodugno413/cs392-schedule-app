import { NavLink } from "react-router-dom";
import "./Banner.css";
import { signInWithGoogle, signOut, useAuthState } from "../utilities/firebase";

const SignInButton = () => (
  <button
    className="ms-auto btn btn-dark sign-in-button"
    onClick={signInWithGoogle}
  >
    Sign in
  </button>
);

const SignOutButton = () => (
  <button className="ms-auto btn btn-dark sign-in-button" onClick={signOut}>
    Sign out
  </button>
);

const AuthButton = () => {
  const [user] = useAuthState();
  return user ? <SignOutButton /> : <SignInButton />;
};

const Banner = ({ title }) => {
  return (
    <div className="banner">
      <div className="title-container">
        <h1>{title}</h1>
      </div>
      <div className="login-button">
        <AuthButton />
      </div>
    </div>
  );
};

export default Banner;
