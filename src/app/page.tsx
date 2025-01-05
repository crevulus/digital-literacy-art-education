import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ActiveGridList } from "@/components/active-grid-list";
import { AppHeader } from "@/components/app-header";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-4 bg-background">
      <AppHeader />
      <div className="flex min-h-svh items-center justify-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
          Welcome to Artist Grid
        </h1>

        <div className="w-full max-w-md space-y-6 sm:space-y-8">
          <ActiveGridList />

          <div className="text-center">
            <Link href="/grid">
              <Button className="w-full sm:w-auto flex items-center justify-center gap-2">
                <PlusCircle size={20} />
                Create New Grid
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
