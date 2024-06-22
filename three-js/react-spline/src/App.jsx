import React from "react";
import { Spline } from "@splinetool/react-spline";

const App = () => {
  const sceneUrl =
    "https://prod.spline.design/WNmhHpS4PLU16Rji/scene.splinecode";

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Navbar */}
      <header className="navbar px-8 py-4 w-full flex justify-between items-center absolute top-0 z-10">
        <div className="nav-menu flex gap-8">
          <a href="#" className="text-white text-sm">
            Home
          </a>
          <a href="#" className="text-white text-sm">
            Courses
          </a>
          <a href="#" className="text-white text-sm">
            Library
          </a>
          <a href="#" className="text-white text-sm">
            Resources
          </a>
        </div>
        <button className="nav-button text-white text-sm py-2 px-4 border-2 border-white rounded-full hover:bg-white hover:bg-opacity-10">
          Let's Talk
        </button>
      </header>

      {/* Spline Viewer */}
      <main className="container flex-1 flex justify-center items-center w-full h-full relative">
        <Spline scene={sceneUrl} />
      </main>

      {/* Bottom Left Section */}
      <section className="bottom-left absolute bottom-10 left-10 z-10 text-white">
        <h1 className="text-5xl font-semibold leading-tight mb-4">
          We're building
          <br />
          Cool Experience
        </h1>
        <p className="text-base font-medium">
          WEB3 \ MOTION \ 3D \ INTERACTIVE \ DESIGN \ CODE
        </p>
      </section>

      {/* Bottom Right Section */}
      <section className="bottom-right absolute bottom-10 right-10 z-10 text-white text-left">
        <p className="text-2xl font-medium mb-4">
          Crafting Awesome Stories and Clean <br /> Design to Make Brand Stand
          Out
        </p>
        <div className="buttons flex gap-4">
          <button className="text-white text-sm py-2 px-4 border-2 border-white rounded-full hover:bg-white hover:bg-opacity-10">
            Learn More
          </button>
          <button className="text-white text-sm py-2 px-4 border-2 border-white rounded-full hover:bg-white hover:bg-opacity-10">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default App;
