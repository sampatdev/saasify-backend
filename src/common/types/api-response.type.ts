// src/common/types/api-response.type.ts
export type ApiResponse<T> = {
    success: boolean
    data?: T
    error?: {
      message: string
      details?: unknown
    }
  }
  