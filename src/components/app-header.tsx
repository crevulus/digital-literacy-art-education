import { Button } from "@/components/ui/button";
import { ArrowLeftRight, Check } from "lucide-react";

interface HeaderProps {
  showIcons?: boolean;
  onSave?: () => void;
  onBack?: () => void;
  title?: string;
}

function AppHeader({
  showIcons = false,
  onSave,
  onBack,
  title = "[App Name]",
}: HeaderProps) {
  return (
    <header className="border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 bg-white">
      <div className="container max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        {showIcons ? (
          <Button
            variant="reverse"
            size="icon"
            className="rounded-full"
            onClick={onBack}
          >
            <ArrowLeftRight className="h-5 w-5" />
          </Button>
        ) : (
          <div className="w-10" />
        )}

        <h1 className="text-lg font-semibold">{title}</h1>

        {showIcons ? (
          <Button
            variant="reverse"
            size="icon"
            onClick={onSave}
            className="rounded-full"
          >
            <Check className="h-5 w-5" />
          </Button>
        ) : (
          <div className="w-10" />
        )}
      </div>
    </header>
  );
}

export { AppHeader };
