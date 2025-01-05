"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import { ArtistList } from "@/components/artist-list";
import { Grid } from "@/components/grid";
import { ProgressBar } from "@/components/progress-bar";
import { ExportModal } from "@/components/export-modal";
import { AddArtistModal } from "@/components/add-artist-modal";

// Mock data for the grid cells (5x5)
const initialGridData = [
  "🌙",
  "👍",
  "⭐",
  "❤️",
  "🌙",
  "⭐",
  "❓",
  "❤️",
  "⭐",
  "👍",
  "❤️",
  "⭐",
  "🌙",
  "❓",
  "👍",
  "❓",
  "🌙",
  "👍",
  "🌙",
  "❤️",
  "❤️",
  "👍",
  "❓",
  "⭐",
  "❓",
].map((emoji, index) => ({
  id: index.toString(),
  filled: emoji !== "❓",
  content: emoji,
  thumbnail:
    emoji !== "❓"
      ? `/placeholder.svg?height=100&width=100&text=${emoji}`
      : undefined,
}));

export default function GridPage() {
  const router = useRouter();
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAddArtistModal, setShowAddArtistModal] = useState(false);
  const [lastContributorId] = useState<string>("1"); // Chris is the last contributor placeholder
  const [gridData] = useState(initialGridData);

  // Mock data for artists
  const artists = [
    { id: "1", name: "Chris", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "2", name: "Mum", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "3", name: "Dad", avatar: "/placeholder.svg?height=40&width=40" },
  ];

  const handleSave = () => {
    setShowExportModal(true);
  };

  const handleAddArtist = () => {
    setShowAddArtistModal(true);
  };

  const handleCellClick = (id: string) => {
    router.push(`/canvas?cell=${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader showIcons={true} onSave={handleSave} />

      <main className="flex-1 container max-w-3xl mx-auto px-4 py-4 space-y-6">
        <ArtistList
          artists={artists}
          lastContributorId={lastContributorId}
          onAddArtist={handleAddArtist}
        />

        <Grid cells={gridData} onCellClick={handleCellClick} />

        <ProgressBar
          current={gridData.filter((cell) => cell.filled).length}
          total={25}
        />
      </main>

      <ExportModal
        open={showExportModal}
        onClose={() => setShowExportModal(false)}
      />

      <AddArtistModal
        open={showAddArtistModal}
        onClose={() => setShowAddArtistModal(false)}
      />
    </div>
  );
}
