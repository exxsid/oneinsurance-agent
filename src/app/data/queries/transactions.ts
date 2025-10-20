import { useAgentAuthStore } from '@/store/agent-auth-store'
import { Transaction, TransactionsResponse } from '@/types/agent/transactions'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface UseGetTransactionsOptions {
  page?: number
  perPage?: number
}

export function useGetTransactions(options?: UseGetTransactionsOptions) {
  const { accessToken } = useAgentAuthStore()
  const { page = 1, perPage = 20 } = options || {}

  return useQuery({
    queryKey: ['transactions', page, perPage],
    queryFn: async () => {
      const response = await axios.get<TransactionsResponse>(
        '/api/transactions',
        {
          params: {
            page,
            per_page: perPage,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      return response.data
    },
    enabled: !!accessToken,
    retry: false,
    refetchOnWindowFocus: false,
  })
}
