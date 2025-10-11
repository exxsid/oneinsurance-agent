import { useMutation } from '@tanstack/react-query'
import {
  RegisterAgent,
  SuccesRegisterAgent,
  SendEmailVerificationRequest,
  LoginAgent,
  LoginAgentResponse,
  ResetPassword,
  ResetPasswordResponse,
} from '@/types/agent/auth'
import axios from 'axios'
import { useAgentAuthStore } from '@/store/agent-auth-store'

export function useRegisterAgent() {
  return useMutation({
    mutationKey: ['register-agent'],
    mutationFn: async ({ data }: { data: RegisterAgent }) => {
      const requestBody = {
        ...data,
        designation: 'Agent',
      }
      const response = await axios.post<SuccesRegisterAgent>(
        '/api/agent/auth/signup',
        requestBody
      )

      return response.data
    },
  })
}

export function useSendEmailVerification() {
  return useMutation({
    mutationKey: ['send-email-verification'],
    mutationFn: async ({ data }: { data: SendEmailVerificationRequest }) => {
      const token = `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
      const response = await axios.post(
        '/api/agent/auth/send-email-verification',
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      )

      return response.data
    },
  })
}

export function useLoginAgent() {
  return useMutation({
    mutationKey: ['login-agent'],
    mutationFn: async ({ data }: { data: LoginAgent }) => {
      const response = await axios.post<LoginAgentResponse>(
        '/api/agent/auth/login',
        data
      )

      return response.data
    },
  })
}

export function useResetPassword() {
  return useMutation({
    mutationKey: ['reset-password-agent'],
    mutationFn: async ({ data }: { data: ResetPassword }) => {
      const response = await axios.post<ResetPasswordResponse>(
        '/api/agent/auth/reset-password',
        data
      )

      return response.data
    },
  })
}

export function useLogoutAgent() {
  const token = useAgentAuthStore((state) => state.getAuthToken())
  return useMutation({
    mutationKey: ['logout-agent'],
    mutationFn: async () => {
      const response = await axios.post(
        '/api/agent/auth/logout',
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )

      return response.data
    },
  })
}
