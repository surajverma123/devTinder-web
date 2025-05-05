import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";


const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Formik Configuration
  const formik = useFormik({
    initialValues: {
      emailId: ""
    },
    validationSchema: Yup.object({
      emailId: Yup.string().email("Invalid email address").required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          BASE_URL + "/auth/forgot-password",
          values,
          { withCredentials: true }
        );

        if (res?.data?.status === 200) {
          toast.success(res?.data?.message)

          dispatch(addUser(res.data));
          // const socket = createSocketConnection()();
          // // As soon as the page loaded, the socket connection is made and joinChat event is emitted
          navigate("/");
        }

      } catch (err) {
        console.log("error", err)
        // setError(err?.response?.data?.message || "Something went wrong");
      }
    },
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot Password
            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="emailId"
                  name="emailId"
                  placeholder="name@company.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.emailId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.emailId && formik.errors.emailId && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.emailId}</p>
                )}
              </div>

          

              {/* Forgot Password Link */}
              <div className="flex items-center justify-end">
                <NavLink
                  to="/login" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-primary-500 hover:underline">
                  Login?
                </NavLink>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Submit
              </button>

              {/* Sign Up Link */}
              <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <NavLink
                  to="/signup" className="text-blue-600 hover:text-blue-500 font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign up
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;

