import {z} from 'zod';

//nos permite dar tipos de dato
export const registerSchema = z.object({
    username: z.string({
        required_error: "Username is required",
    }),
    email: z
        .string({
            required_error: 'Email is required',
        })
        .email({
            required_error: 'Email is not valid',
        }),
    password: z
        .string ({
            required_error:'Password is required',
        })
        .min(6,{
            message: 'Password must be a least 6 characters',
        }),
});


export const loginSchema = z.object({
    email: z
        .string({
            required_error: 'Email is required',
        })
        .email({
            required_error: 'Email is not valid',
        }),
    password: z
        .string ({
            required_error:'Password is required',
        })
        .min(6,{
            message: 'Password must be a least 6 characters',
        }),
})


