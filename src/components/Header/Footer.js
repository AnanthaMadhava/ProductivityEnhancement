import React from 'react';
import { HeaderLogo } from '../uri/icons';

const Footer = () => {
    return (
        <footer className="bck_blue">
            <div className="footer_logo">
                <HeaderLogo 
                    link={true}
                    linkTo="/Learner"
                    width='150px'
                    height='55px'
                />
            </div>
            <div className="footer_discl">
                Aroha &copy; 2019
            </div>
        </footer>
    );
};

export default Footer;