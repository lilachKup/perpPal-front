import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

export default function CallbackPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("👀 CallbackPage mounted. isLoading:", auth.isLoading, "isAuthenticated:", auth.isAuthenticated);

    if (!auth.isLoading) {
      if (auth.isAuthenticated) {
        console.log("✅ React navigation to /home");
        navigate("/home", { replace: true });
      } else {
        console.log("❌ User not authenticated, redirecting to login...");
        navigate("/", { replace: true });
      }
    }
  }, [auth.isLoading, auth.isAuthenticated, navigate]);

  return <p>🔐 Logging in...</p>;
}

