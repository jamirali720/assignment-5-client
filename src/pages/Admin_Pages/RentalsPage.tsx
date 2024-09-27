import { Button, Card } from "antd";
import React, { Fragment, useState } from "react";

import Spinner from "../../utils/Spinner";
import {  
  useDeleteBookingByIdMutation,
  useGetAllBookingsQuery,
} from "../../redux/api/bookingApi";
import MetaData from "../../components/MetaData/MetaData";
import { toast } from "react-toastify";


import { TBookingResponse } from "types/types";
import UpdateBookingCalculationModal from "./UpdateBookingCalculationModal";
import ReturnMoneyModal from "./ReturnMoneyModal";

const RentalsPage: React.FC = () => { 
  const [deleteBookingById, {isLoading:loading}] = useDeleteBookingByIdMutation();
  const { data, isLoading } = useGetAllBookingsQuery(
    undefined,
    {
      pollingInterval: 5000,
      skip: false,
      refetchOnMountOrArgChange: true,
    }
  );


  const [itemPerPage, setItemPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState(1);


  const totalPages =
    data?.data.length && Math.ceil(data?.data.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const lastIndex = startIndex + itemPerPage;
  const renderData = data?.data.slice(startIndex, lastIndex);

  const handleDeleteBooking = async (id: string) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this booking ?"
      );
      if (confirm) {
        const res = await deleteBookingById(id);
        console.log(res);
        if (res.data?.success) {
          toast.success(res.data.message, { position: "top-center" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <MetaData title="Manage-all-Bikes" />
      {isLoading || loading ? (
        <div className="w-full h-screen flex justify-center justify-items-center">
          <Spinner />
        </div>
      ) : (
        <div>
          <Card>
            <div className="w-full h-10 text-center text-2xl font-semibold mb-3">
              {data?.data.length ? (
                <span> {data?.data.length} bookings Available </span>
              ) : (
                <span> No bookings available</span>
              )}
            </div>
            <div className="overflow-x-scroll w-full max-w-full">
              <table className="w-full max-w-full ">
                <thead className="w-full">
                  <tr className="border border-slate-200 w-full ">
                    <th className="border border-slate-200 py-2">Start Time</th>
                    <th className="border border-slate-200">Return Time</th>
                    <th className="border border-slate-200">Advanced</th>
                    <th className="border border-slate-200">Total Cost</th>
                    <th className="border border-slate-200">Remaining Cost</th>
                    <th className="border border-slate-200">IsReturned</th>
                    <th className="border border-slate-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {renderData &&
                    (renderData as TBookingResponse[]).map((booking, index) => {
                      return (
                        <tr
                          key={index}
                          className="border border-slate-200 text-center  h-16"
                        >
                          <td className="border border-slate-200">
                            <p>{booking.startTime}</p>
                          </td>
                          <td className="border border-slate-200 w-2/12">
                            <p>{booking.returnTime}</p>
                          </td>
                          <td className="border border-slate-200">
                            <p>{booking.advanced}</p>
                          </td>
                          <td className="border border-slate-200">
                            {booking.totalCost}
                          </td>
                          <td className="border border-slate-200 ">
                            <p>
                              {booking.remainingCost >= 0 ? (
                                <span> {booking.remainingCost} </span>
                              ) : (
                                <span>
                                  {" "}
                                  {Math.abs(booking.remainingCost)} Over money
                                </span>
                              )}
                            </p>
                          </td>
                          <td className="border border-slate-200">
                            {booking.isReturned.toString()}
                          </td>
                          <td className="flex justify-center justify-items-center mt-2">
                            <UpdateBookingCalculationModal
                              bookingId={booking._id}
                              isReturned={booking.isReturned}
                            />
                            {booking.isReturnedMoney && (
                              <ReturnMoneyModal
                                paymentId={booking.paymentId}
                                bookingId={booking._id}
                                amount={booking.remainingCost}
                              />
                            )}
                            <Button
                              type="default"
                              className="p-5 mx-1 bg-red-600 text-white"
                              onClick={() => handleDeleteBooking(booking._id!)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className=" w-full h-14 flex justify-end justify-items-center my-5">
              <div className="text-end px-4 w-18 h-10 ">
                <span> Show : </span>
                <select
                  value={itemPerPage}
                  onChange={(event) =>
                    setItemPerPage(Number(event.target.value))
                  }
                  className="border border-slate-200  px-4 py-2 rounded-sm"
                >
                  {[5, 10, 20, 50, 75, 100, 200].map((value, i) => (
                    <option className="" key={i} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-end px-4 mb-2 w-18 h-10">
                <Button
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage((current) => current - 1);
                    }
                  }}
                  disabled={currentPage === 1}
                  className="p-5 mx-2"
                >
                  Prev
                </Button>
                <Button
                  onClick={() => {
                    if (totalPages && totalPages > currentPage) {
                      setCurrentPage((current) => current + 1);
                    }
                  }}
                  disabled={totalPages === currentPage}
                  className="p-5 mx-2"
                >
                  Next
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </Fragment>
  );
};


export default RentalsPage;
