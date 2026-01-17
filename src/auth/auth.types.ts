import z from "zod";
import { LoginSchema, SignupSchema } from "./auth.schema";


export type SignupDto = z.infer<typeof SignupSchema>
export type LoginDto = z.infer<typeof LoginSchema>