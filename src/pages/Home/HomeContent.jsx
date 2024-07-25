import React, { useState } from "react";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import service1 from "../../assets/service1.jpg";
import service2 from "../../assets/service2.jpg";
import service3 from "../../assets/service3.jpg";
import service4 from "../../assets/service4.jpg";
import service5 from "../../assets/service5.jpg";
import service6 from "../../assets/service6.jpg";
import team from "../../assets/teamphoto1.jpg";
import team1 from "../../assets/teamstef1.png";
import team2 from "../../assets/teamberni1.png";
import team3 from "../../assets/teamash1.png";
import team4 from "../../assets/teampat1.png";
import { RiFileUserFill } from "react-icons/ri";
import Footer from "../../components/ui/Footer.jsx";
import {
  FaLinkedin,
  FaEnvelope,
  FaFacebookSquare,
  FaHandPointer,
} from "react-icons/fa";

const Content = () => {
  const [hoveredName, setHoveredName] = useState("");

  const handleHover = (name) => {
    setHoveredName(name);
  };
  return (
    <div>
      <div className="px-5 py-12 mx-auto lg:px-16">
        <div className="mx-auto text-center">
          <div className="grid grid-cols-5 gap-2 mx-auto lg:grid-cols-5 ">
            <div>
              <img
                className="h-4 mx-auto lg:h-12 hover:scale-110 transition duration-300 ease-in-out"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Shopee.svg/2560px-Shopee.svg.png"
                alt="Shopee"
              />
            </div>
            <div>
              <img
                className="h-4 mx-auto lg:h-12  hover:scale-110 transition duration-300 ease-in-out"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Lazada_%282019%29.svg/2560px-Lazada_%282019%29.svg.png"
                alt="Lazada"
              />
            </div>
            <div>
              <img
                className="h-4 mx-auto lg:h-12  hover:scale-110 transition duration-300 ease-in-out"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/2560px-EBay_logo.svg.png"
                alt="Sketch "
              />
            </div>
            <div>
              <img
                className="h-4 mx-auto lg:h-12  hover:scale-110 transition duration-300 ease-in-out"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Aliexpress_logo.svg/2560px-Aliexpress_logo.svg.png"
                alt="Sketch "
              />
            </div>
            <div>
              <img
                className="h-4 mx-auto lg:h-12  hover:scale-110 transition duration-300 ease-in-out"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Watsons_logotype.svg/2560px-Watsons_logotype.svg.png"
                alt="Invision"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1240px] mx-auto grid py-12 px-4">
        <section id="services">
          <div className="text-center font-Montserrat">
            <h1 className="text-[#131313] font-bold text-3xl pb-2">
              Which Shipping Solution Fits your Parcel?
            </h1>
            <p className="font-semibold text-[15px]">
              Discover the ideal service for your parcel based on size and
              urgency.
            </p>
          </div>
          <div className="font-Montserrat my-5">
            <div className="mt-5 mx-auto grid justify-items-stretch gap-4 md:grid-cols-3 lg:gap-10">
              <div className="relative group overflow-hidden h-[300px] rounded-lg hover:drop-shadow-lg transition ease">
                <a className="absolute inset-0 flex items-end">
                  <img
                    src={service1}
                    className="inline-block w-full h-full object-cover rounded-lg transform scale-100 group-hover:scale-110 transition duration-300 ease-in-out"
                  />
                </a>
                <div className="font-Montserrat absolute inset-0 flex flex-col items-center justify-end p-5 rounded-lg bg-gradient-to-b from-transparent  to-teal-500  transition duration-300 ease-in-out opacity-100 hover:opacity-0">
                  <p className="text-sm font-bold sm:text-xl text-white opacity-100 group-hover:opacity-0 transition duration-300 ease-in-out">
                    Motorcycle
                  </p>
                  <p className="text-center text-sm text-teal-100 opacity-100 group-hover:opacity-0 transition duration-300 ease-in-out">
                    Cheapest delivery option; perfect for small items such as
                    food and documents.
                  </p>
                </div>
              </div>
              <div className="relative group overflow-hidden h-[300px] rounded-lg hover:drop-shadow-lg transition ease">
                <a className="absolute inset-0 flex items-end">
                  <img
                    src={service2}
                    className="inline-block w-full h-full object-cover rounded-lg transform scale-100 group-hover:scale-110 transition duration-300 ease-in-out"
                  />
                </a>
                <div className="font-Montserrat absolute inset-0 flex flex-col items-center justify-end p-5 rounded-lg bg-gradient-to-b from-transparent  to-teal-500  transition duration-300 ease-in-out opacity-100 hover:opacity-0">
                  <p className="text-sm font-bold sm:text-xl text-white opacity-100 group-hover:opacity-0 transition duration-300 ease-in-out">
                    200kg Hatchback/Sedan
                  </p>
                  <p className="text-center text-sm text-teal-100 opacity-100 group-hover:opacity-0 transition duration-300 ease-in-out">
                    Cheapest 4-wheel option
                  </p>
                </div>
              </div>
              <div className="relative group overflow-hidden h-[300px] rounded-lg hover:drop-shadow-lg transition ease">
                <a className="absolute inset-0 flex items-end">
                  <img
                    src={service3}
                    className="inline-block w-full h-full object-cover rounded-lg transform scale-100 group-hover:scale-110 transition duration-300 ease-in-out"
                  />
                </a>
                <div className="font-Montserrat absolute inset-0 flex flex-col items-center justify-end p-5 rounded-lg bg-gradient-to-b from-transparent  to-teal-500  transition duration-300 ease-in-out opacity-100 hover:opacity-0">
                  <p className="text-sm font-bold sm:text-xl text-white opacity-100 group-hover:opacity-0 transition duration-300 ease-in-out">
                    600kg MPV
                  </p>
                  <p className="text-center text-sm text-teal-100 opacity-100 group-hover:opacity-0 transition duration-300 ease-in-out">
                    Flexible and affordable 4-wheel delivery option
                  </p>
                </div>
              </div>
              <div className="relative group overflow-hidden h-[300px] rounded-lg hover:drop-shadow-lg transition ease">
                <a className="absolute inset-0 flex items-end">
                  <img
                    src={service4}
                    className="inline-block w-full h-full object-cover rounded-lg transform scale-100 group-hover:scale-110 transition duration-300 ease-in-out"
                  />
                </a>
                <div className="font-Montserrat absolute inset-0 flex flex-col items-center justify-end p-5 rounded-lg bg-gradient-to-b from-transparent  to-teal-500  transition duration-300 ease-in-out opacity-100 hover:opacity-0">
                  <p className="text-sm font-bold sm:text-xl text-white opacity-100 group-hover:opacity-0 transition duration-300 ease-in-out">
                    1,000kg Small Truck
                  </p>
                  <p className="text-center text-sm text-teal-100 opacity-100 group-hover:opacity-0 transition duration-300 ease-in-out">
                    All-around 4-wheel option, great for general bulky delivery
                  </p>
                </div>
              </div>
              <div className="relative group overflow-hidden h-[300px] rounded-lg hover:drop-shadow-lg transition ease">
                <a className="absolute inset-0 flex items-end">
                  <img
                    src={service5}
                    className="inline-block w-full h-full object-cover rounded-lg transform scale-100 group-hover:scale-110 transition duration-300 ease-in-out"
                  />
                </a>
                <div className="font-Montserrat absolute inset-0 flex flex-col items-center justify-end p-5 rounded-lg bg-gradient-to-b from-transparent  to-teal-500  transition duration-300 ease-in-out opacity-100 hover:opacity-0">
                  <p className="text-sm font-bold sm:text-xl text-white opacity-100 group-hover:opacity-0 transition duration-300 ease-in-out">
                    2,000kg Medium Truck
                  </p>
                  <p className="text-center text-sm text-teal-100 opacity-100 group-hover:opacity-0 transition duration-300 ease-in-out">
                    Multiple items that can't fit L300
                  </p>
                </div>
              </div>
              <div className="relative group overflow-hidden h-[300px] rounded-lg hover:drop-shadow-lg transition ease">
                <a className="absolute inset-0 flex items-end">
                  <img
                    src={service6}
                    className="inline-block w-full h-full object-cover rounded-lg transform scale-100 group-hover:scale-110 transition duration-300 ease-in-out"
                  />
                </a>
                <div className="font-Montserrat absolute inset-0 flex flex-col items-center justify-end p-5 rounded-lg bg-gradient-to-b from-transparent  to-teal-500  transition duration-300 ease-in-out opacity-100 hover:opacity-0">
                  <p className="text-sm font-bold sm:text-xl text-white opacity-100 group-hover:opacity-0 transition duration-300 ease-in-out">
                    3,000kg Large Truck
                  </p>
                  <p className="text-center text-sm text-teal-100 opacity-100 group-hover:opacity-0 transition duration-300 ease-in-out">
                    Good for business and bulky delivery, furniture delivery &
                    lipat-bahay delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="team">
          <div className="container px-5 py-10 mx-auto font-Montserrat">
            <div className="text-center ">
              <h1 className="text-[#131313] font-bold text-3xl pb-2">
                Meet The Team
              </h1>
              <p className="font-semibold text-[15px] mb-5">
                At Shadala, our team is a dynamic mix of dedicated professionals
                who bring passion, expertise, and a touch of Filipino warmth to
                the world of logistics. Together, we work tirelessly to ensure
                your shipments are handled with care and precision.
              </p>
            </div>
            <div className="flex flex-wrap -m-4 ">
              <div className="relative mb-2">
                <img
                  alt="team"
                  className="inset-0 object-cover w-full h-full rounded-[20px]"
                  src={hoveredName || team} // Use hoveredName if set, otherwise use the default team photo
                />
                <div className="absolute inset-0 rounded-[20px] opacity-100 z-10 bg-gradient-to-t from-teal-500 via-transparent">
                  {/* <p className="flex flex-row text-gray-400 bottom-0 justify-center">
                    <FaHandPointer className="mr-2" /> Hover our names
                  </p> */}
                </div>
              </div>

              <div className="p-4 lg:w-1/4 md:w-1/2">
                <div className="h-full flex flex-col items-center text-center">
                  <div className="w-full">
                    <h2
                      className="title-font font-bold text-lg text-teal-500"
                      onMouseEnter={() => handleHover(team3)}
                      onMouseLeave={() => handleHover("")}
                    >
                      Hyacinth Ashley Radovan
                    </h2>
                    <h3 className="text-gray-500">
                      Sales & Business Dev Manager
                    </h3>
                    <p className="mb-4 text-[13px]">
                      Drives growth through strategic sales and client
                      partnerships.
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <a href="mailto:example@example.com">
                      <FaEnvelope className="text-teal-600" />
                    </a>
                    <a href="https://www.linkedin.com">
                      <FaLinkedin className="text-teal-600" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-4 lg:w-1/4 md:w-1/2">
                <div className="h-full flex flex-col items-center text-center">
                  <div className="w-full">
                    <h2
                      className="title-font font-bold text-lg text-teal-500"
                      onMouseEnter={() => handleHover(team4)}
                      onMouseLeave={() => handleHover("")}
                    >
                      Patricia Anne Sugapong
                    </h2>
                    <h3 className="text-gray-500">Technical Lead</h3>
                    <p className="mb-4 text-[13px]">
                      Guides development and innovation for Shadala's
                      application and website.
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <a href="mailto:example@example.com">
                      <FaEnvelope className="text-teal-600" />
                    </a>
                    <a href="https://www.linkedin.com">
                      <FaLinkedin className="text-teal-600" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-4 lg:w-1/4 md:w-1/2">
                <div className="h-full flex flex-col items-center text-center">
                  <div className="w-full">
                    <h2
                      className="title-font font-bold text-lg text-teal-500"
                      onMouseEnter={() => handleHover(team2)}
                      onMouseLeave={() => handleHover("")}
                    >
                      Marie Bernadette Gerali
                    </h2>
                    <h3 className="text-gray-500">Logistic Coordinator</h3>
                    <p className="mb-4 text-[13px]">
                      Coordinates shipments and routes, ensuring timely and
                      efficient delivery.
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <a href="mailto:example@example.com">
                      <FaEnvelope className="text-teal-600" />
                    </a>
                    <a href="https://www.facebook.com">
                      <FaFacebookSquare className="text-teal-600" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-4 lg:w-1/4 md:w-1/2">
                <div className="h-full flex flex-col items-center text-center">
                  <div className="w-full">
                    <h2
                      className="title-font font-bold text-lg text-teal-500"
                      onMouseEnter={() => handleHover(team1)}
                      onMouseLeave={() => handleHover("")}
                    >
                      Stefano Franco Medina
                    </h2>
                    <h3 className="text-gray-500">Operations Manager </h3>
                    <p className="mb-4 text-[13px]">
                      Manages daily logistics operations for optimal efficiency
                      and performance.
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <a href="mailto:example@example.com">
                      <FaEnvelope className="text-teal-600" />
                    </a>
                    <a href="https://www.facebook.com">
                      <FaFacebookSquare className="text-teal-600" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="careers">
          <div className="container px-5 pt-10 mx-auto font-Montserrat sm:grid">
            <div className="text-center">
              <h1 className="text-[#131313] font-bold text-3xl pb-2">
                And There's More - the Heart and Soul of Shadala
              </h1>
              <p className="font-semibold text-[15px] mb-5">
                Behind every successful delivery is a team dedicated to
                excellence. Our hub administrators and riders go beyond
                logistics – they infuse life into every parcel's journey.
              </p>
            </div>
            <div className="lg:grid lg:grid-cols-2 gap-4">
              <img
                className="h-100 object-cover"
                src={image2}
                alt="Left Image"
              />
              <img
                className="lg:mt-10 mt-5 sm:mt-5 object-cover"
                src={image3}
                alt="Right Image"
              />
            </div>
          </div>
        </section>

        <div className="container mx-auto flex px-5 py-5 md:flex-row flex-col items-center font-Montserrat">
          <div className="md:w-1/2 mb-10 md:mb-0 lg:mt-[-80px]">
            <img className="object-center rounded" alt="hero" src={image1} />
          </div>
          <div className="lg:flex-grow md:w-1/2 md:pl-16 flex flex-col lg:ml-[-50px] md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900">
              Be Part of the Shadala Story –{" "}
              <br className="hidden lg:inline-block" />
              Join Our Team!
            </h1>
            <p className="leading-relaxed font-semibold text-[#131313] sm: mb-3">
              We're not just delivering parcels; we're crafting experiences. If
              you're passionate, agile, and ready to add your touch to every
              delivery, we invite you to be part of our Shadala family.
              Together, let's redefine the logistics journey and turn every
              shipment into a tale of excellence.
            </p>
            <div className="flex justify-start">
              <a href="/signup">
                <button
                  type="button"
                  className="text-white bg-[#10969f] hover:bg-[#20848b] rounded-[20px] px-5 py-2.5 dark:bg-[#10969F] darkhover:bg-[#20848b] focus:outline-none font-bold"
                >
                  <span className="flex items-center font-bold ">
                    <RiFileUserFill className="mr-1" />
                    Apply Now
                  </span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Content;
