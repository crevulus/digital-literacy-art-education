'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface PinInputProps {
  username: string
  avatarUrl: string
  role: string
  artistId:string
}

export function PinInput({ username, avatarUrl, role, artistId }: PinInputProps) {
  const [pin, setPin] = useState('')
  const [isValid, setIsValid] = useState(true)
  const router = useRouter()

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPin = e.target.value.replace(/\D/g, '').slice(0, 4)
    setPin(newPin)
    setIsValid(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin.length === 4) {
      const isValidPin = pin === '1234' // This is a placeholder validation
      setIsValid(isValidPin)
      if (isValidPin) {
        router.push(`/grid?artist=${artistId}`)
      }
    } else {
      setIsValid(false)
    }
  }

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md space-y-6 p-4 sm:p-6 bg-card rounded-lg sm:rounded-xl shadow-md sm:shadow-lg">
      <div className="flex flex-col items-center space-y-2">
        <Avatar className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24">
          <AvatarImage src={avatarUrl} alt={username} />
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">{username}</h2>
        <p className="text-xs sm:text-sm text-muted-foreground">{role}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            value={pin}
            onChange={handlePinChange}
            className={`text-center text-xl sm:text-2xl ${
              !isValid ? 'border-red-500 focus-visible:ring-red-500' : ''
            }`}
            placeholder="Enter PIN"
          />
          {!isValid && (
            <p className="mt-2 text-xs sm:text-sm text-red-500">Invalid PIN. Please try again.</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  )
}

