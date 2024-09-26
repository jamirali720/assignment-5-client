import { useState } from "react";
import TimeLIneItem from "./TimeLIneItem";
import { Button } from "antd";

const timelineData = [
  {
    year: "2008",
    title: "Concept of a Sustainable Bike Rental Service",
    description:
      "The founders, driven by increasing traffic congestion and environmental concerns, conceptualized a bike rental service to provide an eco-friendly, easy, and affordable alternative for urban transportation.",
  },
  {
    year: "2009",
    title: "First Rental Station in New York City",
    description:
      "The first bike rental station was launched in NYC with 100 bikes, targeting daily commuters, tourists, and short-distance travelers.",
  },
  {
    year: "2011",
    title: "Expansion to Major Cities",
    description:
      "The service expanded to major cities like San Francisco, Chicago, and Boston, with over 500 bikes in operation.",
  },
  {
    year: "2013",
    title: "Mobile App Launch",
    description:
      "To improve user experience, a mobile app was launched allowing users to book bikes, locate nearby stations, and make payments online.",
  },
  {
    year: "2015",
    title: "Introduction of Electric Bikes",
    description:
      "Electric bikes were introduced into the fleet, making it easier for users to cover long distances and tackle hilly areas.",
  },
  {
    year: "2017",
    title: "1 Million Rides Milestone",
    description:
      "The service celebrated reaching 1 million rides, reflecting its growing popularity among urban commuters and tourists.",
  },
  {
    year: "2019",
    title: "Partnership with Local Governments",
    description:
      "Partnered with local governments to create dedicated bike lanes and improve the city’s cycling infrastructure for a safer riding experience.",
  },
  {
    year: "2020",
    title: "Award for Sustainability Initiatives",
    description:
      "Received an award for promoting sustainable and eco-friendly transportation solutions, reducing carbon emissions, and helping cities become greener.",
  },
  {
    year: "2022",
    title: "Global Expansion",
    description:
      "The service expanded internationally, launching in European cities such as Amsterdam, Berlin, and Barcelona.",
  },
  {
    year: "2023",
    title: "Introduction of Subscription Model",
    description:
      "Launched a subscription-based model allowing frequent riders to pay monthly and enjoy unlimited rides, making it more cost-effective for daily commuters.",
  },
  {
    year: "2010",
    title: "Founded",
    description:
      "Our organization was founded with the mission to make biking accessible to everyone.",
  },
  {
    year: "2012",
    title: "First Office",
    description:
      "Opened our first office and launched bike rental services in the city.",
  },
  {
    year: "2015",
    title: "Expansion",
    description: "Expanded to multiple cities and introduced electric bikes.",
  }, 
  {
    year: "2024",
    title: "Award for Sustainability",
    description:
      "Received an award for promoting eco-friendly transportation solutions.",
  },
];

const uniqueYears = [...new Set(timelineData.map((t) => Number(t.year)))];

const History = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const filteredData = timelineData.filter(
    (item) => Number(item.year) === year
  );
  
  return (
    <div className="dark:bg-black dark:text-white">
      <h1 className="text-center text-4xl font-semibold">
        Our History and Milestone
      </h1>
      <div className="text-center dark:text-white">
        {uniqueYears.map((button) => {
          return (
            <Button
              className="mx-4 p-5 dark:text-white"
              type={year === button ? "primary" : "text"}
              key={button}
              onClick={() => setYear(button)}
            >
              {button}
            </Button>
          );
        })}
      </div>
      <div className="flex flex-wrap justify-center justify-items-center">
        {filteredData.map((item, index) => (
          <TimeLIneItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default History;
