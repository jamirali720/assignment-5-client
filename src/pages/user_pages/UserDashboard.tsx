import { TBookingResponse } from "types/types";
import { useGetBookingByUserIdQuery } from "../../redux/api/bookingApi";
import MetaData from "../../components/MetaData/MetaData";

const UserDashboard = () => {
  const { data } = useGetBookingByUserIdQuery(undefined, {
    pollingInterval: 3000,
    skip: false,
  });

  const paidBookings = data?.data?.filter((booking: TBookingResponse) => booking.isReturned === true);
  const unpaidBookings = data?.data?.filter((booking: TBookingResponse) => booking.isReturned === false);

  return (
    <div className=" p-10 h-full">
      <MetaData title="User Dashboard" />
      <h1 className="text-center my-5 text-3xl">User Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="border text-slate-900 h-32 flex justify-center justify-items-center rounded-md">
          <div className="content-center">
            <h1 className="text-2xl">Paid Bookings</h1>
            <h1 className="text-xl w-16 h-16 rounded-full mx-auto">
              {paidBookings?.length}
            </h1>
          </div>
        </div>
        <div className="border  h-32 flex justify-center justify-items-center rounded-md">
          <div className="content-center text-slate-900">
            <h1 className="text-2xl">Unpaid Bookings</h1>
            <h1 className="text-xl w-16 h-16 rounded-full mx-auto">
              {unpaidBookings?.length}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
