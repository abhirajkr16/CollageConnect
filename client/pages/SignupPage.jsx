import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/authService";
import { useAuth } from "../components/AuthContext";
import AuthSidePanel from "../components/AuthSidePanel";

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await signupUser(form);
      login(data.token, data.user);
      navigate("/dashboard");
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container auth-layout">
      <form className="glass-card form-card" onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password (min 6)"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
          minLength={6}
          required
        />
        {error && <p className="error-text">{error}</p>}
        <button className="gradient-btn" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
      <AuthSidePanel
        title="Find your college circle"
        subtitle="Create your profile, share posts, and connect with students working on similar goals."
      />
    </div>
  );
};

export default SignupPage;
