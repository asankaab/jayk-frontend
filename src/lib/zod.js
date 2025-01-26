import { z } from "zod"

export const loginSchema = z.object({ 
    identifier: z.string({ required_error: "Email/Username is required" }).max(64).min(1, 'email or username is required'),
    password: z.string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be minimum 8 characters")
    .max(32), 
})

export const registerSchema = z.object({
    username: z.string().min(1, {message: "required"}).min(4, {message: "Username must be minimum 4 characters"}).max(32, { message: "username must be less than 32 characters"}),
    email: z.string().min(1, {message: "required"}).email().max(64),
    password: z.string().min(1, {message: "required"}).min(8, {message: "Password must be minimum 8 characters"}).max(32, {message: "Password must be less than 32 characters"}),
})

export const emailSchema = z.object({ 
    email: z.string().min(1, {message: "required"}).email().max(64),
})


export const resetpwSchema = z.object({
    password: z.string().min(8, {message: "Password must be minimum 8 characters"}).max(32, {message: "Password must be less than 32 characters"}),
})

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

export const orderSchema = z.object({
    name: z.string().min(1, {message: "required"}).min(4, {message: "name must be minimum 4 characters"}).max(32, { message: "name must be less than 32 characters"}),
    email: z.string().min(1, {message: "required"}).email().max(64),
    phone: z.string().regex(phoneRegex, 'Invalid Phone Number!').min(1, {message: "required"}).min(6, {message: "Phone number must be minimum 8 characters"}).max(32, {message: "Phone number must be less than 32 characters"}),
})