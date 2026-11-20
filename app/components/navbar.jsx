// @flow strict
"use client";

import Link from "next/link";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="site-nav">
      <div className="flex items-center justify-between py-5">

        <div className="flex items-center">
          <Link href="/" className="site-brand flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-9 w-9 object-cover"
            />
            <p>Narayana Murthy</p>
          </Link>
        </div>



        <button
          className="block md:hidden text-[#70e1c1] font-bold focus:outline-none text-2xl"
          onClick={toggleMenu}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>

        <ul className="nav-links hidden md:flex md:flex-row md:space-x-1">
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#about">
              <div>ABOUT</div>
            </Link>
          </li>
         
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#skills">
              <div>SKILLS</div>
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#projects">
              <div>PROJECTS</div>
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#education">
              <div>EDUCATION</div>
            </Link>
          </li>

          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#contact">
              <div>CONTACT</div>
            </Link>
          </li>
        </ul>
      </div>

      {menuOpen && (
        <div className="mobile-menu fixed inset-0 flex flex-col items-center justify-center topOfAll">
          <button
            className="absolute top-5 right-5 text-[#70e1c1] font-bold text-3xl focus:outline-none"
            onClick={toggleMenu}
          >
            &times;
          </button>
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <Link
                className="text-[#edf3fa] text-2xl font-semibold no-underline outline-none hover:text-[#70e1c1] hover:no-underline"
                href="/#about"
                onClick={closeMenu}
              >
                ABOUT
              </Link>
            </li>
            <li>
              <Link
                className="text-[#edf3fa] text-2xl font-semibold no-underline outline-none hover:text-[#70e1c1] hover:no-underline"
                href="/#experience"
                onClick={closeMenu}
              >
                EXPERIENCE
              </Link>
            </li>
            <li>
              <Link
                className="text-[#edf3fa] text-2xl font-semibold no-underline outline-none hover:text-[#70e1c1] hover:no-underline"
                href="/#skills"
                onClick={closeMenu}
              >
                SKILLS
              </Link>
            </li>
            <li>
              <Link
                className="text-[#edf3fa] text-2xl font-semibold no-underline outline-none hover:text-[#70e1c1] hover:no-underline"
                href="/#projects"
                onClick={closeMenu}
              >
                PROJECTS
              </Link>
            </li>
            <li>
              <Link
                className="text-[#edf3fa] text-2xl font-semibold no-underline outline-none hover:text-[#70e1c1] hover:no-underline"
                href="/#education"
                onClick={closeMenu}
              >
                EDUCATION
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
