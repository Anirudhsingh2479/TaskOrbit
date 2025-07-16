import Logo from "../../components/logo/index.jsx";
import { Button } from "../../components/ui/button.jsx";
import { Card, CardContent } from "../../components/ui/card.jsx";
import { Link, useNavigate } from "react-router-dom";

const GoogleOAuthFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <Logo />
          Team Sync.
        </Link>
        <div className="flex flex-col gap-6">
          <Card>
            <CardContent>
              <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1>Authentication Failed</h1>
                <div>We couldn't sign you in with Google. Please try again.</div>
                <Button onClick={() => navigate("/")} style={{ marginTop: "20px" }}>
                  Back to Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GoogleOAuthFailure;
