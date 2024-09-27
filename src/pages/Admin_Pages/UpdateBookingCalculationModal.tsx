import { useState } from "react";
import { Button, Modal } from "antd";
import { Fragment, useEffect } from "react";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

import type { TimePickerProps } from "antd";
import { TimePicker } from "antd";
import {
  IErrorResponse as IErrorResponse,
  IErrorResponseStatus,
} from "../../types/types";

import { useCalculateBookingMutation } from "../../redux/api/bookingApi";
import { toast } from "react-toastify";
import Spinner from "../../utils/Spinner";

const UpdateBookingCalculationModal = ({
  bookingId,
  isReturned,
}: {
  bookingId: string | undefined;
  isReturned: boolean;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [returnTime, setReturnTime] = useState<string>("");
  const [isEmpty, setIsEmpty] = useState(true);

  const [calculateBooking, { isLoading, isError, error, isSuccess }] =
    useCalculateBookingMutation();
  const onChange: TimePickerProps["onChange"] = (time) => {
    const rTime = time.toISOString();
    setReturnTime(rTime);  
    setIsEmpty(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      await calculateBooking({ id: bookingId, returnTime });
    } catch (error) {
      console.log(error);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // show error message
  let message: string = "";
  if (error) {
    const { data } =
      (error as IErrorResponse) || (error as IErrorResponseStatus).error;
    message = data?.message as string;
  }

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        position: "top-center",
      });
    }
    if (isSuccess) {
      toast.success("Bike returned successfully", {
        position: "top-center",
      });
    }
  }, [isSuccess, isError, message]);

  return (
    <Fragment>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center justify-items-center">
          <Spinner />
        </div>
      ) : (
        <div>
          <Button
            disabled={isReturned}
            type="primary"
            onClick={showModal}
            className="p-5 mx-2"
          >
            Calculate Fair
          </Button>
          <Modal
            title="Update Fair"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={handleOk}
                disabled={isEmpty}
              >
                Update Calculation
              </Button>,
            ]}
          >
            <h1 className="text-xl my-3">
              Please choose return time for calculation.
            </h1>
            <TimePicker
              className="w-full"
              onChange={onChange}
              defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
            />
          </Modal>
        </div>
      )}
    </Fragment>
  );
};

export default UpdateBookingCalculationModal;
