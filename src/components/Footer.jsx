import { Container } from "react-bootstrap";
import { BiLogoGmail } from "react-icons/bi";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-dark fixed-bottom text-white py-2 mt-auto">
      <Container className="d-flex flex-column gap-2 justify-content-between align-items-center">
        <div className="d-flex align-items-center justify-content-center gap-4">
          <a href="https://github.com/JusmeJr93">
            <FaGithub className="text-white fs-4" />
          </a>
          <a href="https://www.linkedin.com/in/jusmejr93/">
            <FaLinkedin className="text-white fs-4" />
          </a>
          <a href="mailto:junior.jusme@gmail.com">
            <BiLogoGmail className="text-white fs-4" />
          </a>
        </div>
        <p className="mb-0">
          &copy; 2024 AuthMaster by Junior Jusmé. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
