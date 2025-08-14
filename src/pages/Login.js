import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (v) => {
    try {
      await login(v.email, v.password);
      navigate("/home"); // go Home
    } catch (e) {
      alert("Invalid email or password");
    }
  };

  return (
  <div className="auth-page">
    <div className="card auth-card">
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Email"
          {...register("email", { required: "Please enter your email" })}
        />
        {errors.email && <small className="error">{errors.email.message}</small>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Please enter your password",
            minLength: { value: 6, message: "Password must be at least 6 characters" }
          })}
        />
        {errors.password && <small className="error">{errors.password.message}</small>}

        <button type="submit">Login</button>
      </form>
      <p>New here? <Link to="/register">Create an account</Link></p>
    </div>
  </div>
  );
}
