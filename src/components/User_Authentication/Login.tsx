import { Fragment, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Spinner from "../../utils/Spinner";
import { Button, Card } from "antd";
import MetaData from "../MetaData/MetaData";
import { useLoginUserMutation } from "../../redux/api/authApi";
import {
  IErrorResponse,
  IErrorResponseStatus,
  TLoginUser,  
} from "../../types/types";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { setCredentials, setUserRole } from "../../redux/features/authSlice";
import { verifyToken } from "../../utils/verifyToken";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();

 
  // show error message
  let message = "";
  if (error) {
    message =
      (error as IErrorResponse).data?.message ||
      (error as IErrorResponseStatus).error;
  }

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginUser>();

  const onSubmit: SubmitHandler<TLoginUser> = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      const result = await loginUser(formData as Partial<TLoginUser>).unwrap();
      console.log("check login data", result);
      const user = verifyToken(result.token);

      if (result.success) {
        toast.success(result?.message, {
          position: "top-center",
        });
        dispatch(setCredentials({user: result.data, token: result.token}));
        dispatch(setUserRole({role: user.role}));
        navigate(`/${user.role}/dashboard`);
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        position: "top-center",
      });
    }
  }, [isError, message, reset]);

  return (
    <Fragment>
      <div className="w-screen h-screen  bg-gradient-to-r from-blue-500 to-cyan-500 pt-10 sm:pt-16 md:pt20 lg:pt-24">
        <MetaData title="Login" />
        {isLoading ? (
          <div className="w-full h-screen flex justify-center justify-items-center">
            <Spinner />
          </div>
        ) : (
          <div className="rounded-md md:py-5 ">
            <Card
              title="Welcome come back"
              className="bg-[#F9F9F9] w-screen  md:mx-auto sm:w-2/3 sm:mx-auto  md:w-1/3 max-h-full  rounded-md px-4"
            >
              <div className="bg-[#F9F9F9] w-full max-w-full h-auto ">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className=""
                  encType="multipart/form-data"
                >
                  <div className="flex flex-col md:my-4 mb-2">
                    <input
                      type="email"
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("email", { required: true })}
                      placeholder="Enter your email"
                    ></input>
                    {errors.email && (
                      <span className="text-red-500">Email is required</span>
                    )}
                  </div>

                  <div className="flex flex-col md:my-4 mb-2">
                    <input
                      type="password"
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("password", { required: true })}
                      placeholder="Enter your password"
                    ></input>
                    {errors.password && (
                      <span className="text-red-500">Password is required</span>
                    )}
                  </div>
                  <div className="w-full flex justify-end mt-6">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="p-5 w-full text-md font-medium uppercase"
                    >
                      Login
                    </Button>
                  </div>
                  <div className="md:my-6 text-center">
                    <p className="text-md text-gray-500 ">
                      Don't you have an account ?
                      <Link to="/signup">
                        <strong className="mx-1 text-indigo-500">
                          Sign up here
                        </strong>
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Login;
