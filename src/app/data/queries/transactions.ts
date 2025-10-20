import { useAgentAuthStore } from '@/store/agent-auth-store'
import { Transaction, TransactionsResponse } from '@/types/agent/transactions'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useGetTransactions() {
  const { accessToken } = useAgentAuthStore()

  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await axios.get<TransactionsResponse>(
        '/api/transactions',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      return response.data
    },
    enabled: !!accessToken,
  })
}
