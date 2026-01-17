import z from "zod";
import { PaginationSchema } from './pagination.schema';

export type PaginationDto = z.infer<typeof PaginationSchema>