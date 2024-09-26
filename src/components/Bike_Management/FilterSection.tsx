import { Select } from "antd";
import { brands } from "../../helper/brands";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { clearFilter, setBrand, setCc, setModel, setYear } from "../../redux/features/filterSlice";
import { useGetAllBikesWithoutQueryQuery } from "../../redux/api/bikeApi";
import { TBikeResponse } from "types/types";

const FilterSection = () => {
  const { brand, year, cc, model } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const { data:allBikes } = useGetAllBikesWithoutQueryQuery(undefined, {pollingInterval: 5000});
  console.log(allBikes)

  const uniqueYears = [
    ...new Set(allBikes?.data.map((b: TBikeResponse) => b.year)),
  ];
  const uniqueModels = [
    ...new Set(allBikes?.data.map((b: TBikeResponse) => b.model)),
  ];
  const uniqueCc = [
    ...new Set(allBikes?.data.map((b: TBikeResponse) => b.cc)),
  ];


  
  // set filter brand value to filter slice
  const handleChangeBrand = (value: string) => {
    dispatch(setBrand(value));
  };
  // set filter brand value to filter slice
  const handleChangeModel = (value: string) => {
    dispatch(setModel(value));
  };
  // set filter year value to filter slice
  const handleChangeYear = (value: string) => {    
    dispatch(setYear(value));
  };
  const handleChangeCc = (value: string) => {
    dispatch(setCc(value));
  };

  // handle clear filter items from filter slice;
  const handleClearFilter = () => {
    dispatch(clearFilter());
  };

  return (
    <div className="my-10">
      <h1 className="my-5 text-3xl font-bold text-center">
        Filter bikes available
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:px-3">
        <div className="w-full pt-1">
          <span className="mx-2">Brand :</span>
          <Select
            defaultValue={brand}
            style={{ width: 160 }}
            onChange={handleChangeBrand}
            options={brands}
            className="min-w-full"
          />
        </div>
        <div className="w-full pt-1 ">
          <span className="mx-2">Year :</span>
          <Select
            defaultValue={year}
            style={{ width: 160 }}
            onChange={handleChangeYear}
            className="min-w-full"
            options={uniqueYears.map((year) => {
              return {
                label: year,
                value: year,
              };
            })}
          />
        </div>
        <div className="w-full pt-1 ">
          <span className="mx-2">Model :</span>
          <Select
            defaultValue={model}
            style={{ width: 160 }}
            onChange={handleChangeModel}
            className="min-w-full"
            options={uniqueModels.map((model) => {
              return {
                label: model,
                value: model,
              };
            })}
          />
        </div>
        <div className="w-full pt-1 ">
          <span className="mx-2">CC : </span>
          <Select
            defaultValue={cc}
            style={{ width: 160 }}
            onChange={handleChangeCc}
            className="min-w-full"
            options={uniqueCc.map((cc) => {
              return {
                label: cc,
                value: cc,
              };
            })}
          />
        </div>
        <div className="w-full h-10 md:mt-5 bg-sky-400 hover:bg-sky-500 ease-in-out  rounded-sm flex justify-center justify-items-center">
          <button
            className="w-full h-full hover:scale-105 text-white font-medium"
            onClick={handleClearFilter}
          >
            Clear Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
