import { useGetAllHeroImagesQuery } from "../../redux/api/imageApi";
import { Fragment } from "react/jsx-runtime";
import Spinner from "../../utils/Spinner";

import { Button } from "antd";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/hooks";

const HeroSection = () => {
  const [index, setIndex] = useState<number>(0);
  const { data, isLoading } = useGetAllHeroImagesQuery(undefined, {
    pollingInterval: 30000,
    skip: false,
    refetchOnMountOrArgChange: true,
  });
    const theme = useAppSelector((state) => state.theme.isDarkMode);

  // get images length
  const dataLength = data?.data.length - 1;

  useEffect(() => {
    setInterval(() => {
      setIndex(dataLength === index ? 0 : index + 1);
    }, 60000);
  }, [index, dataLength]);

  return (
    <Fragment>
      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div
          className={`mt-20 md:h-[80vh] ${
            theme && "dark"
          } grid grid-cols-1 py-20 md:py-0 md:grid-cols-2`}
        >
          <div className="h-full p-5 md:p-18">
            <h1 className="text-5xl font-bold">
              <span className="dark:text-white text-blue-600 mx-3">Rental Bike</span>
              <span className="dark:text-white">Service</span>
            </h1>
            <p className="my-10 text-justify text-medium dark:text-white">
              A bike, or bicycle, is a two-wheeled, pedal-powered vehicle that
              provides an efficient and eco-friendly mode of transportation. It
              consists of a frame, two wheels, handlebars for steering, pedals
              for propulsion, and a seat. Biking is a popular activity for
              commuting, recreation, and exercise. Modern bikes come in various
              types, including road bikes, mountain bikes, and electric bikes,
              each designed for specific terrains and uses. Biking promotes
              physical fitness, reduces traffic congestion, and has a minimal
              environmental impact, making it a sustainable choice for short to
              medium-distance travel.
            </p>
            <Button className="p-5" type="primary">
              Know More
            </Button>
          </div>
          <div className="p-5 md:p-16">
            {data?.data && (
              <img
                src={data?.data[index].image.url}
                alt=""
                className="size-full"
              />
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default HeroSection;
