import { Button, Card } from "antd";
import  { Fragment, useState } from "react";
import Spinner from "../../utils/Spinner";
import MetaData from "../../components/MetaData/MetaData";
import { toast } from "react-toastify";
import { useDeleteUserFromDBMutation, useGetAllUsersQuery } from "../../redux/api/userApi";
import { TRenderUser } from "types/types";
import UpdateUserRoleModal from "./UpdateUserRoleModal";

const UserManagement = () => {
  const { data, isLoading } = useGetAllUsersQuery( undefined,  
    {
      pollingInterval: 5000,
      skip: false,
      refetchOnMountOrArgChange: true,
    }
  );

  console.log(data);

  const [itemPerPage, setItemPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteUserFromDB, {isLoading:loading}] = useDeleteUserFromDBMutation();

 

  const totalPages =
    data?.data.length && Math.ceil(data?.data.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const lastIndex = startIndex + itemPerPage;
  const renderUsers = data?.data.slice(startIndex, lastIndex);


  const handleDeleteUser = async (id: string) => {   
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this user ?"
      );
      if (confirm) {
        const res = await deleteUserFromDB(id);       
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
      <MetaData title="Manage-all-users" />
      <div>
        {isLoading || loading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <Card>
            <div></div>
            <div className="w-full h-10 text-center text-2xl font-semibold mb-3">
              {data?.data.length ? (
                <span> {data?.data.length} users Available </span>
              ) : (
                <span> No users available</span>
              )}
            </div>
            <div className="overflow-x-scroll w-full max-w-full">
              <table className="w-full max-w-full ">
                <thead className="w-full">
                  <tr className="border border-slate-200 w-full ">
                    <th className="border border-slate-200 py-2">Image</th>
                    <th className="border border-slate-200">Name</th>
                    <th className="border border-slate-200">email</th>
                    <th className="border border-slate-200">Phone</th>
                    <th className="border border-slate-200">Address</th>
                    <th className="border border-slate-200">Role</th>
                    <th className="border border-slate-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {renderUsers &&
                    renderUsers.map((user: TRenderUser, index:number) => {
                      return (
                        <tr
                          key={index}
                          className="border border-slate-200 text-center  h-16"
                        >
                          <td className="border border-slate-200 ">
                            <div className="w-20 h-20 mx-auto ">
                              <img
                                src={user?.image.url}
                                alt={user?.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </td>
                          <td className="border border-slate-200">
                            <p>{user?.name}</p>
                          </td>
                          <td className="border border-slate-200 w-2/12">
                            <p>{user?.email}</p>
                          </td>
                          <td className="border border-slate-200">
                            <p>{user?.phone}</p>
                          </td>
                          <td className="border border-slate-200">
                            {user?.address}
                          </td>
                          <td className="border border-slate-200">
                            {user?.role}
                          </td>
                          <td className="border border-slate-200">
                            <UpdateUserRoleModal userId={user._id} />
                            <Button
                              type="default"
                              className="p-5 mx-1 bg-red-600 text-white"
                              onClick={() => handleDeleteUser(user._id!)}
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
        )}
      </div>
    </Fragment>
  );
};


export default UserManagement;