import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage (){
    const { register, handleSubmit } = useForm(); // registrar inputs
    const {signup, isAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated) navigate('/tasks')
    },[isAuthenticated])

    const ConstOnSubmit= handleSubmit( async (values) => { 
        signup(values);
    });

    return(
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
            {/* handleSubmit te va a dar los valores, y muestra por consola */}
            {/* evento nativo de HTML/JSX que se dispara cuando el formulario es enviado. */}
            <form onSubmit={ConstOnSubmit}> 
                {/* Captura los valores tipeados por el usuario */}
                <input 
                    type="text" 
                    {...register('username', {required: true})} 
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Username'
                />
                <input 
                    type="email" 
                    {...register('email', {required: true})}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Email'
                />
                <input 
                    type="password" 
                    {...register('password',{required: true})}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Password'
                />
                {/* Botón de registro */}
                <button type="submit"> Register </button>
            </form>
        </div>
    );
}

export default RegisterPage;
