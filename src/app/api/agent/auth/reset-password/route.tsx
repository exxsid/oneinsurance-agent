import { ResetPasswordSchema } from '@/types/agent/auth'
import { handleServerSideAxiosError } from '@/utils/server-side-axios-error-handler'
import axios from 'axios'
import { NextRequest } from 'next/server'

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsedBody = ResetPasswordSchema.safeParse(body)

  if (!parsedBody.success) {
    return new Response(
      JSON.stringify({
        message: 'Invalid request data',
        errors: parsedBody.error.flatten().fieldErrors,
      }),
      { status: 400, headers }
    )
  }

  try {
    const url = `${process.env.BASE_URL}/agent/change-password`
    const response = await axios.post(url, parsedBody.data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.data
  } catch (error: any) {
    console.error('Reset password error:', error)
    if (axios.isAxiosError(error)) {
      return handleServerSideAxiosError(error)
    }

    return new Response(JSON.stringify({ message: error.message }), {
      status: error.response?.status,
      headers,
    })
  }
}
