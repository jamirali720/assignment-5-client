import { Button, Card } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaCloudUploadAlt } from "react-icons/fa";

import {
  IErrorResponse,
  IErrorResponseStatus,
  TImageUpload,
} from "types/types";
import { Fragment, useEffect } from "react";
import { toast } from "react-toastify";
import { useUploadHeroImageMutation } from "../../redux/api/imageApi";
import MetaData from "../../components/MetaData/MetaData";
import Spinner from "../../utils/Spinner";

const UploadImageToCloudinary = () => {
  const [uploadHeroImage, { isSuccess, isLoading, isError, error }] =
    useUploadHeroImageMutation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TImageUpload>();

  let message: string = "";
  if (error) {
    const { data } =
      (error as IErrorResponse) || (error as IErrorResponseStatus).error;
    message = data?.message as string;
  }

  const onSubmit: SubmitHandler<TImageUpload> = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    console.log(data);

    try {
      await uploadHeroImage(formData);
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
      toast.success("You have successfully uploaded hero image", {
        position: "top-center",
        toastId: 1,
      });
      reset();
    }
  }, [isSuccess, isError, message, reset]);

  return (
    <Fragment>
      <div className="min-h-full p-2 pt-10 sm:pt-16 md:pt-20 lg:pt-24">
        <MetaData title="Upload Hero Image" />
        {isLoading ? (
          <div className="w-full  flex justify-center justify-items-center">
            <Spinner />
          </div>
        ) : (
          <div className=" w-full rounded-md md:p-4 ">
            <Card
              title="Upload Hero Image"
              className=" bg-[#F9F9F9]  md:mx-auto  md:w-4/12 max-h-full  rounded-md px-4"
            >
              <div className="bg-[#F9F9F9] w-full max-w-full h-auto ">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className=""
                  encType="multipart/form-data"
                >
                  <div className="flex flex-col space-y-2 mb-2 mt-5 border border-gray-300 rounded-md">
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
                      className="p-5 w-full text-md font-medium uppercase"
                    >
                      Submit
                    </Button>
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

export default UploadImageToCloudinary;
