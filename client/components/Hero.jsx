import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero glass-card">
      <p className="hero-tag">Student-first networking platform</p>
      <h1>
        Build with clarity.
        <br />
        Launch with confidence.
      </h1>
      <p className="hero-subtitle">
        Connect with classmates, share ideas, and grow your college career in one clean space.
      </p>
      <div className="hero-actions">
        <Link to="/signup" className="gradient-btn">
          Get Started
        </Link>
        <Link to="/login" className="outline-btn">
          Login
        </Link>
      </div>
    </section>
  );
};

export default Hero;
