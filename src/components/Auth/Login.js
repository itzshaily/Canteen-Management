import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Card, Form, Button, Alert, Container } from "react-bootstrap";
import Logo from '../Logo/Logo';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [splitEmail, setSplitEmail] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setSplitEmail(e.target.value.split("@")[0] || "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }
    try {
      setError("");
      setLoading(true);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Failed to sign in: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <Container>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <Card 
              className="shadow-lg border-0"
              style={{ 
                borderRadius: "24px",
                backdropFilter: "blur(10px)",
                background: "rgba(255, 255, 255, 0.95)"
              }}
            >
              <Card.Body className="p-5">
                <div className="text-center mb-4">
  <Logo size="small" />
  <h2 className="fw-bold text-dark mb-2 mt-3">Welcome Back</h2>
  <p className="text-muted">Sign in to your account</p>
</div>

                {error && (
                  <Alert 
                    variant="danger" 
                    className="border-0 rounded-3"
                    style={{ background: "rgba(220, 53, 69, 0.1)" }}
                  >
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  {email && (
                    <div className="text-center mb-4">
                      <img
                        src={`https://ui-avatars.com/api/?name=${splitEmail}&background=667eea&color=fff&rounded=true&size=80`}
                        alt="profile"
                        className="rounded-circle shadow-sm border border-3"
                        style={{ borderColor: "#667eea" }}
                        width="80"
                        height="80"
                      />
                    </div>
                  )}

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold text-dark">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                      className="border-0 shadow-sm rounded-3 py-3"
                      style={{ 
                        background: "rgba(102, 126, 234, 0.05)",
                        fontSize: "16px"
                      }}
                      placeholder="Enter your email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold text-dark">Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-0 shadow-sm rounded-3 py-3"
                      style={{ 
                        background: "rgba(102, 126, 234, 0.05)",
                        fontSize: "16px"
                      }}
                      placeholder="Enter your password"
                    />
                  </Form.Group>

                  <Button
                    disabled={loading}
                    type="submit"
                    className="w-100 py-3 fw-bold border-0 rounded-3 shadow-sm"
                    style={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      fontSize: "16px",
                      letterSpacing: "0.5px"
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Signing In...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Sign In
                      </>
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            <div className="text-center mt-4">
              <p className="text-white mb-0">
                Don't have an account?{" "}
                <Link 
                  to="/signup" 
                  className="text-white fw-bold text-decoration-none"
                  style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;




// Purpose: Provides a styled login form for your canteen app using React, Bootstrap, and Firebase.

//Email/Password State: Tracks the user’s input as they type.

//Validation: Checks that the email has proper format before allowing login.

//Profile Avatar: Shows a dynamically generated avatar using the part before the “@” of the entered email (via ui-avatars.com).

//Firebase Auth: When the form is submitted and validated:

//Signs the user in with Firebase Authentication.

//On success, redirects (navigate("/")) to the homepage/dashboard.

//On error, displays a descriptive alert.

//Loading State: Disables the button while login is processing.

//Sign Up Link: At the bottom, provides a link for users who don't yet have an account.
