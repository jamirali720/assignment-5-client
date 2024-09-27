import { Button, Modal } from "antd";
import { useChangePasswordMutation } from "../../redux/api/userApi";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  IChangePassword,
  IErrorResponse,
  IErrorResponseStatus,
} from "types/types";
import { toast } from "react-toastify";
import { useEffect } from "react";

type TModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PasswordChangeModal = ({ isModalOpen, setIsModalOpen }: TModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePassword>();


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [changePassword, { isLoading, isSuccess, isError, error }] =
    useChangePasswordMutation();

  const onSubmit: SubmitHandler<Partial<IChangePassword>> = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      return toast.warn("Password do not match");
    }

    try {
      const result = await changePassword({ ...data });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
   
  };

  

  // show error message
  let message = "";
  if (error) {
    message =
      (error as IErrorResponse)?.data?.message ||
      (error as IErrorResponseStatus)?.error;
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully", {
        position: "top-center",
      });
      setIsModalOpen(false);
    }
    if (isError) {
      toast.error(message, {
        position: "top-center",
      });
    }
  }, [isSuccess, isError, message, setIsModalOpen]);

  return (
    <>
      <Button className="p-5 w-full" type="primary" onClick={showModal}>
        Change Password
      </Button>
      <Modal
        title="Change Password"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-1 mb-4">
              <label htmlFor="currentPassword">Current Password :</label>
              <input
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("currentPassword", { required: true })}
                placeholder="Enter Current Password"
              ></input>
              {errors.currentPassword && (
                <span className="text-red-500">
                  Current Password is required
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1 mb-4">
              <label htmlFor="newPassword">New Password :</label>
              <input
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("newPassword", { required: true })}
                placeholder="Enter New Password"
              ></input>
              {errors.newPassword && (
                <span className="text-red-500">New Password is required</span>
              )}
            </div>
            <div className="flex flex-col space-y-1 mb-4">
              <label htmlFor="confirmPassword">Confirm Password :</label>
              <input
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("confirmPassword", { required: true })}
                placeholder="Enter Confirm Password"
              ></input>
              {errors.confirmPassword && (
                <span className="text-red-500">
                  Confirm Password is required
                </span>
              )}
            </div>
            <div>
              <Button type="primary" htmlType="submit" disabled={isLoading}>
                {isLoading ? "Changing..." : "Change Password"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default PasswordChangeModal;
