import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SEOHead
        title="Page Not Found"
        description="The page you are looking for does not exist."
        noIndex
      />
      <div className="text-center max-w-md px-4">
        <p className="text-6xl font-bold text-primary mb-4">404</p>
        <h1 className="text-3xl font-bold text-primary mb-3">
          Page not found
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          The page you are looking for may have been moved or no longer exists.
          Visit our homepage or contact us for assistance.
        </p>
        <Link
          to="/"
          className="inline-block btn-primary"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;