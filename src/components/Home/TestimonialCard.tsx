
import { Rate } from 'antd';
import image from '../../assets/per1.png'
const TestimonialCard = ({
  name,
  message,
  company,
}: {
  name: string;
  message: string;
  company: string;
}) => (
  <div className="h-80 border border-slate-200 rounded-md shadow-lg p-5">
    <div className="mb-3">
      <Rate
        allowHalf
        count={5}
        disabled
        style={{ fontSize: 16 }}
        value={3.5}
      />
    </div>
    <div className="">
      <h1>{message} </h1>
    </div>
    <div className="flex justify-start my-5">
      <div className="flex  justify-center justify-items-center">
        <img
          src={image}
          alt="name"
          className="w-16 h-16 p-1 rounded-full border"
        />
      </div>
      <div className="ml-4 pt-2">
        <h2>{name} </h2>
        <h3>{company}</h3>
      </div>
    </div>
  </div>
);

export default TestimonialCard;
