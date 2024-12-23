import React, { useState } from "react";

function ResetPassword({ currentUser }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpPopupOpen, setIsOtpPopupOpen] = useState(false);
  const [otpInputs, setOtpInputs] = useState(Array(6).fill("")); // 6 ký tự OTP
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        "https://lthshop.azurewebsites.net/api/Authen/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: currentUser.email }),
        }
      );
      if (!response.ok) throw new Error(await response.text());

      setSuccessMessage("OTP has been sent to your email.");
      setIsOtpPopupOpen(true); // Hiển thị popup OTP
    } catch (err) {
      setError(err.message || "Failed to send OTP. Try again.");
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]$/.test(value) && value !== "") return;
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value;
    setOtpInputs(newOtpInputs);

    if (value !== "" && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const otpValue = otpInputs.join("");
      const response = await fetch(
        "https://lthshop.azurewebsites.net/api/Authen/change-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: currentUser.email,
            otp: otpValue,
            newPassword,
          }),
        }
      );
      if (!response.ok) throw new Error(await response.text());

      alert("Password changed successfully!");
      setIsOtpPopupOpen(false);
    } catch (err) {
      setError(err.message || "Failed to change password.");
    }
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Change Password
          </h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              handlePasswordReset();
            }}
          >
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.us"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                placeholder="••••••••"
                className="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.us"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>

      {/* Popup nhập OTP */}
      {isOtpPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
            <div className="flex justify-between mb-4">
              {otpInputs.map((value, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  className="w-12 h-12 text-center border rounded-md text-lg mr-2"
                  value={value}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                />
              ))}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsOtpPopupOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleOtpSubmit}
                className="px-4 py-2 text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ResetPassword;
