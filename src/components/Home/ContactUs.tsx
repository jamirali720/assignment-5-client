import { SubmitHandler, useForm } from "react-hook-form";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { MdMarkEmailRead } from "react-icons/md";
import { Link } from "react-router-dom";
import { useContactEmailSendMutation } from "../../redux/api/bikeApi";
import { TContact } from "types/types";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Button } from "antd";
import { useAppSelector } from "../../hooks/hooks";

const ContactUs = () => {
  const theme = useAppSelector((state) => state.theme.isDarkMode);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TContact>();
  const [contactEmailSend, { isSuccess, isLoading }] =
    useContactEmailSendMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Email sent successfully!", {
        position: "top-center",
        toastId: 1,
      });
      reset();
    }
  }, [isSuccess, reset]);

  const onSubmit: SubmitHandler<TContact> = async (data) => {
    
    try {
     const result = await contactEmailSend(data);
     console.log(result)

    } catch (error) {
      console.error(error);
      toast.error("Failed to send email. Please try again!", {
        position: "top-center",
        toastId: 1,
      });
    }
  };

  return (
    <div className={`md:my-1 md:py-5 ${theme && "dark"} `}>
      <section className="w-screen md:w-full h-full shadow-sm rounded-md">
        <div className="pt-3">
          <h1 className="text-center text-3xl font-medium text-slate-700 dark:text-white">
            Contact Us
          </h1>

          <div className="grid md:grid-cols-2 px-10 dark:bg-slate-900 text-white">
            <div className="my-5 grid md:grid-cols-1 md:p-3">
              <div className="">
                <h1 className="text-start text-slate-900 dark:text-white text-1xl  font-semibold">
                  Get In Touch
                </h1>
                <p className="text-justify text-slate-900 dark:text-white">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Assumenda libero eos eveniet asperiores ad? Fugiat hic dicta
                  voluptas ipsum quos, quae quasi ducimus dolor vero consequatur
                  deleniti totam est maxime.
                </p>
              </div>

              <div className="flex justify-start justify-items-center space-x-3 dark:text-white">
                <span className="w-8 h-8 p-2  rounded-full bg-red-400 text-white">
                  <FaLocationDot size={15} />
                </span>
                <div className="flex-col space-y-1 ">
                  <h2 className="text-1xl font-medium dark:text-white text-slate-600">
                    Address
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-white">
                    Kadamtaly, Titas, Comilla, Bangladesh
                  </p>
                </div>
              </div>
              <div className="flex justify-start justify-items-center space-x-3">
                <span className="w-8 h-8 p-2  rounded-full bg-red-400 dark:text-white  text-white">
                  <FaPhone size={15} />
                </span>
                <div className="flex-col space-y-1">
                  <h2 className="text-1xl font-medium dark:text-white text-slate-600">
                    Phone
                  </h2>
                  <p className="text-sm dark:text-white text-slate-600">
                    +8801814245427
                  </p>
                </div>
              </div>
              <div className="flex justify-start justify-items-center space-x-3">
                <span className="w-8 h-8 p-2  rounded-full dark:text-white bg-red-400 text-white">
                  <MdMarkEmailRead size={15} />
                </span>
                <div className="flex-col space-y-1">
                  <h2 className="text-1xl font-medium dark:text-white text-slate-600">
                    Email
                  </h2>
                  <p className="text-sm dark:text-white text-slate-600">
                    jamirali720@gmail.com
                  </p>
                </div>
              </div>
              <hr className="my-4 md:my-0" />
              <div className="flex justify-center justify-items-center space-x-4">
                <ul className="flex justify-center justify-items-center space-x-4">
                  <li>
                    <Link to="https://www.google.com" target="_blank">
                      <span className="text-[#EA4335] ">
                        <FcGoogle size={25} />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-[#1877F2] hover:text-[#4267B2] ease-in-out duration-300">
                        <FaFacebook size={25} />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://www.linkedin.com/in/jamir-ali-36755b1b7/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-[#0A66C2] hover:text-[#000000] ease-in-out duration-300">
                        <FaLinkedin size={25} />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="https://www.instagram.com" target="_blank">
                      <span className="text-[##F58529] hover:text-[#E1306C] ease-in-out duration-300">
                        <FaInstagram size={25} />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="https://www.twitter.com" target="_blank">
                      <span className="text-[#1DA1F2] hover:text-[#14171A] ease-in-out duration-300">
                        <FaTwitter size={25} />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="https://www.youtube.com" target="_blank">
                      <span className="text-[#FF0000] hover:text-[#282828] ease-in-out duration-300">
                        <FaYoutube size={25} />
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="my-5 md:border-l">
              <form className="md:px-10" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-col space-y-2 my-4">
                  <label
                    className=" dark:text-white text-slate-500 "
                    htmlFor="name"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    className="placeholder:text-slate-500 block w-full indent-2 rounded-sm font-light ring-1 ring-gray-300 dark:bg-black border-0 p-1.5 focus:ring-2 focus:ring-inset focus:ring-indigo-300"
                    placeholder="Write your name"
                  />
                  {errors.name && (
                    <span className="text-red-500">Name is required</span>
                  )}
                </div>
                <div className="flex-col space-y-2 my-4">
                  <label
                    className="dark:text-white  text-slate-500"
                    htmlFor="email"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="placeholder:text-slate-500 block w-full indent-2 rounded-sm font-light ring-1 ring-gray-300 border-0 dark:bg-black p-1.5 focus:ring-2 focus:ring-inset focus:ring-indigo-300"
                    placeholder="Write your email address"
                  />
                  {errors.email && (
                    <span className=" dark:text-white text-red-500">
                      Email is required
                    </span>
                  )}
                </div>

                <div className="flex-col space-y-2 my-4">
                  <label
                    className=" dark:text-white text-slate-500"
                    htmlFor="subject"
                  >
                    Subject:
                  </label>
                  <input
                    type="text"
                    {...register("subject", { required: true })}
                    className="placeholder:text-slate-500 block w-full indent-2 rounded-sm font-light ring-1 ring-gray-300 border-0 dark:bg-black  p-1.5 focus:ring-2 focus:ring-inset focus:ring-indigo-300"
                    placeholder="Write your phone subject"
                  />
                  {errors.subject && (
                    <span className="dark:text-white text-red-500">
                      Subject is required
                    </span>
                  )}
                </div>
                <div className="flex-col space-y-2 my-4">
                  <label
                    className="dark:text-white text-slate-500"
                    htmlFor="message"
                  >
                    Message:
                  </label>
                  <textarea
                    {...register("message", { required: true })}
                    className="placeholder:text-slate-500 text-slate-900 dark:text-white block w-full indent-2 rounded-sm font-light ring-1 ring-gray-300 border-0 dark:bg-black p-1.5 focus:ring-2 focus:ring-inset focus:ring-indigo-300"
                    placeholder="Write your message here"
                  />
                  {errors.message && (
                    <span className="text-red-500">Message is required</span>
                  )}
                </div>
                <div className=" w-11/12 my-5 text-end">
                  <Button
                    type={`${theme ? "default" : "primary"}`}
                    htmlType="submit"
                    className="p-5 "
                  >
                    {isLoading ? "Sending" : "Submit"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
