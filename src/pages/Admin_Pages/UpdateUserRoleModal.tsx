import { useState } from "react";
import { Button, Card, Modal } from "antd";
import { Fragment, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  IErrorResponse as IErrorResponse,
  IErrorResponseStatus,
} from "../../types/types";

import Spinner from "../../utils/Spinner";
import MetaData from "../../components/MetaData/MetaData";

import { toast } from "react-toastify";
import { useUpdateUserRoleMutation } from "../../redux/api/userApi";
import { userRoles } from "../../helper/userRoles";

const UpdateUserRoleModal = ({ userId }: { userId: string | undefined }) => {
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

  const [updateUserRole, { isLoading, isError, error }] =
    useUpdateUserRoleMutation();

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
  } = useForm<{ role: string }>();

  const onSubmit: SubmitHandler<{ role: string }> = async (data) => {
    try {
      const result = await updateUserRole({ userId, role: data.role });
      console.log(result);
      if (result.data.success) {
        toast.success(result.data.message, {
          position: "top-center",
        });
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
  }, [isError, message]);

  return (
    <>
      <Button type="primary" onClick={showModal} className="p-5 mx-2">
        Promote
      </Button>
      <Modal
        title="Update User Role"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Fragment>
          <MetaData title="Update User Role" />
          {isLoading ? (
            <div className="w-full h-screen flex justify-center justify-items-center">
              <Spinner />
            </div>
          ) : (
            <div className="w-full h-max-screen rounded-md py-4">
              <Card
                title="Update User Role"
                className="max-w-full  md:mx-auto max-h-full  rounded-md px-4"
              >
                <div className="bg-[#F9F9F9] w-full max-w-full h-auto ">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className=""
                    encType="multipart/form-data"
                  >
                    <div className="flex flex-col space-y-2 mb-2">
                      <select
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register("role", { required: true })}
                      >
                        <option value="">Select Role</option>
                        {userRoles.map((role, index) => (
                          <option key={index} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                      {errors.role && (
                        <span className="text-red-500">Role is required</span>
                      )}
                    </div>

                    <div className="w-full flex justify-end mt-6">
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="p-5 text-2xl w-full text-md font-medium "
                      >
                        Update Role
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

export default UpdateUserRoleModal;
