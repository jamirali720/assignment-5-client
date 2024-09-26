import { useState } from "react";
import { Button, Form, Modal, Input, Rate } from "antd";
import type { FormProps } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setRating } from "../../redux/features/filterSlice";
import { useCreateReviewMutation } from "../../redux/api/bikeApi";
import { toast } from "react-toastify";
import { userInfo } from "../../redux/features/authSlice";

type FieldType = {
  name: string;
  email: string;
  message: string;
  review: string;
};

const ReviewModal = ({ id }: { id: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userInfo);

  const [createReview] = useCreateReviewMutation();
  const showModal = () => {
    if (user === null) {
      return toast.warn("You must be logged in to provide review", {
        position: "top-center",
        toastId: 1,
      });
    }
    setIsModalOpen(true);
  };
  const onCancelModal = () => {
    setIsModalOpen(false);
  };

  const OnFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { name, email } = user!;
    const reviewData = {
      id: id,
      username: name,
      email: email,
      message: values.message,
      rating: Number(values.review),
    };

    const { data } = await createReview(reviewData);   

    if (data?.success) {
      setIsModalOpen(false);
      form.resetFields();
      return toast.success(data.message, {
        position: "top-center",
        toastId: 1,
      });
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal} className="p-5">
        Submit Review
      </Button>
      <Modal
        title="Review Modal"
        open={isModalOpen}
        onCancel={onCancelModal}
        footer={null}
      >
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={OnFinish}
        >
          <Form.Item
            name="review"
            label="Select Review"
            required
            rules={[{ required: true, message: "Please input your review!" }]}
          >
            <Rate
              allowHalf
              allowClear
              count={5}
              style={{ fontSize: 22 }}
              value={5}
              tooltips={["1", "2", "3", "4", "5"]}
              onChange={(event) => dispatch(setRating(event))}
            />
          </Form.Item>

          <Form.Item
            name="message"
            label="message"
            required
            rules={[{ required: true, message: "Please input your message!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20, span: 10 }}>
            <Button type="primary" htmlType="submit" className="p-5">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ReviewModal;
