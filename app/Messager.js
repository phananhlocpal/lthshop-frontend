"use client";

import { FaFacebookMessenger } from "react-icons/fa";
import "@/assets/css/MessengerIcon.css";

export default function MessengerIcon() {
  const facebookPageUrl = "https://www.facebook.com/profile.php?id=61569420356528"; // Thay bằng URL Facebook Page của bạn

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        cursor: "pointer",
      }}
      onClick={() => window.open(facebookPageUrl, "_blank")}
    >
      <FaFacebookMessenger
        className="messenger-icon" // Thêm class để áp dụng hiệu ứng
        size={50}
        color="#0084ff"
        style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)", borderRadius: "50%" }}
      />
    </div>
  );
}
