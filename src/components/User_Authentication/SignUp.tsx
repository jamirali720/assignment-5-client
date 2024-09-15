import { Fragment, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaCloudUploadAlt } from "react-icons/fa";
import Spinner from "../../utils/Spinner";
import { Button, Card } from "antd";
import MetaData from "../MetaData/MetaData";
import { useSignUpUserMutation } from "../../redux/api/authApi";
import {
  IErrorResponse,
  IErrorResponseStatus,
  TSignUpUser,
} from "../../types/types";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpUser, { isLoading, isError, error }] = useSignUpUserMutation();

  console.log("fetching error", error);
  // capture error message
  let message = "";
  if (error) {
    message =
      (error as IErrorResponse).data.message ||
      (error as IErrorResponseStatus).error;
  }

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpUser>();

  const onSubmit: SubmitHandler<TSignUpUser> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("image", data.image[0]);

    try {
      const result = await signUpUser(
        formData as Partial<TSignUpUser>
      ).unwrap();
      if (result.success) {
        toast.success(result.message, {
          position: "top-center",
        });
        navigate("/login");
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
      <div className="w-screen h-auto  bg-gradient-to-r from-cyan-500 to-blue-500">
        <MetaData title="Add your" />
        {isLoading ? (
          <div className="w-full h-screen flex justify-center justify-items-center">
            <Spinner />
          </div>
        ) : (
          <div className="rounded-md md:py-5 shadow-lg ">
            <Card
              title="Create a new Account"
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
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("name", { required: true })}
                      placeholder="Enter your name"
                    ></input>
                    {errors.name && (
                      <span className="text-red-500">Name is required</span>
                    )}
                  </div>
                  <div className="flex flex-col md:my-4 mb-2">
                    <input
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
                  <div className="flex flex-col md:my-4 mb-2">
                    <input
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("phone", { required: true })}
                      placeholder="Enter your phone"
                    ></input>
                    {errors.phone && (
                      <span className="text-red-500">Phone is required</span>
                    )}
                  </div>
                  <div className="flex flex-col md:my-4 mb-2">
                    <input
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("address", { required: true })}
                      placeholder="Enter your address"
                    ></input>
                    {errors.address && (
                      <span className="text-red-500">Address is required</span>
                    )}
                  </div>

                  <div className="flex flex-col md:my-4 mb-2 mt-5 border border-gray-300 rounded-md">
                    <label
                      htmlFor="file"
                      className="flex justify-evenly justify-items-center text-sm font-medium leading-6 text-gray-900"
                    >
                      <span className="text-lg">Upload Image : </span>
                      <span>
                        <FaCloudUploadAlt className="text-gray-500" size={36} />
                      </span>
                    </label>
                    <input
                      type="file"
                      id="file"
                      {...register("image", { required: true })}
                      hidden
                    ></input>
                    {errors.image && (
                      <span className="text-red-500">File is required</span>
                    )}
                  </div>
                  <div className="w-full flex justify-end mt-6">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="p-5 w-full text-md font-medium uppercase"
                    >
                      Sign Up
                    </Button>
                  </div>
                  <div className="md:my-6 text-center">
                    <p className="text-md text-gray-500 ">
                      Already have an account ?{" "}
                      <Link to="/login">
                        <strong className="mx-1 text-indigo-500">
                          Login here
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

export default SignUp;
