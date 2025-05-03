"use client"
import React, { useEffect, useState } from 'react'
import SelectType from '../SelectType/SelectType';
import DatePicker from '../DatePicker/DatePicker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../utils/userSlice';
import { toast } from 'react-toastify';


const genderOption = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
]
const casteOption = [
  { label: "Dhobi", value: "dhobi" },
  { label: "Pandit", value: "pandit" },
]

const SignUp = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      fullName: '',
      emailId: '',
      password: '',
      confirmPassword: '',
      gender: '',
      dob: null,
      caste: '',
      age: ""
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full Name is required'),
      emailId: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ""], 'Passwords must match')
        .required('Confirm Password is required'),
      gender: Yup.string().required('Gender is required'),
      dob: Yup.date().nullable().required('Date of Birth is required'),
      caste: Yup.string().required('Caste is required'),
      age: Yup.number()
        .required('Age is required')
        .min(18, 'Minimum age is 18')
        .max(100, 'Maximum age is 100'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          BASE_URL + "/auth/signup",
          values,
          { withCredentials: true }
        );
        if (res?.data?.status === 200) {
          toast.success(res?.data?.message)
          dispatch(addUser(res.data.data));
          return navigate("/profile");
        }
      } catch (err) {
        console.log("err", err)
      }


    },
  });

  useEffect(() => {
    if (formik.values.dob) {
      const birthDate = new Date(formik.values.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age >= 0) {
        formik.setFieldValue('age', age);
      }
    }
  }, [formik.values.dob]);


  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign Up
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                <input type="text" id="fullName" {...formik.getFieldProps('fullName')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                {formik.touched.fullName && formik.errors.fullName ? <p className="text-red-500 mt-1 text-xs">{formik.errors.fullName}</p> : null}
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" id="email" {...formik.getFieldProps('emailId')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                {formik.touched.emailId && formik.errors.emailId ? <p className="text-red-500 mt-1 text-xs">{formik.errors.emailId}</p> : null}
              </div>

              <div className='flex gap-2 justify-between'>
                <div className='w-75'>
                  <SelectType
                    options={genderOption}
                    labelName='Gender'
                    selectedValue={formik.values.gender}
                    setSelectedValue={(val) => formik.setFieldValue('gender', val)}
                  />
                  {formik.touched.gender && formik.errors.gender && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.gender}</p>
                  )}
                </div>
                <div>
                  <DatePicker
                    labelName='Date Of Birth'
                    selectedDate={formik.values.dob}
                    setSelectedDate={(val) => formik.setFieldValue('dob', val)}
                  />
                  {formik.touched.dob && formik.errors.dob && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.dob}</p>
                  )}
                </div>
              </div>
              <div className='flex gap-2 justify-between'>
                <div className='w-full'>
                  <SelectType
                    options={casteOption}
                    labelName='Caste'
                    selectedValue={formik.values.caste}
                    setSelectedValue={(val) => formik.setFieldValue('caste', val)}
                  />
                  {formik.touched.caste && formik.errors.caste && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.caste}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                  <input type="number" id="age" {...formik.getFieldProps('age')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                  {formik.touched.age && formik.errors.age ? <p className="text-red-500 mt-1 text-xs">{formik.errors.age}</p> : null}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" {...formik.getFieldProps('password')} id="password" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {formik.touched.password && formik.errors.password ? <p className="text-red-500 mt-1 text-xs">{formik.errors.password}</p> : null}
              </div>
              <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                <input type="password" {...formik.getFieldProps('confirmPassword')} id="confirm-password" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p className="text-red-500 mt-1 text-xs">{formik.errors.confirmPassword}</p> : null}

              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                </div>
              </div>
              <button type="submit" className="w-full block py-3 px-6 text-sm font-medium tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                Sign up
              </button>
              <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                Already have an account? <a href="/login" className="font-bold text-blue-500 hover:text-blue-600 hover:underline ">Login here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUp
