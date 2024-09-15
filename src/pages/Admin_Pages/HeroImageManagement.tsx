import { Fragment } from "react/jsx-runtime";
import {
  useDeletedSingleHeroImageMutation,
  useGetAllHeroImagesQuery,
} from "../../redux/api/imageApi";
import Spinner from "../../utils/Spinner";
import { THeroImage } from "types/types";
import { Button } from "antd";
import { toast } from "react-toastify";

const HeroImageManagement = () => {
  const { data, isLoading } = useGetAllHeroImagesQuery(undefined, {
    pollingInterval: 30000,
    skip: false,
    refetchOnMountOrArgChange: true,
  });
  const [deletedSingleHeroImage, { isLoading: deleteLoading }] =
    useDeletedSingleHeroImageMutation();
  const handleDeleteImage = async (id: string) => {
    try {
      const result = await deletedSingleHeroImage(id);
      console.log(result);
      if (result.data.success) {
        toast.success(result.data.message, {
          position: "top-center",
          toastId: 1,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <div className="max-h-full overflow-y-scroll">
        {isLoading || deleteLoading ? (
          <div className="w-full  flex justify-center justify-items-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex justify-center justify-items-center flex-wrap gap-4 ">
            {data?.data.map((heroImage: THeroImage, index: number) => (
              <div key={index}>
                <img
                  src={heroImage.image.url}
                  alt={heroImage.image.public_id}
                  className="w-56 h-48"
                />               
                <Button
                  onClick={() => handleDeleteImage(heroImage._id)}
                  className="text-red-600 my-2 p-4"
                  type="default"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default HeroImageManagement;
