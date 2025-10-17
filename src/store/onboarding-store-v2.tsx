import {
  BankDetails,
  OnboardingV2,
  VerificationDocuments,
} from '@/types/onboarding-v2'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type OnboardingState = {
  step: number
  bankDetails: BankDetails
  verificationDocuments: VerificationDocuments
}

type OnboardingActions = {
  increaseStep: () => void
  decreaseStep: () => void
  setBankDetails: (data: BankDetails) => void
  setVerificationDocuments: (data: VerificationDocuments) => void
}

const initialState: OnboardingState = {
  step: 0,
  bankDetails: {
    bankName: '',
    bankCode: '',
    routingNumber: '',
    accountHolderName: '',
    accountNumber: '',
    accountType: 'savings',
  },
  verificationDocuments: {
    idType: 'PAS',
    idNumber: '',
    licenseNumber: '',
    certificateNumber: '',
    confirmInfo: false,
    authorizeCompany: false,
  },
}

export const useOnboardingV2Store = create<
  OnboardingState & OnboardingActions
>()(
  persist(
    (set) => ({
      ...initialState,
      increaseStep: () =>
        set((state) => ({
          step: state.step + 1,
        })),
      decreaseStep: () =>
        set((state) => ({
          step: state.step - 1,
        })),
      setBankDetails: (data: BankDetails) =>
        set((state) => ({
          ...state,
          bankDetails: { ...state.bankDetails, ...data },
        })),
      setVerificationDocuments: (data: VerificationDocuments) =>
        set((state) => ({
          ...state,
          verificationDocuments: { ...state.verificationDocuments, ...data },
        })),
    }),
    {
      name: 'onboarding-v2-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
