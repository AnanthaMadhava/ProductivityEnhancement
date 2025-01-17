import React from 'react';
import { Link } from 'react-router-dom';

import arohalogo from '../../Resources/images/logo/aroha.png';

export const HeaderLogo = (props) => {

    const template = <div
            className="img_cover"
            style={{
                width: props.width,
                height: props.height,
                background: `url(${arohalogo}) no-repeat`
            }}
        >
        </div>

    if(props.link) {
        return(
            <Link to={props.linkTo} className="link_logo">
                {template}
            </Link>
        )
    } else {
        return template
    }
};