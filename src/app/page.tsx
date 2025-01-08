"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Mock data - in a real app this would come from your backend
const mockActiveGrid = {
  id: "1",
  artists: [
    { id: "1", name: "Dad", avatar: "/placeholder.svg?height=100&width=100" },
    { id: "2", name: "Mum", avatar: "/placeholder.svg?height=100&width=100" },
    { id: "3", name: "Chris", avatar: "/placeholder.svg?height=100&width=100" },
  ],
};

export default function LandingPage() {
  // In a real app, you'd fetch this data
  const [activeGrid] = useState(mockActiveGrid);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b">
        <div className="container max-w-3xl mx-auto px-4 h-14 flex items-center justify-center">
          <h1 className="text-lg font-semibold">[App Name]</h1>
        </div>
      </header>

      <main className="flex-1 container max-w-3xl mx-auto px-4 flex flex-col items-center justify-center gap-16">
        {activeGrid ? (
          <div className="flex gap-12 items-center justify-center">
            {activeGrid.artists.map((artist) => (
              <Link
                key={artist.id}
                href={`/pin-input?artist=${artist.id}`}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="relative">
                  <Avatar className="w-24 h-24 border-2 border-border transition-transform group-hover:scale-105">
                    <AvatarImage src={artist.avatar} alt={artist.name} />
                    <AvatarFallback>{artist.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                </div>
                <span className="text-sm font-medium">{artist.name}</span>
              </Link>
            ))}
          </div>
        ) : null}

        <Link href="/grid" className="block">
          <Button
            variant="outline"
            size="icon"
            className={`
              rounded-full border-2 border-dashed
              transition-all duration-200
              hover:border-primary hover:bg-primary/5
              ${activeGrid ? "w-24 h-24" : "w-40 h-40"}
            `}
          >
            <Plus className={activeGrid ? "w-8 h-8" : "w-12 h-12"} />
            <span className="sr-only">Create New Grid</span>
          </Button>
        </Link>
      </main>
    </div>
  );
}
