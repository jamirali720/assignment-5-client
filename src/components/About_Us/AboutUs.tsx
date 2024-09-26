import { useAppSelector } from "../../hooks/hooks";
import ContactUs from "../../components/Home/ContactUs";
import History from "./History";
import MissionStatement from "./MissionStatement";

import TeamSection from "./TeamSection";

const AboutUs = () => {
  const theme = useAppSelector(state => state.theme.isDarkMode)
  return (
    <div className= {`w-full  mt-32 md:mt-20 ${theme && "dark"}`}>
      <MissionStatement />
      <section>
        <TeamSection />
      </section>
      <section className="shadow-sm w-full h-[80vh] py-10 bg-slate-50 dark:bg-black">
        <History />
      </section>
      <section>
        <ContactUs />
      </section>
    </div>
  );
};

export default AboutUs;
