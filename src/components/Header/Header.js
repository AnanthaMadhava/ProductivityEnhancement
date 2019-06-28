import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ToolBar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import { HeaderLogo } from '../uri/icons';
import SideDrawer from './SideDrawer';

class Header extends Component {

    state = {
        drawerOpen: false,
        headerShow: false
    }

    toggleDrawer = (value) => {
        this.setState({
            drawerOpen: value 
        })
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        // console.log(user);
        const userDetails = (
            <div>
                {user.name}
                <IconButton
                    className="menuicon"
                    area-label="Menu"
                    color="inherit"
                    onClick={() => this.toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
                <SideDrawer 
                    open = {this.state.drawerOpen}
                    onClose = {(value) => this.toggleDrawer(value)}
                />
            </div>
        )

        const Login = (
            <Link to="/" 
                style={{
                    color: '#ffffff', 
                    textDecoration: 'none'
                }}
            >
                Login
            </Link>
        )
        return (
            <AppBar
                position = "fixed"
                style = {{
                    backgroundColor: '#1C4366',
                    boxShadow: 'none',
                    borderBottom: '2px solid #00285e'
                }}
            >
                <ToolBar style={{display: 'flex'}}>
                    <div style = {{flexGrow: 1}} >
                        <div className="header_logo">
                            <HeaderLogo 
                                link={true}
                                linkTo="/Learner"
                                width='150px'
                                height='55px'
                            />
                        </div>
                    </div>
                    {
                        isAuthenticated ? 
                        userDetails
                        :
                        Login
                    }
                </ToolBar>
            </AppBar>
        );
    }
}

Header.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Header);