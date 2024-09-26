import { useState } from "react";
import { Button, Modal } from "antd";
import { Fragment, useEffect } from "react";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
import {
  IErrorResponse as IErrorResponse,
  IErrorResponseStatus,
} from "../../types/types";

import {
  useRefundMoneyMutation,  
  useUpdatedBookingAfterRefundMoneyMutation,
} from "../../redux/api/bookingApi";
import { toast } from "react-toastify";
import Spinner from "../../utils/Spinner";

const ReturnMoneyModal = ({
  paymentId,
  amount,
  bookingId,
}: {
  paymentId: string;
  bookingId: string;
  amount: number;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [refundMoney, { isLoading, error, isError }] = useRefundMoneyMutation();
  const [updatedBookingAfterRefundMoney] = useUpdatedBookingAfterRefundMoneyMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const result = await refundMoney({
        id: paymentId,
        amount: Math.abs(amount),
      }).unwrap();     
     
      if (result?.data.status === "succeeded") {        
        const res = await updatedBookingAfterRefundMoney(bookingId).unwrap();
          if(res?.data.success) {
            toast.success(res?.data.message, {
              position: "top-center",
            });
            setIsModalOpen(false);
          }

         setIsModalOpen(false);

         toast.success("Refund money returned successfully", {
           position: "top-center",
         });
      }
    } catch (error) {
      console.log(error);
    }
    
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
  }, [isError, message]);

  return (
    <Fragment>
      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div>
          <Button type="primary" onClick={showModal} className="p-5 mx-2">
            Return Money
          </Button>
          <Modal
            title="Refund Money"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={handleOk}>
                Refund Money
              </Button>,
            ]}
          >
            <h1 className="text-xl my-3">Refund money - {Math.abs(amount)}</h1>
          </Modal>
        </div>
      )}
    </Fragment>
  );
};



export default ReturnMoneyModal;
