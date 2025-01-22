"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArtistList } from "@/components/artist-list";
import { Grid } from "@/components/grid";
import { ExportModal } from "@/components/export-modal";
import { AddArtistModal } from "@/components/add-artist-modal";
import { Progress } from "@/components/ui/progress";

// Mock data for the grid cells (5x5)
const initialGridData = ["1", "2"].map((emoji, index) => ({
  id: index.toString(),
  filled: emoji !== "❓",
  content: emoji,
  thumbnail: "hi",
}));

export default function GridPage() {
  const router = useRouter();
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAddArtistModal, setShowAddArtistModal] = useState(false);
  const [lastContributorId] = useState<string>("1"); // placeholder
  const [gridData] = useState(initialGridData);

  const artists = [
    { id: "1", name: "Chris", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "2", name: "Mum", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "3", name: "Dad", avatar: "/placeholder.svg?height=40&width=40" },
  ];

  // const handleSave = () => {
  //   setShowExportModal(true);
  // };

  const handleAddArtist = () => {
    setShowAddArtistModal(true);
  };

  const handleCellClick = (id: string) => {
    router.push(`/canvas?cell=${id}`);
  };

  return (
    <div className="flex flex-col w-full">
      {/* <AppHeader showIcons onSave={handleSave} /> */}

      <main className="flex-1 container max-w-3xl mx-auto px-4 py-4 space-y-6">
        <ArtistList
          artists={artists}
          lastContributorId={lastContributorId}
          onAddArtist={handleAddArtist}
        />

        <Grid cells={gridData} onCellClick={handleCellClick} />

        <div className="space-y-2">
          <Progress
            value={(gridData.filter((cell) => cell.filled).length / 25) * 100}
          />
          <p className="text-center text-sm text-muted-foreground font-medium">
            {gridData.filter((cell) => cell.filled).length}/25
          </p>
        </div>
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
