import { IErrorResponse, IErrorResponseStatus, TSignUpUser } from "types/types";
import {
  useGetProfileQuery,
  useUpdateProfileImageMutation,
  useUpdateProfileMutation,
} from "../../redux/api/userApi";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../utils/Spinner";
import { Button } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import PasswordChangeModal from "./PasswordChangeModal";
import MetaData from "../../components/MetaData/MetaData";

const UserProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //call update profile mutation
  const [
    updateProfile,
    {
      isLoading: updateLoading,
      error: updateError,
      isError: updateIsError,
      isSuccess,
    },
  ] = useUpdateProfileMutation();

  //called update profile image mutation
  const [
    updateProfileImage,
    {
      isLoading: imageLoading,
      isError: imageIsError,
      error: imageError,
      isSuccess: imageSuccess,
    },
  ] = useUpdateProfileImageMutation();


  // get user  profile data
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useGetProfileQuery(undefined, {
    pollingInterval: 5000,
  });

  console.log(userData?.data)
  // update profile image handler
  const handleUpdatedImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]; 
    const fd = new FormData();
    fd.append("image", file!);

    try {
      await updateProfileImage(fd).unwrap();
      
    } catch (error) {
      console.log(error);
    }
 
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<TSignUpUser>>();

  // update profile information handler
  const onSubmit: SubmitHandler<Partial<TSignUpUser>> = async (data) => {
    try {
       await updateProfile({...data}).unwrap();
  
    } catch (error) {
      console.log(error);
    }
  };

  // show error message
  let message = "";
  if (error || updateError || imageError) {
    message =
      (error as IErrorResponse)?.data?.message ||
      (error as IErrorResponseStatus)?.error;
  }

  useEffect(() => {
    if (isError || updateIsError || imageIsError) {
      toast.error(message, { position: "top-center", toastId: 1 });
    }
    if (isSuccess || imageSuccess) {
      toast.success("You have successfully updated!", {
        position: "top-center",
        toastId: 1,
      });
    }
  }, [isError, isSuccess, imageIsError, updateIsError, imageSuccess, message]);

  return (
    <Fragment>
      <MetaData title="User Profile" />
      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="w-96 h-96 p-16 mx-auto">
            {(userData ) && (
              <div className="w-full h-full rounded-full border border-sky-500 p-2">
                <img
                  src={userData.data.image.url}
                  alt={userData.data.name}
                  className="size-full rounded-full"
                />
              </div>
            )}
            <div className="my-5 md:my-10 text-center">
              <div className="flex flex-col space-y-1 mb-4 mt-5 border border-gray-300 rounded-md">
                <Button className="p-5 w-full" type="primary">
                  <label htmlFor="file" className="size-fit">
                    {imageLoading ? "updating" : "Change Picture"}
                  </label>
                </Button>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  name="image"
                  onChange={handleUpdatedImage}
                  hidden
                ></input>
                {errors.image && (
                  <span className="text-red-500">File is required</span>
                )}
              </div>
              <div>
                {/* Change Password modal dialog         */}
                <PasswordChangeModal
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="py-2 px-20">
              <h1 className="text-center my-5 text-lg font-medium text-sky-600">
                Update profile information
              </h1>
              <div className="bg-[#F9F9F9] w-full max-w-full h-auto ">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-4"
                  encType="multipart/form-data"
                >
                  <div className="flex flex-col space-y-1 mb-4">
                    <label htmlFor="name">username :</label>
                    <input
                      defaultValue={userData && userData.data["name"]}
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("name", { required: true })}
                    ></input>
                    {errors.name && (
                      <span className="text-red-500">Name is required</span>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1 mb-4">
                    <label htmlFor="name">Email :</label>
                    <input
                      defaultValue={userData && userData.data["email"]}
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("email", { required: true })}
                    ></input>
                    {errors.email && (
                      <span className="text-red-500">
                        Email address is required
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1 mb-4">
                    <label htmlFor="name">Phone :</label>
                    <input
                      defaultValue={userData && userData.data["phone"]}
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("phone", { required: true })}
                    ></input>
                    {errors.phone && (
                      <span className="text-red-500">Phone is required</span>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1 mb-4">
                    <label htmlFor="name">Address :</label>
                    <input
                      defaultValue={userData && userData.data["address"]}
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("address", { required: true })}
                    ></input>
                    {errors.address && (
                      <span className="text-red-500">
                        Address link is required
                      </span>
                    )}
                  </div>
                  <div className="w-full flex justify-end mt-6">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="p-5 text-2xl w-full text-md font-medium "
                    >
                      {updateLoading ? "Updating... " : "Update Profile"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UserProfilePage;
