import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const mockArtists = [
  { id: 1, name: 'John Doe', avatar: '/placeholder.svg?height=40&width=40', role: 'Guitarist' },
  { id: 2, name: 'Jane Smith', avatar: '/placeholder.svg?height=40&width=40', role: 'Vocalist' },
  { id: 3, name: 'Bob Johnson', avatar: '/placeholder.svg?height=40&width=40', role: 'Drummer' },
  { id: 4, name: 'Alice Brown', avatar: '/placeholder.svg?height=40&width=40', role: 'Bassist' },
]

export function ActiveGridList() {
  return (
    <div className="w-full space-y-4">
      <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Active Artists</h2>
      <ul className="space-y-2">
        {mockArtists.map((artist) => (
          <li key={artist.id}>
            <Link href={`/pin-input?artist=${artist.id}`} passHref>
              <Button variant="outline" className="w-full justify-start gap-3 h-auto py-2 px-3 sm:px-4">
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                  <AvatarImage src={artist.avatar} alt={artist.name} />
                  <AvatarFallback>{artist.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="font-medium text-sm sm:text-base">{artist.name}</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">{artist.role}</span>
                </div>
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

