import { Fragment, useEffect } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import {
  IErrorResponse as IErrorResponse,
  IErrorResponseStatus,
  ITeam, 
} from "../../types/types";

import { FaCloudUploadAlt } from "react-icons/fa";

import Spinner from "../../utils/Spinner";
import { Button, Card } from "antd";
import MetaData from "../../components/MetaData/MetaData";

import { toast } from "react-toastify";
import { roles } from "../../helper/roles";
import { useAddTeamMemberMutation } from "../../redux/api/teamApi";

const CreateNewTeam = () => {
  const [createNewBike, { isLoading, isError, error, isSuccess }] =
    useAddTeamMemberMutation();


  // show error message
  let message: string = "";
  if (error) {
    const { data } =
      (error as IErrorResponse) || (error as IErrorResponseStatus).error;
    message = data?.message as string;
  }

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ITeam>();

  const onSubmit: SubmitHandler<ITeam> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name); 
    formData.append("role", data.role);   
    formData.append("facebookLink", data.facebookLink!);   
    formData.append("linkedinLink", data.linkedinLink!);   
    formData.append("githubLink", data.githubLink!);   
    formData.append("instagramLink", data.instagramLink!);   
    formData.append("twitterLink", data.twitterLink!);   
    formData.append("youtubeLink", data.youtubeLink!);   
    formData.append("image", data.image[0]);


    try {
      await createNewBike(formData as Partial<ITeam>);
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
    if (isSuccess) {
      toast.success("You have successfully created team member", {
        position: "top-center",
      });
      reset();
    }
  }, [isSuccess, isError, message, reset]);

  return (
    <Fragment>
      <MetaData title="Create New Team" />
      {isLoading ? (
        <div className="w-full h-screen flex justify-center justify-items-center">
          <Spinner />
        </div>
      ) : (
        <div className=" min-h-full  w-full h-max-screen rounded-md py-4">
          <Card
            title="Create New Team"
            className="max-w-full  md:mx-auto  md:w-1/2 max-h-full  rounded-md px-4"
          >
            <div className="bg-[#F9F9F9] w-full max-w-full h-auto ">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className=""
                encType="multipart/form-data"
              >
                <div className="flex flex-col space-y-4 mb-4">
                  <input
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("name", { required: true })}
                    placeholder="Enter team member name"
                  ></input>
                  {errors.name && (
                    <span className="text-red-500">
                      {" "}
                      Team member name is required
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-4 mb-4">
                  <input
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("facebookLink", )}
                    placeholder="Enter facebook link"
                  ></input>
                  {errors.facebookLink && (
                    <span className="text-red-500">
                      {" "}
                      Facebook link is required
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-4 mb-4">
                  <input
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("twitterLink", )}
                    placeholder="Enter twitter link"
                  ></input>
                  {errors.twitterLink && (
                    <span className="text-red-500">
                      {" "}
                      Twitter link is required
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-4 mb-4">
                  <input
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("githubLink", )}
                    placeholder="Enter github link"
                  ></input>
                  {errors.githubLink && (
                    <span className="text-red-500">
                      {" "}
                      Github link is required
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-4 mb-4">
                  <input
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("instagramLink", )}
                    placeholder="Enter instagram link"
                  ></input>
                  {errors.instagramLink && (
                    <span className="text-red-500">
                      Instagram link is required
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-4 mb-4">
                  <input
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("linkedinLink")}
                    placeholder="Enter linkedin Link"
                  ></input>
                  {errors.linkedinLink && (
                    <span className="text-red-500">
                      Linkedin link is required
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-4 mb-4">
                  <input
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("youtubeLink")}
                    placeholder="Enter youtube Link"
                  ></input>
                  {errors.youtubeLink && (
                    <span className="text-red-500">
                      Youtube link is required
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-4 mb-4">
                  <select
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("role", { required: true })}
                  >
                    <option value="">Select Role</option>
                    {roles.map((role, index) => {
                      return (
                        <option key={index} value={role}>
                          {role}
                        </option>
                      );
                    })}
                  </select>
                  {errors.role && (
                    <span className="text-red-500">Role is required</span>
                  )}
                </div>

                <div className="flex flex-col space-y-4 mb-4 mt-5 border border-gray-300 rounded-md">
                  <label
                    htmlFor="file"
                    className="flex justify-evenly justify-items-center cursor-pointer text-sm font-medium leading-6 text-gray-900"
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
                    className="p-5 text-2xl w-full text-md font-medium "
                  >
                    Create Team
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
    </Fragment>
  );
};

export default CreateNewTeam;
