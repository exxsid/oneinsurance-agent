import { useAgentAuthStore } from '@/store/agent-auth-store'
import { ReferralResponse } from '@/types/agent/referral'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function getReferralCode() {
  const { accessToken, user } = useAgentAuthStore()
  return useQuery({
    queryKey: ['referralCode'],
    queryFn: async () => {
      const url = `/api/agent/referral?id=${user?.id}`
      const response = await axios.get<ReferralResponse>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      })

      return response.data.data
    },
    retry: false,
    enabled: !!accessToken && !!user,
  })
}
