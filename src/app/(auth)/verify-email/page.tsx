'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAgentRegistrationStore } from '@/store/agent-registration-store'

export default function VerifyEmailPage() {
  const router = useRouter()
  const [otp, setOtp] = useState(['', '', '', '', ''])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const { credentials, registrationResult, clearRegistrationResult } =
    useAgentRegistrationStore()

  // Check if user has registration data, redirect if not
  // useEffect(() => {
  //   if (!credentials.email || !registrationResult) {
  //     router.push('/signup')
  //   }
  // }, [credentials.email, registrationResult, router])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    pastedData.split('').forEach((char, index) => {
      if (index < 5) {
        newOtp[index] = char
      }
    })
    setOtp(newOtp)

    // Focus the last filled input or the next empty one
    const nextIndex = Math.min(pastedData.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }

  const handleNext = () => {
    const otpCode = otp.join('')
    if (otpCode.length === 5) {
      // Handle OTP verification here
      console.log('OTP:', otpCode)
      // Add your verification logic
    }
  }

  if (!credentials.email || !registrationResult) {
    return null // Will redirect in useEffect
  }

  const isOtpComplete = otp.every((digit) => digit !== '')

  return (
    <div className="flex w-full max-w-md flex-col gap-6 rounded-2xl sm:gap-8">
      {/* Header */}
      <div className="w-full space-y-2">
        <h1 className="from-primary to-lilac bg-gradient-to-r bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl md:text-5xl">
          We've sent your code!
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm">
          Enter the OTP below to confirm your email address and continue to the
          next step.
        </p>
      </div>

      {/* OTP Input */}
      <div className="flex w-full justify-center gap-1.5 sm:gap-2 md:gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="h-12 w-10 rounded-lg border-2 border-gray-300 text-center text-xl font-semibold transition-colors focus:border-green-600 focus:outline-none sm:h-14 sm:w-12 sm:text-2xl md:h-16 md:w-14"
          />
        ))}
      </div>

      {/* Next Button */}
      <div className="flex w-full justify-end">
        <Button
          onClick={handleNext}
          disabled={!isOtpComplete}
          className="from-primary to-lilac h-fit rounded-full bg-gradient-to-r text-sm font-semibold text-white disabled:opacity-70 sm:text-base"
        >
          <span className="px-6">Next</span>
        </Button>
      </div>
    </div>
  )
}
