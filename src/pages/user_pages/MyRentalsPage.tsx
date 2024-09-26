import { useGetBookingByUserIdQuery } from "../../redux/api/bookingApi";
import { Button, Card } from "antd";
import React, { Fragment, useState } from "react";

import Spinner from "../../utils/Spinner";
import { Link } from "react-router-dom";

import MetaData from "../../components/MetaData/MetaData";
import { TBookingResponse } from "types/types";
import { useAppDispatch } from "../../hooks/hooks";
import { setRemainingCost } from "../../redux/features/cartSlice";

const MyRentalsPage: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetBookingByUserIdQuery(undefined, {
    pollingInterval: 50000,
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  

  const paidData = data?.data.filter(
    (item: TBookingResponse) => item.isReturned === true
  );
  const unPaidData = data?.data.filter(
    (item: TBookingResponse) => item.isReturned === false
  );

  let renderBookings;

  switch (show) {
    case true:
      renderBookings = paidData;
      break;
    case false:
      renderBookings = unPaidData;
      break;
    default:
      break;
  }

  const [itemPerPage, setItemPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages =
    data?.data.length && Math.ceil(data?.data.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const lastIndex = startIndex + itemPerPage;
  const renderData = renderBookings?.slice(startIndex, lastIndex);

  const handleRemainingCons = (remainingCost: number, bookingId:string) => {
    dispatch(setRemainingCost({ remainingCost, bookingId }));
  };

  return (
    <Fragment>
      <MetaData title="All booking Members" />
      <div className="w-screen md:w-full">
        {isLoading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <Card>
            <div className="max-w-full md:w-full">
              <div className="w-screen md:w-1/2 mx-auto  flex justify-center justify-items-center">
                <Button
                  onClick={() => setShow(true)}
                  type={show ? "primary" : "default"}
                  className="p-5 mx-2"
                >
                  Paid
                </Button>
                <Button
                  type={show ? "default" : "primary"}
                  onClick={() => setShow(false)}
                  className="p-5 mx-2"
                >
                  Unpaid
                </Button>
              </div>
              <div className="w-full h-10 text-center text-2xl font-semibold mb-3">
                {data?.data.length ? (
                  <span> {data?.data.length} bookings Available </span>
                ) : (
                  <span> No booking available</span>
                )}
              </div>
            </div>
            <div className="overflow-x-scroll w-full max-w-full">
              <table className="w-full max-w-full ">
                <thead className="w-full">
                  <tr className="border border-slate-200 w-full ">
                    <th className="border border-slate-200">Bike Name</th>
                    <th className="border border-slate-200">Start Time</th>
                    <th className="border border-slate-200">Return Time</th>
                    <th className="border border-slate-200">Advanced</th>
                    <th className="border border-slate-200">Total Cost</th>
                    <th className="border border-slate-200">Remaining Cost</th>
                    <th className="border border-slate-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {renderData &&
                    renderData.map(
                      (booking: TBookingResponse, index: number) => {
                        return (
                          <tr
                            key={index}
                            className="border border-slate-200 text-center  h-16"
                          >
                            <td className="border border-slate-200">
                              <p>{booking.bikeId.name}</p>
                            </td>

                            <td className="border border-slate-200">
                              <p>{booking.startTime}</p>
                            </td>
                            <td className="border border-slate-200">
                              <p>{booking.returnTime}</p>
                            </td>
                            <td className="border border-slate-200">
                              <p>{booking.advanced}</p>
                            </td>
                            <td className="border border-slate-200">
                              <p>{booking.totalCost}</p>
                            </td>
                            <td className="border border-slate-200">
                              <p>{booking.remainingCost}</p>
                            </td>

                            <td className="border border-slate-200">
                              {Math.abs(booking.remainingCost) > 0 &&
                              !booking.isReturned ? (
                                <Link to="/user/payment">
                                  <Button
                                    onClick={() =>
                                      handleRemainingCons(
                                        booking.remainingCost,
                                        booking._id
                                      )
                                    }
                                    type="primary"
                                    className="p-5"
                                  >
                                    Pay
                                  </Button>
                                </Link>
                              ) : booking.isReturned ? (
                                <span> Paid </span>
                              ) : (
                                <span> Not Calculated Yet </span>
                              )}
                            </td>
                          </tr>
                        );
                      }
                    )}
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
                <button
                  onClick={() => {
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                  className="mx-1 border border-slate-200 px-4 py-2 rounded"
                >
                  Prev
                </button>
                <button
                  onClick={() => {
                    if (totalPages && totalPages > currentPage)
                      setCurrentPage(currentPage + 1);
                  }}
                  className="mx-1 border border-slate-200 px-4 py-2 rounded"
                >
                  next
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Fragment>
  );
};

export default MyRentalsPage;
