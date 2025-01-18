interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  startDrawing: (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => void;
  draw: (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => void;
  stopDrawing: () => void;
}

export default function Canvas({
  canvasRef,
  startDrawing,
  draw,
  stopDrawing,
}: CanvasProps) {
  return (
    <div className="relative aspect-square rounded-xl border bg-card">
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-xl bg-white"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
    </div>
  );
}
