"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Paintbrush2, Eraser, Undo2, Trash2 } from "lucide-react";
import { AppHeader } from "@/components/app-header";

const COLORS = [
  "#F4A261", // Orange
  "#F9DC5C", // Yellow
  "#4DAA57", // Green
  "#4361EE", // Blue
  "#E76F51", // Red
  "#7209B7", // Purple
  "#000000", // Black
  "#FFFFFF", // White
];

export default function CanvasPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(COLORS[0]);
  const [tool, setTool] = useState<"brush" | "eraser">("brush");
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true }); // https://html.spec.whatwg.org/multipage/canvas.html#concept-canvas-will-read-frequently

      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;

      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 5;
        setContext(ctx);

        const initialState = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        setUndoStack([initialState]);
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    if (!context || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = ("touches" in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ("touches" in e ? e.touches[0].clientY : e.clientY) - rect.top;

    context.beginPath();
    context.moveTo(x, y);
    context.strokeStyle = tool === "brush" ? color : "#FFFFFF";
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !context || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = ("touches" in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ("touches" in e ? e.touches[0].clientY : e.clientY) - rect.top;

    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing || !context || !canvasRef.current) return;

    setIsDrawing(false);
    context.closePath();

    const canvas = canvasRef.current;
    const newState = context.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack((prev) => [...prev, newState]);
  };

  const handleUndo = () => {
    if (!context || !canvasRef.current || undoStack.length <= 1) return;

    const newStack = [...undoStack];
    newStack.pop();
    const previousState = newStack[newStack.length - 1];

    context.putImageData(previousState, 0, 0);
    setUndoStack(newStack);
  };

  const handleClear = () => {
    if (!context || !canvasRef.current) return;

    const canvas = canvasRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);

    const newState = context.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack([newState]);
  };

  const handleSave = () => {
    if (!canvasRef.current) return;

    const cellId = searchParams.get("cell");
    // Here you would typically save the canvas data
    // For now, we'll just navigate back
    router.push(`/grid${cellId ? `?cell=${cellId}` : ""}`);
  };

  return (
    <div className="flex flex-col flex-1 bg-background">
      <AppHeader
        showIcons={true}
        onBack={() => router.back()}
        onSave={handleSave}
        title="Canvas"
      />

      <main className="flex-1 container max-w-3xl mx-auto p-4 space-y-4">
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

        <div className="grid grid-cols-8 gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              className="aspect-square rounded-full border-2 transition-transform hover:scale-110 active:scale-95"
              style={{
                backgroundColor: c,
                borderColor: color === c ? "var(--primary)" : "transparent",
              }}
              onClick={() => {
                setColor(c);
                setTool("brush");
              }}
            />
          ))}
        </div>

        <div className="flex justify-between">
          <Button
            variant={tool === "brush" ? "noShadow" : "neutral"}
            className="aspect-square"
            onClick={() => setTool("brush")}
          >
            <Paintbrush2 className="h-6 w-6" />
          </Button>
          <Button
            variant={tool === "eraser" ? "noShadow" : "neutral"}
            className="aspect-square"
            onClick={() => setTool("eraser")}
          >
            <Eraser className="h-6 w-6" />
          </Button>
          <Button
            variant="neutral"
            className="aspect-square"
            onClick={handleUndo}
            disabled={undoStack.length <= 1}
          >
            <Undo2 className="h-6 w-6" />
          </Button>
          <Button
            variant="neutral"
            className="aspect-square"
            onClick={handleClear}
          >
            <Trash2 className="h-6 w-6" />
          </Button>
        </div>
      </main>
    </div>
  );
}
