import {z} from "zod";


export const PaginationSchema = z.object({
    page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .refine(n => n>0),

    limit: z
    .string()
    .optional()
    .default('100')
    .transform(Number)
    .refine(n => n>0 && n<=100),

    search: z
    .string()
    .optional(),

    role: z
    .enum(['ADMIN','MEMBER'])
    .optional(),

    sortBy: z
    .enum(['createdAt', 'email'])
    .optional()
    .default('createdAt'),

    order: z
    .enum(['asc','desc'])
    .optional()
    .default('desc')
})