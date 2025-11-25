
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkBg p-4">
      <div className="text-center max-w-md">
        <div className="mb-6 text-9xl font-bold bg-gradient-to-r from-purple-light to-neon bg-clip-text text-transparent">
          404
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white">Page Not Found</h1>
        <p className="text-gray-400 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Button asChild className="bg-gradient-purple hover:opacity-90">
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
