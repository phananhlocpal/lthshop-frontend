'use client';
import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'; 
import { useDispatch } from 'react-redux';
import { createUser } from '../../store/actions/userActions';

function Register() {
  const router = useRouter(); 
  const dispatch = useDispatch(); 
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isVerifyOTP, setIsVerifyOTP] = useState(false);
  
  const sendOTP = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/send-otp', {
        email: data.email
      });
      if (response.data.success) {
        setIsVerifyOTP(true);
      }
    } catch (error) {
      alert("Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (registerData) => {
    try {
      // Gửi dữ liệu đăng ký lên server
      const user = await dispatch(createUser(registerData)).unwrap(); // unwrap() để lấy kết quả từ Thunk
      if (user) {
        router.push('/account'); // Điều hướng đến trang '/account'
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const onHandleOTP = async (e) => {
    e.preventDefault();
    try {
      const otpInput = watch("otp");
      const verifyResponse = await axios.post('/api/verify-otp', {
        otp: otpInput,
        email: watch("email")
      });

      if (verifyResponse.data.success) {
        handleSubmit(onSubmit)();
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      alert("OTP verification failed");
    }
  };

  return (
    <div className='register'>
      <h1>Register</h1>
      {isVerifyOTP ? (
        <>
          <label className='input-label'>
            Please enter your OTP <span>*</span>
            <div className='input-wrapper'>
              <input className='w-[100%]' type="text" {...register("firstName", { required: true })} />
            </div>
          </label>
          <button type="button" onClick={() => sendOTP(watch())}>Resend OTP</button>
          <button type="button" onClick={onHandleOTP}>REGISTER</button>
        </>
      ) : (
        <form onSubmit={handleSubmit(sendOTP)}>
          <div className="divider">
            <label className='input-label'>
              First Name <span>*</span>
              <div className='input-wrapper'>
                <input className='w-[100%]' type="text" {...register("firstName", { required: true })} />
              </div>
            </label>
            {errors.firstName && <span>This field is required</span>}
            <label className='input-label'>
              Last Name <span>*</span>
              <div className='input-wrapper'>
                <input className='w-[100%]' type="text" {...register("lastName", { required: true })} />
              </div>
            </label>
            {errors.lastName && <span>This field is required</span>}
          </div>
          <label className='input-label'>
            Email <span>*</span>
            <div className='input-wrapper'>
              <input className='w-[100%]' type="email" {...register("email", { required: true })} />
            </div>
          </label>
          {errors.email && <span>This field is required</span>}
          <label className='input-label'>
            Phone <span>*</span>
            <div className='input-wrapper'>
              <input className='w-[100%]' type="phone" {...register("phone", { required: true })} />
            </div>
          </label>
          {errors.phone && <span>This field is required</span>}
          <label className='input-label'>
            Password <span>*</span>
            <div className='input-wrapper'>
              <input className='w-[100%]' type="password" {...register("password", { required: true, minLength: 8, maxLength: 20 })} />
            </div>
          </label>
          {errors.password?.type === 'required' && <span>This field is required</span>}
          {errors.password?.type === 'minLength' && <span>Password must be at least 8 characters long</span>}
          {errors.password?.type === 'maxLength' && <span>Password must be at most 20 characters long</span>}
          <button type="submit">REGISTER</button>
        </form>
      )}

    </div>
  );
}

export default Register;
