import { useState } from "react";
import validator from "validator";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [signUp, setSignUp] = useState(true);
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleUserAuth = async () => {
    if (signUp) {
      if (validator.isEmpty(firstNameInput)) {
        console.log("First Name cannot be empty.");
        return;
      }

      if (validator.isEmpty(lastNameInput)) {
        console.log("Lat Name cannot be empty.");
        return;
      }

      if (
        !validator.isLength(firstNameInput, { min: 3, max: 20 }) ||
        !validator.isAlpha(firstNameInput)
      ) {
        console.log(
          "First name must be between 3 and 20 characters and contain only letters."
        );
        return;
      }
      if (
        !validator.isLength(lastNameInput, { min: 3, max: 20 }) ||
        !validator.isAlpha(lastNameInput)
      ) {
        console.log(
          "Last name must be between 3 and 20 characters and contain only letters."
        );
        return;
      }
    }

    if (validator.isEmpty(emailInput) || !validator.isEmail(emailInput)) {
      console.log("Please enter a valid email.");
      return;
    }

    if (
      validator.isEmpty(passwordInput) ||
      !validator.isStrongPassword(passwordInput, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      if (signUp) {
        console.log(
          "Password must be at least 8 characters with upper, lower, number and symbol."
        );
      } else {
        console.log("Invalid Credentials.");
      }
      return;
    }

    let userData = {
      firstName: firstNameInput,
      lastName: lastNameInput,
      email: validator.normalizeEmail(emailInput),
      password: passwordInput,
    };
    console.log(userData);

    try {
      let apiEndpoint = signUp ? "/signup" : "/login";
      const response = await fetch(BASE_URL + apiEndpoint, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("Error:", data.message);
        return;
      }
      console.log("Success:", data.message);
    } catch (error) {
      console.error("Error during authentication:", error);
      return;
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-sm border p-6 shadow-lg">
        <legend className="fieldset-legend w-full text-xl font-semibold">
          {signUp ? "Create Account" : "Login"}
        </legend>
        {signUp && (
          <>
            <label className="label">First Name</label>
            <input
              type="text"
              className="input input-bordered w-full input-neutral mb-2 rounded-xl"
              placeholder="First Name"
              value={firstNameInput}
              onChange={(e) => setFirstNameInput(e.target.value)}
            />

            <label className="label">Last Name</label>
            <input
              type="text"
              className="input input-bordered w-full input-neutral mb-2 rounded-xl"
              placeholder="Last Name"
              value={lastNameInput}
              onChange={(e) => setLastNameInput(e.target.value)}
            />
          </>
        )}

        <label className="label">Email</label>
        <input
          type="email"
          className="input input-bordered w-full input-neutral mb-2 rounded-xl"
          placeholder="test@gmail.com"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <label className="label">Password</label>
        <input
          type="password"
          className="input input-bordered w-full input-neutral mb-4 rounded-xl"
          placeholder="••••••••"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <button
          onClick={handleUserAuth}
          className="btn btn-primary w-full rounded-xl"
        >
          {signUp ? "Sign Up" : "Login"}
        </button>
        <p className="mt-4 text-center">
          {signUp ? "Already have an account?" : "Don't have an account yet?"}
          <button className="btn btn-link" onClick={() => setSignUp(!signUp)}>
            {signUp ? "Login" : "Sign Up"}
          </button>
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
