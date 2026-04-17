const AuthSidePanel = ({ title, subtitle }) => {
  return (
    <aside className="auth-side glass-card">
      <img
        className="auth-image"
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
        alt="Students collaborating"
      />
      <div className="auth-side-content">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </aside>
  );
};

export default AuthSidePanel;
