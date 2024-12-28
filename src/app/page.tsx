
import Navbar from "./Navbar/page";
import Hero from "./hero/page";
import About from "./about/page";
import Services from "./services/page";
import Gallery from "./gallery/page"
import Contact from "./contact/page";
import Footer from "./Footer/page";
export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Services/>
      <Gallery />
      <Contact />
      <Footer/>
    </div>
  );
}
