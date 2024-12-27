'use client';

import useCanvasCursor from "./useCanvasCursor";

const CanvasCursor = () => {
  useCanvasCursor();
  return (
    <canvas
      className="pointer-events-none fixed inset-0 z-[99999]" // Đảm bảo canvas nằm trên cùng
      id="canvas"
    />
  );
};

export default CanvasCursor;
