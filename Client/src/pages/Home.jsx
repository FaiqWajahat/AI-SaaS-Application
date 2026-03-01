import AiTools from "../components/AiTools";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import SubscriptionPlan from "../components/SubscriptionPlan";
import Testimonial from "../components/Testimonial";

const Home = () => {
  return (
    <>
    {/* Navbar is called here */}
    <Navbar />
    {/* Hero section is defined here */}
    <Hero/>
    {/* AI tools are defined here  */}
      <AiTools/>
    {/*Testiminial are defined here  */}
    <Testimonial/>
    {/* Subscription Plan */}
    <SubscriptionPlan/>
    {/* Footer is defined here */}
    <Footer/>
    </>
  );
};

export default Home;
