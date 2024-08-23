
import {useForm} from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import {Link} from 'react-router-dom';

function LoginPage() {

    const {
        register, 
        handleSubmit, 
        formState: {errors} //func q revisa los errores
    } = useForm(); //trae las sig funciones
    const {signin, errors: signinErrors} = useAuth(); //desde el context voy a importar errors-> y lo llamare signinErrors


    const onSubmit = handleSubmit(data => {
        signin(data)}) // ejecucion de handleSubmit donde me va a devolver los datos
    return(
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
           <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                {/* mensaje de error para el front */}
                {
                signinErrors.map((error, i) => (
                    <div className='bg-red-500 p-2 text-white my-2' key={i}> {/* cada div q va a recorrer vamos a colocarle un key q sea con el indice */}
                        {error}
                    </div>
                ))
                }   
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
                <p className="flex gap-x-2 justify-between">
                    Don't have an account? <Link to="/register"
                    className='text-sky-500'>Sign up</Link>
                </p>
           </div>
        </div>
    )
}

export default LoginPage;