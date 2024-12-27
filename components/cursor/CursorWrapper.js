"use client";

import AnimatedCursor from "react-animated-cursor";

export default function CursorWrapper() {
  return (
    <AnimatedCursor
      innerSize={8}
      outerSize={25} // Giảm kích thước viền ngoài
      innerScale={1}
      outerScale={1.5} // Giảm phóng to
      outerAlpha={0}
      outerStyle={{
        border: "3px solid #333",
      }}
      innerStyle={{
        backgroundColor: "#333",
      }}
    />
  );
}
