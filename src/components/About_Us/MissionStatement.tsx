
import { Button } from "antd";

import image1 from "../../assets/v1.png";
import image2 from "../../assets/v2.png";
import image3 from "../../assets/m1.png";




const MissionStatement = () => {
  return (
    <section className="max-w-full h-full md:h-auto my-10">
      <div className="max-w-full h-full px-1 md:px-16 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
          <div className="w-full h-full py-10 px-1">
            <div className="my-2">
              <h1 className="text-blue-400 dark:text-white font-bold text-3xl">
                Our Mission
              </h1>
              <h1 className="text-5xl font-bold text-[#0D0E10] dark:text-white my-5">
                Innovating for Success:
              </h1>
              <h1 className="text-5xl font-bold text-[#0D0E10] dark:text-white my-4">
                Our Rental Service Mission
              </h1>
              <div className="">
                <p className="text-justify dark:text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Soluta consectetur quod cum omnis fugit hic temporibus dolores
                  laudantium nulla dolorem rerum architecto, nesciunt voluptate
                  commodi necessitatibus recusandae adipisci, officia
                  consequatur id consequuntur eos. Minus rem, doloremque non
                  quae reiciendis ut? Nisi nihil nemo doloremque, eligendi
                  beatae minus ratione possimus adipisci?
                </p>
                <p className="my-5 text-justify dark:text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequuntur velit sint praesentium blanditiis consequatur sed
                  placeat voluptatem sapiente dicta amet aspernatur, excepturi
                  accusamus, deleniti, cupiditate odit? Alias voluptatum nihil
                  aperiam pariatur iste quis sequi magni cum enim itaque minima
                  dolore dolorem eum corrupti, aspernatur totam provident
                  voluptatem suscipit similique quisquam?
                </p>
              </div>
            </div>
            <div>
              <Button type="default" className="py-6 px-8 uppercase">
                Know More
              </Button>
            </div>
          </div>
          {/* under visions part */}
          <div className="w-full h-full p-10">
            <img src={image3} className="size-full" alt="" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
          <div className="w-full h-full p-10">
            <div className="w-full h-auto my-3 ">
              <img src={image2} className="size-full" alt="" />
            </div>
          </div>
          <div className="w-full h-full py-10 px-1">
            <div className="my-2">
              <h1 className="text-blue-400 font-bold text-3xl dark:text-white">
                Our Vision
              </h1>
              <h1 className="text-5xl font-bold text-[#0D0E10]  dark:text-white my-5">
                Driving Innovation :
              </h1>
              <h1 className="text-5xl font-bold text-[#0D0E10] dark:text-white  my-4">
                Our Vision at Rental service
              </h1>
              <div className="">
                <p className="text-justify dark:text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Soluta consectetur quod cum omnis fugit hic temporibus dolores
                  laudantium nulla dolorem rerum architecto, nesciunt voluptate
                  commodi necessitatibus recusandae adipisci, officia
                  consequatur id consequuntur eos. Minus rem, doloremque non
                  quae reiciendis ut? Nisi nihil nemo doloremque, eligendi
                  beatae minus ratione possimus adipisci?
                </p>
                <p className="my-5 text-justify dark:text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequuntur velit sint praesentium blanditiis consequatur sed
                  placeat voluptatem sapiente dicta amet aspernatur, excepturi
                  accusamus, deleniti, cupiditate odit? Alias voluptatum nihil
                  aperiam pariatur iste quis sequi magni cum enim itaque minima
                  dolore dolorem eum corrupti, aspernatur totam provident
                  voluptatem suscipit similique quisquam?
                </p>
              </div>
            </div>
            <div>
              <Button type="default" className="py-6 px-8 uppercase">
                Know More
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
          <div className="w-full h-full py-10 px-1">
            <div className="my-2">
              <h1 className="text-blue-400 font-bold text-3xl dark:text-white">
                Our Values
              </h1>
              <h1 className="text-5xl font-bold text-[#0D0E10] dark:text-white my-4">
                Our Rental Service Values
              </h1>
              <div className="">
                <p className="text-justify dark:text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Soluta consectetur quod cum omnis fugit hic temporibus dolores
                  laudantium nulla dolorem rerum architecto, nesciunt voluptate
                  commodi necessitatibus recusandae adipisci, officia
                  consequatur id consequuntur eos. Minus rem, doloremque non
                  quae reiciendis ut? Nisi nihil nemo doloremque, eligendi
                  beatae minus ratione possimus adipisci?
                </p>
                <p className="my-5 text-justify dark:text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequuntur velit sint praesentium blanditiis consequatur sed
                  placeat voluptatem sapiente dicta amet aspernatur, excepturi
                  accusamus, deleniti, cupiditate odit? Alias voluptatum nihil
                  aperiam pariatur iste quis sequi magni cum enim itaque minima
                  dolore dolorem eum corrupti, aspernatur totam provident
                  voluptatem suscipit similique quisquam?
                </p>
              </div>
            </div>
            <div>
              <Button type="default" className="py-6 px-8 uppercase">
                Know More
              </Button>
            </div>
          </div>
          {/* under visions part */}
          <div className="w-full h-full p-10">
            <img src={image1} className="size-full" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};




export default MissionStatement;