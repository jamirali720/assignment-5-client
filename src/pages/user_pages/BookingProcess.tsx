import React, { useState } from "react";
import { Button, Modal } from "antd";

import type { TimePickerProps } from "antd";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "antd";

import { setBookingInfo } from "../../redux/features/cartSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { toast } from "react-toastify";

dayjs.extend(customParseFormat);

const BookingProcess: React.FC = () => {
  const dispatch = useAppDispatch();
  const { bikeId } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startTime, setStartTime] = useState<string>("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [advanced, setAdvanced] = useState<number>(0);

  const onChange: TimePickerProps["onChange"] = (time) => {
    const startTime = time?.toISOString();
    setStartTime(startTime);
    setIsEmpty(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (isNaN(advanced))
      return toast.warn("You have to enter number digits", {
        position: "top-center",
        toastId: 1,
      });    
    dispatch(setBookingInfo({ bikeId, startTime, advanced }));
    navigate("/user/payment");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full h-full flex justify-center justify-items-center">
        <div className="content-center">
          <Button type="primary" onClick={showModal} className="p-5">
            BOOKING NOW
          </Button>
        </div>
      </div>
      <Modal
        title="BOOK NOW"
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
            Pay Now
          </Button>,
        ]}
      >
        <div>
          <h1 className="text-xl my-3">
            Please choose start time and advanced amount.
          </h1>

          <div className="my-3">
            <p className="my-2">Advanced Amount (in dollars)</p>
            <Input
              type="text"
              className="placeholder:text-slate-500 py-2"
              placeholder="Enter advanced amount"
              onChange={(e) => setAdvanced(Number(e.target.value))}
            />
          </div>
          <div className="my-3">
            <p className="my-2">Start Time </p>
            <TimePicker
              className="w-full py-2"
              onChange={onChange}
              defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BookingProcess;
