import { z } from 'zod'
import { formatValidators, PhilippineIdType } from '@/types/id-types'

export const onboardingV2Schema = z
  .object({
    // bank details
    bankName: z.string().min(1, 'Please enter your bank name'),
    bankCode: z.string().min(1, 'Please enter your bank code'),
    routingNumber: z.string().min(1, 'Please enter your bank routing number'),
    accountHolderName: z
      .string()
      .min(1, 'Please enter your account holder name'),
    accountNumber: z
      .string()
      .min(1, 'Please enter your account number')
      .regex(/^\d+$/, 'Account number must be numeric'),
    accountType: z.enum(['savings', 'current']),

    // verification Documents
    idType: PhilippineIdType,
    idNumber: z.string().min(1, 'Please enter your ID number'),
    licenseNumber: z.string().min(1, 'Please enter your license number'),
    certificateNumber: z
      .string()
      .min(1, 'Please enter your certificate number'),

    confirmInfo: z.boolean().refine((val) => val === true, {
      message: 'You must confirm your information',
    }),
    authorizeCompany: z.boolean().refine((val) => val === true, {
      message: 'You must authorize the company',
    }),
  })
  .superRefine((data, ctx) => {
    const validator = formatValidators[data.idType]
    if (validator) {
      const result = validator.safeParse(data.idNumber)
      if (!result.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: result.error.errors[0].message,
          path: ['idNumber'],
        })
      }
    }
  })
export type OnboardingV2 = z.infer<typeof onboardingV2Schema>

export const bankDetailsSchema = onboardingV2Schema._def.schema.pick({
  bankName: true,
  bankCode: true,
  routingNumber: true,
  accountHolderName: true,
  accountNumber: true,
  accountType: true,
})
export type BankDetails = z.infer<typeof bankDetailsSchema>

export const verificationDocumentsSchema = onboardingV2Schema._def.schema.pick({
  idType: true,
  idNumber: true,
  licenseNumber: true,
  certificateNumber: true,
  confirmInfo: true,
  authorizeCompany: true,
})
export type VerificationDocuments = z.infer<typeof verificationDocumentsSchema>
