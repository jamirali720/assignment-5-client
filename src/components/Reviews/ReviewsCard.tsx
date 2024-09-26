import { TReview } from "types/types";
import { Card } from "antd";

interface  TReviewProps  {  
  review?: TReview;  
}

const ReviewsCard = ({ review }: TReviewProps) => { 
 
  return (
    <Card className="w-80 h-96 border  border-slate-200" title="Bike Review">
      <div className="w-full h-40 pb-3">
        {
          review?.userId.image && (
            <img
              src={review?.userId.image.url}
              alt={review?.userId.name}
              className="size-full"
            />
          )
        }
      </div>
      <h1>
        <strong>Name : </strong> {review?.userId.name}
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
      <h3>
        <strong>Phone : </strong> {review?.userId.phone}
      </h3>
    </Card>
  );
};

export default ReviewsCard;
