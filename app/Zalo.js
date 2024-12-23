'use client'
import React, { useEffect } from "react";

function Zalo() {
  useEffect(() => {
    const loadZaloSDK = () => {
      const script = document.createElement("script");
      script.src = "https://sp.zalo.me/plugins/sdk.js";
      script.async = true;
      document.body.appendChild(script);
    };

    if (document.readyState === "complete") {
      loadZaloSDK();
    } else {
      window.addEventListener("load", loadZaloSDK);
    }

    return () => {
      window.removeEventListener("load", loadZaloSDK);
    };
  }, []);
  return (
    <div
      className="zalo-chat-widget mb-8 bottom-5"
      data-oaid="4429417708941158236"
      data-welcome-message="Rất vui khi được hỗ trợ bạn!"
      data-autopopup="0"
      data-width=""
      data-height=""
    ></div>
  );
}

export default Zalo;
