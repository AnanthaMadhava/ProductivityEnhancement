import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelectLearner from './SelectLearner';
// import LearnerQuery from './LearnerQuery';

class PickLearner extends Component {

    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div>
                <SelectLearner />
                {/* <LearnerQuery/> */}
            </div>
        );
    }
}

PickLearner.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PickLearner);