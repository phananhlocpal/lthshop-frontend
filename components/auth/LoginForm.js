'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'; 
import { icons } from '../../assets/icons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from '../../utils/hooks/useUser';

function Login() {
  const router = useRouter(); 
  const { login } = useUser();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (loginData) => {
    const user = await login(loginData);
    if (user) {
      router.push('/account'); 
    }
  };
  const forgotPassword = () => {
    router.push("/forgot-password")
  }
  return (
    <div className='login'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className='input-label'>
          Email
          <div className='input-wrapper'>
            <FontAwesomeIcon icon={icons.email}></FontAwesomeIcon>
            <input className='w-[100%] ml-4' type="text" {...register("email", { required: true })} />
          </div>
        </label>
        {errors.email && <span>This field is required</span>}
        <label className='input-label'>
          Password
          <div className='input-wrapper'>
            <FontAwesomeIcon icon={icons.lock}></FontAwesomeIcon>
            <input className='w-[100%] ml-4' type="password" {...register("password", { required: true })} />
          </div>
        </label>
        <div className="float-right mt-2">
          <div></div> {/* Spacer for alignment */}
          <a href="#" className='text-sm hover:underline' onClick={() => {
            forgotPassword()
          }}>Forgot password?</a>
        </div>
        {errors.password && <span>This field is required</span>}
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
}

export default Login;
