import React from "react";
import "./styles/Navbar.css";

function Navbar(){

    // Scroll Sensitive Navbar
    const onScroll = function(event) {

    // Get exact number of pixels that an element's content is scrolled vertically
    const scrollPosition = event.target.scrollingElement.scrollTop;

    // Get the nav element
    const nav = document.querySelector("#nav");

    // Add or remove the "scroll-down" class based on the scroll position
    if (scrollPosition > 70) {
        nav.classList.add("scroll-down");
    } else {
        nav.classList.remove("scroll-down");
    }
};

document.addEventListener("scroll", onScroll, { passive: true });

  return (
    <nav id="nav">
        <div className="container navbar-flex">
              <a href = "/" className="main-title">Songs, Please</a>
              <div className="links">
                  <a href="#footer">Contact Me</a>
              </div>
        </div>
    </nav>
  );
}

export default Navbar;
