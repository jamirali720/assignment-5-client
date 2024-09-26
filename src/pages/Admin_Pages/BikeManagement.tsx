import { Button, Card } from "antd";
import React, { Fragment, useState } from "react";

import Spinner from "../../utils/Spinner";
import {
  useDeletedBikeFromDatabaseMutation,
  useGetAllBikesQuery,
} from "../../redux/api/bikeApi";
import MetaData from "../../components/MetaData/MetaData";
import { toast } from "react-toastify";
import { TBikeResponse } from "types/types";
import { useAppSelector } from "../../hooks/hooks";
import FilterSection from "../../components/Bike_Management/FilterSection";
import CreateBikeModal from "./CreateBikeModal";
import UpdateBikeModal from "./UpdateBikeModal";

const BikeManagement: React.FC = () => {
  const { brand, cc, year, model, searchTerm } = useAppSelector(
    (state) => state.filter
  );
  const { data, isLoading } = useGetAllBikesQuery(
    { brand, cc, year, searchTerm, model },
    {
      pollingInterval: 5000,
      skip: false,
      refetchOnMountOrArgChange: true,
    }
  );

  console.log(data?.data);
 
  const [itemPerPage, setItemPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletedBikeFromDatabase] = useDeletedBikeFromDatabaseMutation();

  const totalPages =
    data?.data.length && Math.ceil(data?.data.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const lastIndex = startIndex + itemPerPage;
  const renderData = data?.data.slice(startIndex, lastIndex);

  const handleDeleteBike = async (id: string) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this bike ?');
      if (confirm) {
         const res = await deletedBikeFromDatabase(id);
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
      <div>
        {isLoading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <Card>
            <div>             
              <FilterSection />
            </div>
            <div className="w-full h-10 text-center text-2xl font-semibold mb-3">
              {data?.data.length ? (
                <span> {data?.data.length} Bikes Available </span>
              ) : (
                <span> No Bikes available</span>
              )}
            </div>
            <div className="overflow-x-scroll w-full max-w-full">
              <table className="w-full max-w-full ">
                <thead className="w-full">
                  <tr className="border border-slate-200 w-full ">
                    <th className="border border-slate-200 py-2">Image</th>
                    <th className="border border-slate-200">Name</th>
                    <th className="border border-slate-200">Description</th>
                    <th className="border border-slate-200">Brand</th>
                    <th className="border border-slate-200">Price Hour</th>
                    <th className="border border-slate-200">IsAvailable</th>
                    <th className="border border-slate-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {renderData &&
                    (renderData as TBikeResponse[]).map((bike, index) => {
                      return (
                        <tr
                          key={index}
                          className="border border-slate-200 text-center  h-16"
                        >
                          <td className="border border-slate-200 ">
                            <div className="w-20 h-20 mx-auto ">
                              <img
                                src={bike.image.url}
                                alt={bike.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </td>
                          <td className="border border-slate-200">
                            <p>{bike.name}</p>
                          </td>
                          <td className="border border-slate-200 w-2/12">
                            <p>{bike.description}</p>
                          </td>
                          <td className="border border-slate-200">
                            <p>{bike.brand}</p>
                          </td>
                          <td className="border border-slate-200">
                            {bike.pricePerHour}
                          </td>
                          <td className="border border-slate-200">
                            {bike.isAvailable.toString()}
                          </td>
                          <td className="border border-slate-200">
                            <CreateBikeModal />
                            <UpdateBikeModal bikeId={bike._id}/>
                            <Button
                            type="default"
                              className="p-5 mx-1 bg-red-600 text-white"
                              onClick={() => handleDeleteBike(bike._id!)}
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

export default BikeManagement;
