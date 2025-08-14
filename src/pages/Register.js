import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Register() {
  const { register: rhf, handleSubmit, formState: { errors } } = useForm();
  const { register: signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (v) => {
    try {
      await signup(v.name, v.email, v.password);
      alert("Registered! Please login.");
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
  <div className="auth-page">
    <div className="card auth-card">
      <h1>Create account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Name"
          {...rhf("name", { required: "Please enter your name" })}
        />
        {errors.name && <small className="error">{errors.name.message}</small>}

        <input
          placeholder="Email"
          {...rhf("email", { required: "Please enter your email" })}
        />
        {errors.email && <small className="error">{errors.email.message}</small>}

        <input
          type="password"
          placeholder="Password"
          {...rhf("password", {
            required: "Please enter your password",
            minLength: { value: 6, message: "Password must be at least 6 characters" }
          })}
        />
        {errors.password && <small className="error">{errors.password.message}</small>}

        <button type="submit">Sign up</button>
      </form>
      <p>Already have an account? <Link to="/login">Sign in</Link></p>
    </div>
  </div>
  );
}
