import { useRef } from "react";

export type Camera = {
  x: number;
  y: number;
  zoom: number;
};

export function useMapCamera() {
  const camera = useRef<Camera>({
    x: 0,
    y: 0,
    zoom: 1,
  });

  const isPanning = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  function onMouseDown(e: React.MouseEvent) {
    isPanning.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  }

  function onMouseUp() {
    isPanning.current = false;
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isPanning.current) return;

    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;

    camera.current.x += dx / camera.current.zoom;
    camera.current.y += dy / camera.current.zoom;

    lastMouse.current = { x: e.clientX, y: e.clientY };
  }

  function onWheel(e: React.WheelEvent) {
    e.preventDefault();

    const zoomFactor = 1.1;
    const direction = e.deltaY > 0 ? 1 / zoomFactor : zoomFactor;

    camera.current.zoom *= direction;
    camera.current.zoom = Math.min(Math.max(camera.current.zoom, 0.2), 5);
  }

  return {
    camera,
    handlers: {
      onMouseDown,
      onMouseUp,
      onMouseMove,
      onWheel,
    },
  };
}
