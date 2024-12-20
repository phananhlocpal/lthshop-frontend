'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'; // Sử dụng useRouter để điều hướng
import { useDispatch } from 'react-redux';
import { createUser } from '../../store/actions/userActions'; // Import action createUser

function Register() {
  const router = useRouter(); // Khởi tạo useRouter
  const dispatch = useDispatch(); // Dùng dispatch để gọi action Redux
  const { register, handleSubmit, formState: { errors } } = useForm();

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

  return (
    <div className='register'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="divider">
          <label className='input-label'>
            First Name <span>*</span>
            <div className='input-wrapper'>
              <input type="text" {...register("firstName", { required: true })} />
            </div>
          </label>
          {errors.firstName && <span>This field is required</span>}
          <label className='input-label'>
            Last Name <span>*</span>
            <div className='input-wrapper'>
              <input type="text" {...register("lastName", { required: true })} />
            </div>
          </label>
          {errors.lastName && <span>This field is required</span>}
        </div>
        <label className='input-label'>
          Email <span>*</span>
          <div className='input-wrapper'>
            <input type="email" {...register("email", { required: true })} />
          </div>
        </label>
        {errors.email && <span>This field is required</span>}
        <label className='input-label'>
          Phone <span>*</span>
          <div className='input-wrapper'>
            <input type="phone" {...register("phone", { required: true })} />
          </div>
        </label>
        {errors.phone && <span>This field is required</span>}
        <label className='input-label'>
          Password <span>*</span>
          <div className='input-wrapper'>
            <input type="password" {...register("password", { required: true, minLength: 8, maxLength: 20 })} />
          </div>
        </label>
        {errors.password?.type === 'required' && <span>This field is required</span>}
        {errors.password?.type === 'minLength' && <span>Password must be at least 8 characters long</span>}
        {errors.password?.type === 'maxLength' && <span>Password must be at most 20 characters long</span>}
        <button type="submit">REGISTER</button>
      </form>
    </div>
  );
}

export default Register;
