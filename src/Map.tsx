import React, {useState, useEffect, useRef} from "react"
import { useMapCamera } from "./useMapCamera";
export function Map() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { camera, handlers } = useMapCamera();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width));
      canvas.height = Math.max(1, Math.floor(height));
    }

    resize();
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(resize)
        : null;

    if (resizeObserver) {
      resizeObserver.observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }

    function render() {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(camera.current.zoom, camera.current.zoom);
      ctx.translate(camera.current.x, camera.current.y);

      drawDebugGrid(ctx);

      requestAnimationFrame(render);
    }

    render();

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", resize);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", background: "#111" }}
      {...handlers}
    />
  );
}

function drawDebugGrid(ctx: CanvasRenderingContext2D) {
  const size = 50;
  const count = 40;

  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1;

  // draw vertical and horizontal lines
  for (let i = -count; i <= count; i++) {
    ctx.beginPath();
    ctx.moveTo(i * size, -count * size);
    ctx.lineTo(i * size, count * size);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-count * size, i * size);
    ctx.lineTo(count * size, i * size);
    ctx.stroke();
  }

  // red point in the center
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(0, 0, 5, 0, Math.PI * 2);
  ctx.fill();
}

export default Map
