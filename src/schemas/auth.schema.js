import {z} from 'zod';

//nos permite dar tipos de dato
export const registerSchema = z.object({
    username: z.string({
        required_error: "username is required",
    }),
    email: z
        .string({
            required_error: 'email is required'
        })
        .email({
            required_error: 'invalid email'
        }),
    password: z
        .string ({
            required_error:'password is required'
        })
        .min(6,{
            message: 'password must be a least 6 characters'
        }),
});


export const loginSchema = z.object({
    email: z
        .string({
            required_error: 'email is required'
        })
        .email({
            required_error: 'invalid email'
        }),
    password: z
        .string ({
            required_error:'password is required'
        })
        .min(6,{
            message: 'password must be a least 6 characters'
        }),
})


