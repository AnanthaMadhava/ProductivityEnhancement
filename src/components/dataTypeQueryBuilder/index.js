import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DataTypeQuery from './DataTypeQuery';
import DataTypeQuery1 from './DataTypeQuery1';

class DataTypeQueryBuilder extends Component {

    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div>
                <DataTypeQuery />
                {/* <DataTypeQuery1 /> */}
            </div>
        );
    }
}

DataTypeQueryBuilder.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(DataTypeQueryBuilder);