import React from "react";

function Footer() {

  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="footer">
      <p className="footer__text">&copy; {`${year}`} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
