import { useState } from "react";
import { Button,Card, Modal } from "antd";
import { Fragment, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  IErrorResponse as IErrorResponse,
  IErrorResponseStatus,
  TBikeRequest,
} from "../../types/types";

import { FaCloudUploadAlt } from "react-icons/fa";
import Spinner from "../../utils/Spinner";
import MetaData from "../../components/MetaData/MetaData";

import {
  useUpdatedSingleBikesMutation,
  useGetSingleBikesQuery,
} from "../../redux/api/bikeApi";
import { toast } from "react-toastify";



const UpdateBikeModal  = ({bikeId}:{bikeId:string | undefined}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
    const [updatedSingleBikes, { isLoading, isError, error, isSuccess }] =
      useUpdatedSingleBikesMutation();
    const { data, isLoading: loading } = useGetSingleBikesQuery(bikeId);

   
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
    } = useForm<TBikeRequest>();

    const onSubmit: SubmitHandler<TBikeRequest> = async (data) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("pricePerHour", data.pricePerHour);
      formData.append("cc", data.cc);
      formData.append("brand", data.brand);
      formData.append("model", data.model);
      formData.append("year", data.year);
      formData.append("image", data.image[0]);
      

      try {
        await updatedSingleBikes({
          id: bikeId,
          data: formData as Partial<TBikeRequest>,
        });
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
        toast.success("You have successfully updated Bike", {
          position: "top-center",
        });
        reset();
      }
    }, [isSuccess, isError, message, reset]);

  return (
    <>
      <Button type="primary" onClick={showModal} className="p-5 mx-2">
        Update
      </Button>
      <Modal
        title="Update Bike Information"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Fragment>
          <MetaData title="Update Bike Information" />
          {isLoading || loading ? (
            <div className="w-full h-screen flex justify-center justify-items-center">
              <Spinner />
            </div>
          ) : (
            <div className="w-full h-max-screen rounded-md py-4">
              <Card
                title="Update Bike Information"
                className="max-w-full  md:mx-auto max-h-full  rounded-md px-4"
              >
                <div className="bg-[#F9F9F9] w-full max-w-full h-auto ">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className=""
                    encType="multipart/form-data"
                  >
                    <div className="flex flex-col space-y-2 mb-2">
                      <input
                        defaultValue={data.data.name}
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register("name", { required: true })}
                      ></input>
                      {errors.name && (
                        <span className="text-red-500">
                          {" "}
                          Bike name is required
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2 mb-2">
                      <textarea
                        defaultValue={data.data.description}
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register("description", { required: true })}
                      ></textarea>
                      {errors.description && (
                        <span className="text-red-500">
                          Description is required
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2 mb-2">
                      <input
                        defaultValue={data.data.pricePerHour}
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register("pricePerHour", { required: true })}
                      ></input>
                      {errors.pricePerHour && (
                        <span className="text-red-500">
                          Price per hour is required
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2 mb-2">
                      <input
                        defaultValue={data.data.cc}
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register("cc", { required: true })}
                      ></input>
                      {errors.cc && (
                        <span className="text-red-500">CC is required</span>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2 mb-2">
                      <input
                        defaultValue={data.data.model}
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register("model", { required: true })}
                      ></input>
                      {errors.model && (
                        <span className="text-red-500">Model is required</span>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2 mb-2">
                      <input
                        defaultValue={data.data.year}
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register("year", { required: true })}
                      ></input>
                      {errors.year && (
                        <span className="text-red-500">year is required</span>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2 mb-2">
                      <input
                        defaultValue={data.data.brand}
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register("brand", { required: true })}
                      ></input>
                      {errors.brand && (
                        <span className="text-red-500">Brand is required</span>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2 mb-2 mt-5 border border-gray-300 rounded-md">
                      <label
                        htmlFor="file"
                        className="flex justify-evenly justify-items-center cursor-pointer text-sm font-medium leading-6 text-gray-900"
                      >
                        <span className="text-lg">Upload Image : </span>
                        <span>
                          <FaCloudUploadAlt
                            className="text-gray-500"
                            size={36}
                          />
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
                        Update Bike
                      </Button>
                    </div>
                  </form>
                </div>
              </Card>
            </div>
          )}
        </Fragment>
      </Modal>
    </>
  );
};


export default UpdateBikeModal;
