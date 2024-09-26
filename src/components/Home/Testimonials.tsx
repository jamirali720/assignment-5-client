import TestimonialCard from "./TestimonialCard";


const testimonials = [
  {
    name: "John Doe",
    message: "This is an amazing product! Highly recommend it.Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi non ipsam dolorum tempore at deserunt ea vero quasi vel eveniet itaque, ",
    company: "ABC Inc.",
  },
  {
    name: "Jane Smith",
    message: "Exceptional service and great support team Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi non ipsam dolorum tempore at deserunt ea vero quasi vel eveniet itaque, .",
    company: "XYZ Co.",
  },
  {
    name: "Jane Smith",
    message: "Exceptional service and great support team Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi non ipsam dolorum tempore at deserunt ea vero quasi vel eveniet itaque,",
    company: "XYZ Co.",
  },
  {
    name: "Jane Smith",
    message: "Exceptional service and great support team Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi non ipsam dolorum tempore at deserunt ea vero quasi vel eveniet itaque, ",
    company: "XYZ Co.",
  },
  {
    name: "Jane Smith",
    message: "Exceptional service and great support team Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi non ipsam dolorum tempore at deserunt ea vero quasi vel eveniet itaque, ",
    company: "XYZ Co.",
  },
  {
    name: "Jane Smith",
    message: "Exceptional service and great support team Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi non ipsam dolorum tempore at deserunt ea vero quasi vel eveniet itaque, ",
    company: "XYZ Co.",
  },
  {
    name: "Jane Smith",
    message: "Exceptional service and great support team Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi non ipsam dolorum tempore at deserunt ea vero quasi vel eveniet itaque,.",
    company: "XYZ Co.",
  },
  {
    name: "Jane Smith",
    message: "Exceptional service and great support team Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi non ipsam dolorum tempore at deserunt ea vero quasi vel eveniet itaque,.",
    company: "XYZ Co.",
  },
];


const Testimonials = () => {
    return (
      <div>
        <h1 className="text-bold text-5xl text-center mb-5">Testimonials</h1>
        <p className="text-3xl text-center">Our happy clients say about us</p>
        <div className="grid grid-cols-1 md:grid-cols-4 p-5 gap-4">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              message={testimonial.message}
              company={testimonial.company}
            />
          ))}
        </div>
      </div>
    );
}

export default Testimonials;


