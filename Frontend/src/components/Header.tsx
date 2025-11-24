
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";

import "./header.css";

const Header = () => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-blue-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="logo-container flex items-center gap-4">
            <div className="logo ">
              <div className="drone-glow rounded-xl animate-pulse-slow ">
                <div className="flex justify-center items-center">
                  <MdOutlineOndemandVideo className="text-6xl" />
                </div>
              </div>
            </div>

            <div className="h2">
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Video Streaming Dashboard
              </p>
            </div>
          </div>
          <div className="status-container items-center flex justify-between gap-4">
            <div className="child-1">
              <div className="flex items-center gap-2">
                <FaGithub className="text-green-500 text-3xl " />
                <a
                  href=""
                  className="text-sm text-slate-300 transition-all duration-300 hover:semi-bold hover:text-white hover:scale-105"
                >
                  Github Repo
                </a>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
