import { useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";

function VerifiedPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const success = searchParams.get("success") === "true";
    const error = searchParams.get("error");

    // Auto-redirect to login after 3 seconds on success
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                navigate("/login");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success, navigate]);

    return (
        <div className="flex items-center justify-center h-screen bg-neutral-100">
            <div className="bg-white p-10 rounded-xl shadow-xl w-96 text-center space-y-6">

                {success ? (
                    <>
                        <div className="flex justify-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold text-green-700">
                            Email Verified!
                        </h1>

                        <p className="text-gray-600">
                            Your account has been verified successfully.
                            Redirecting to login...
                        </p>

                        <Link
                            to="/login"
                            className="inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-amber-700 transition"
                        >
                            Go to Login
                        </Link>
                    </>
                ) : (
                    <>
                        <div className="flex justify-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                <XCircle className="w-8 h-8 text-red-600" />
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold text-red-700">
                            Verification Failed
                        </h1>

                        <p className="text-gray-600">
                            {error === "invalid"
                                ? "The verification link is invalid or has already been used."
                                : "Something went wrong. Please try again."}
                        </p>

                        <Link
                            to="/signup"
                            className="inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-amber-700 transition"
                        >
                            Try Again
                        </Link>
                    </>
                )}

            </div>
        </div>
    );
}

export default VerifiedPage;
