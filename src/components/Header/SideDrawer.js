import React, { Component } from 'react';
import {scroller} from 'react-scroll';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'; 
import ListItemText from '@material-ui/core/ListItemText'; 
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';

class SideDrawer extends Component {

    state = {
        userRole : ''
    }

    componentDidMount() {
        const { roles } = this.props.auth.user;
        if(roles){
            this.setState({
                userRole : roles[0].authority
            })
        }
    }

    scrollToElement = () => {
        scroller.scrollTo({
            duration: 1500,
            delay: 1000,
            smooth: true,
            offset: -150
        });
        this.props.onClose(false)
    }

    onLogoutClick = () => {
        this.props.logoutUser();
        this.props.history.push('/');
    }

    render() {

        const Admin = (
            <List component="nav">
                <ListItem button component={Link} to="/pickLearner" onClick={this.scrollToElement}>
                    <ListItemText primary="Verify SQL" />
                </ListItem>
                <ListItem button component={Link} to="/databaseType" onClick={this.scrollToElement}>
                    <ListItemText primary="Execute SQL" />
                </ListItem>
                <ListItem button component={Link} to="/Mentor" onClick={this.scrollToElement}>
                    <ListItemText primary="Mentor" />
                </ListItem>
                <ListItem button component={Link} to="/Learner" onClick={this.scrollToElement}>
                    <ListItemText primary="Learner" />
                </ListItem>
                <ListItem button component={Link} to="/Database" onClick={this.scrollToElement}>
                    <ListItemText primary="DB-Config" />
                </ListItem>
                <ListItem button  onClick={this.onLogoutClick} >
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        )
    
        const Learner = (
            <List component="nav">
                <ListItem button component={Link} to="/databaseType" onClick={this.scrollToElement}>
                    <ListItemText primary="Execute SQL" />
                </ListItem>
                {/* <ListItem button component={Link} to="/Learner" onClick={this.scrollToElement}>
                    <ListItemText primary="Learner" />
                </ListItem> */}
                <ListItem button component={Link} to="/Database" onClick={this.scrollToElement}>
                    <ListItemText primary="DB-Config" />
                </ListItem>
                <ListItem button  onClick={this.onLogoutClick} >
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        )
    
        const Mentor = (
            <List component="nav">
                <ListItem button component={Link} to="/pickLearner" onClick={this.scrollToElement}>
                    <ListItemText primary="Verify SQL" />
                </ListItem>
                <ListItem button component={Link} to="/databaseType" onClick={this.scrollToElement}>
                    <ListItemText primary="Execute SQL" />
                </ListItem>
                <ListItem button component={Link} to="/Mentor" onClick={this.scrollToElement}>
                    <ListItemText primary="Mentor" />
                </ListItem>
                <ListItem button component={Link} to="/Learner" onClick={this.scrollToElement}>
                    <ListItemText primary="Learner" />
                </ListItem>
                <ListItem button component={Link} to="/Database" onClick={this.scrollToElement}>
                    <ListItemText primary="DB-Config" />
                </ListItem>
                <ListItem button  onClick={this.onLogoutClick} >
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        )

        return (
            <Drawer
                anchor = "right"
                open = {this.props.open}
                onClose = {() => this.props.onClose(false)}
            >   
                {
                    this.state.userRole === 'ROLE_USER' ?
                    Learner
                    :
                    this.state.userRole === 'ROLE_MENTOR' ?
                    Mentor
                    :
                    this.state.userRole === 'ROLE_ADMIN' ?
                    Admin
                    :
                    null
                }
                            
            </Drawer>
        );
    }
}

SideDrawer.propTypes = {
    logoutUser : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(SideDrawer));