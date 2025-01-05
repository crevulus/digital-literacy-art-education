'use client'

import { useSearchParams } from 'next/navigation'
import { PinInput } from '@/components/pin-input'
// import { AppHeader } from '@/components/header'

const mockArtists = [
  { id: '1', name: 'John Doe', avatar: '/placeholder.svg?height=100&width=100', role: 'Guitarist' },
  { id: '2', name: 'Jane Smith', avatar: '/placeholder.svg?height=100&width=100', role: 'Vocalist' },
  { id: '3', name: 'Bob Johnson', avatar: '/placeholder.svg?height=100&width=100', role: 'Drummer' },
  { id: '4', name: 'Alice Brown', avatar: '/placeholder.svg?height=100&width=100', role: 'Bassist' },
]

export default function PinInputPage() {
  const searchParams = useSearchParams()
  const artistId = searchParams.get('artist')
  
  const artist = mockArtists.find(a => a.id === artistId) || mockArtists[0]

  return (
    <>
      {/* <AppHeader /> */}
      <div className="flex min-h-screen items-center justify-center bg-background">
        <PinInput 
          username={artist.name} 
          avatarUrl={artist.avatar} 
          role={artist.role}
          artistId={artist.id}
        />
      </div>
    </>
  )
}

