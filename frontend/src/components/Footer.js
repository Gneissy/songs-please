import React from "react";
import "./Footer.css";

function Footer(){

    return(
        <footer id= "footer" className="footer">
            <div className="container flex-box-column">
                <div className="footer-links flex-box-row">
                    <a target="_blank" href="https://www.linkedin.com/in/ahmetserteser/"> <i className="footer-contact-nav fa-contact fa-brands fa-linkedin fa-3x" ></i></a>
                    <a target="_blank" href="https://github.com/Gneissy"> <i className="footer-contact-nav fa-contact fa-brands fa-github fa-3x" ></i></a>
                    <a target="_blank" href="https://www.instagram.com/ahmetsrtsr"> <i className="footer-contact-nav fa-contact fa-brands fa-instagram fa-3x" ></i></a>
                </div>
                <div className="footer-text-box flex-box-row">
                    <p className="footer-text">© 2023 April by Ahmet Serteser. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );

}
export default Footer;
