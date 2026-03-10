import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Banner from "./components/Banner";
import VideoWall from "./components/VideoWall";
import Features from "./components/Features";
import StatsBar from "./components/StatsBar";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <div className="scanlines" />
      <Navbar />
      <Hero />
      <Banner />
      <VideoWall />
      <Features />
      <StatsBar />
      <HowItWorks />
      <Pricing />
      <FinalCTA />
      <Footer />
    </>
  );
}
