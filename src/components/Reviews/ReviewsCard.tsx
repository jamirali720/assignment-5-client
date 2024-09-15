import { TReview } from "types/types";
import { Card } from "antd";
import { useAppSelector } from "../../hooks/hooks";
import { userInfo } from "../../redux/features/authSlice";
interface  TReviewProps  {  
  review?: TReview;  
}

const ReviewsCard = ({ review }: TReviewProps) => {
  const user = useAppSelector(userInfo);
  const {image} = user!
  return (
   
      <Card
        className="w-80 h-96 border  border-slate-200"
        title="Bike Review"
      >       
      <div> 
        <img src={image["url"]} alt="" className="size-40" />
      </div>
        <h1>
          <strong>Name : </strong> {review?.username}
        </h1>
        <h3>
          <strong>Email : </strong> {review?.email}
        </h3>
        <h3>
          <strong> Comment : </strong> {review?.message}
        </h3>
        <h3>
          <strong>Rating : </strong> {review?.rating}
        </h3>
      </Card>
   
  );
};

export default ReviewsCard;
