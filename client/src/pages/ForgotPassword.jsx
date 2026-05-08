import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API_BASE_URL from "../config/api";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Step 1 - Send OTP
  const sendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("OTP sent to your email!");
        setStep(2);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to send OTP");
    }

    setLoading(false);
  };

  // Step 2 - Verify OTP and reset password
  const resetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp, newPassword })
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Password reset successful!");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Password reset failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-blue-600 mb-2">
          🔐 Forgot Password
        </h2>

        <p className="text-center text-gray-500 mb-6">
          {step === 1
            ? "Enter your email to receive OTP"
            : "Enter OTP and new password"}
        </p>

        {/* Step 1 - Email */}
        {step === 1 && (
          <form onSubmit={sendOTP}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* Step 2 - OTP + New Password */}
        {step === 2 && (
          <form onSubmit={resetPassword}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-center text-2xl tracking-widest"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full mt-3 text-blue-600 underline text-sm"
            >
              Resend OTP
            </button>
          </form>
        )}

        <p className="text-center mt-6 text-gray-600">
          Remember password?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;