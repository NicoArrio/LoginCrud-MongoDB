
import {useForm} from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

function LoginPage() {

    const {
        register, 
        handleSubmit, 
        formState: {errors} //func q revisa los errores
    } = useForm(); //trae las sig funciones
    const {signin} = useAuth();


    const onSubmit = handleSubmit(data => {
        console.log(data)}) // ejecucion de handleSubmit donde me va a devolver los datos
    return(
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
           <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <h1 className='text-2xl font-bold'>Login</h1>
                <form onSubmit={onSubmit}> 
                        {/* Captura los valores tipeados por el usuario */}
                        <input 
                            type="email" 
                            {...register('email', {required: true})}
                            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                            placeholder='Email'
                        />
                        {errors.email && (<p className="text-red-500"> email is required</p>
                        )} {/* mensaje error de formState */} 

                        <input 
                            type="password" 
                            {...register('password',{required: true})}
                            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                            placeholder='Password'
                        />
                        {errors.password && (<p className="text-red-500"> password is required</p>
                        )} {/* mensaje error de formState */} 

                        {/* Botón de registro */}
                        <button type="submit"> sign in </button>
                </form>
           </div>
        </div>
    )
}

export default LoginPage;