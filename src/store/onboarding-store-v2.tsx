import { OnboardingV2 } from '@/types/onboarding-v2'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type OnboardingState = OnboardingV2 & {
  step: number
}

type OnboardingActions = {
  increaseStep: () => void
  decreaseStep: () => void
  setData: (data: Partial<OnboardingV2>) => void
}

const initialState: OnboardingState = {
  step: 0,
  bankName: '',
  bankCode: '',
  routingNumber: '',
  accountHolderName: '',
  accountNumber: '',
  accountType: 'savings',
  idType: 'PAS',
  idNumber: '',
  licenseNumber: '',
  certificateNumber: '',
  confirmInfo: false,
  authorizeCompany: false,
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
      setData: (data: Partial<OnboardingV2>) =>
        set((state) => ({
          ...state,
          ...data,
        })),
    }),
    {
      name: 'onboarding-v2-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
