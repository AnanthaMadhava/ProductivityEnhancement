import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DataType from './DataType';
// import DataTypeQuery from './DataTypeQuery';

class DatabaseType extends Component {

    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div>
                <DataType />
                {/* <DataTypeQuery /> */}
            </div>
        );
    }
}

DatabaseType.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(DatabaseType);