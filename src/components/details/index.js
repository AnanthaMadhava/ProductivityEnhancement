import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LearnerData from './LearnerData';
import MentorData from './MentorData';
import DatabaseData from './DatabaseData';

class Details extends Component {

    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/')
        }
    }
    
    render() {
        return (
            <div>
                <LearnerData/> 
                <MentorData />
                <DatabaseData />
            </div>
        );
    }
}

Details.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Details);