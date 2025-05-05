import React from 'react';
import './FooterC.css';
import { NavLink } from 'react-router-dom';

const FooterC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <div className="logo">
            <span className="tech">GoMi</span>
            <span className="store">Next</span>
          </div>
        </div>

        <div className="footer-social">
          <h3>Redes</h3>
          <ul>
            <li><NavLink to="*">Facebook</NavLink></li>
            <li><NavLink to="*">Twitter</NavLink></li>
            <li><NavLink t="*">Instagram</NavLink></li>
          </ul>
        </div>

        <div className="footer-legal">
          <h3>Legales</h3>
          <ul>
            <li><NavLink to="*">Términos y condiciones</NavLink></li>
            <li><NavLink to="*">Política de privacidad</NavLink></li>
            <li><NavLink to="*">Aviso legal</NavLink></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default FooterC;