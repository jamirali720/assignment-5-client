import { IErrorResponse, IErrorResponseStatus } from "types/types";
import { useGetProfileQuery } from "../../redux/api/userApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

const UserProfilePage = () => {
  const { data, isLoading, isError, error } = useGetProfileQuery(undefined, {
    pollingInterval: 50000,
  });

  // show error message
  let message = "";
  if (error) {
    message =
      (error as IErrorResponse).data?.message ||
      (error as IErrorResponseStatus).error;
  }

  useEffect(() => {
    if (isError) {
      toast.error(message, { position: "top-center", toastId: 1 });
    }
  }, [isError, message]);

  console.log(data)

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {message}</p>}
      {data && (
        <div>
          <h1>{data.data.username}</h1>
          <p>Email: {data.data.email}</p>
          <p>Role: {data.role}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
