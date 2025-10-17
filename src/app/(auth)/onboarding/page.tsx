'use client'

import { Header } from '@/components/layout/header'
import BankDetailsForm from '@/components/onboarding-v2/bank-details-form'
import VerificationDocumentsForm from '@/components/onboarding-v2/verification-documents-form'
import SignatureForm from '@/components/onboarding/advisor-signature-form'
import CommissionPaymentReferenceForm from '@/components/onboarding/commission-payment-reference-form'
import CompanyDetailsForm from '@/components/onboarding/company-details-form'
import { AgentOnboardingSuccess } from '@/components/onboarding/completed'
import ContactPersonDetailsForm from '@/components/onboarding/contact-person-details-form'
import BusinessInterestForm from '@/components/onboarding/line-of-busines-interest-form'
import ValidIdForm from '@/components/onboarding/upload-valid-id-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  useOnboardingStateStore,
  useOnboardingStepStateStore,
} from '@/store/onboarding-store'
import { useOnboardingV2Store } from '@/store/onboarding-store-v2'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Circle } from 'lucide-react'
import Link from 'next/link'

export default function OnboardingPage() {
  const { step } = useOnboardingV2Store()

  const stepForm = [
    {
      title: '',
      form: <div></div>,
    },
    {
      title: 'Bank Details for Commission',
      form: <BankDetailsForm />,
    },
    {
      title: 'Verification Documents',
      form: <VerificationDocumentsForm />,
    },
  ]

  const queryClient = new QueryClient()

  return (
    <div className="w-full space-y-4">
      <h1 className="from-primary to-lilac w-fit bg-gradient-to-r bg-clip-text py-2 text-3xl leading-tight font-black text-transparent md:text-4xl lg:text-5xl">
        Sign Up
      </h1>
      <div className="flex gap-1">
        {stepForm.map((_, index) => {
          return (
            <div
              key={index}
              className={`${index <= step ? 'bg-primary' : 'bg-gray-300'} h-4 w-4 rounded-full`}
            />
          )
        })}
      </div>
      <div>
        <h1 className="from-primary to-lilac bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
          {stepForm[step].title}
        </h1>
      </div>
      <div>{stepForm[step].form}</div>
      <div className="mt-2">
        <span className="text-muted-foreground text-xs">
          Already have an account?{' '}
        </span>
        <Link href="/login" className="text-xs text-blue-600">
          Log In Here
        </Link>
      </div>
    </div>
  )
}
