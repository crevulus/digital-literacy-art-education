import { MessageCircleQuestionIcon as QuestionMarkCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GridCell {
  id: string
  filled: boolean
  content?: string
  thumbnail?: string
}

interface GridProps {
  cells: GridCell[]
  onCellClick: (id: string) => void
}

export function Grid({ cells, onCellClick }: GridProps) {
  return (
    <div className="grid grid-cols-5 gap-1 sm:gap-2 p-1 sm:p-2 bg-card rounded-xl aspect-square">
      {cells.map((cell) => (
        <button
          key={cell.id}
          onClick={() => onCellClick(cell.id)}
          className={cn(
            "relative aspect-square rounded-lg transition-all",
            "hover:scale-[0.98] active:scale-[0.97]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            cell.filled ? "bg-background shadow-sm" : "bg-muted"
          )}
        >
          {!cell.filled && (
            <QuestionMarkCircle className="absolute inset-0 m-auto h-6 w-6 text-muted-foreground" />
          )}
          {cell.filled && cell.content && (
            <div className="absolute inset-0 flex items-center justify-center text-2xl">
              {cell.content}
            </div>
          )}
        </button>
      ))}
    </div>
  )
}

