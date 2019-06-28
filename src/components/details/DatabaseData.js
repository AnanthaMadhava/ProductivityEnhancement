import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { databaseDetails } from '../../redux/actions/detailsActions';
import TableList from './tableData/TableList';

class DatabaseData extends Component {

    state = {
        data: [],
        editIdx: -1
    }

    componentDidMount() {
        this.props.databaseDetails();
    }

    componentWillReceiveProps(nextProps) {
        const { databaseDetails } = nextProps.details;
        if(databaseDetails != null){
            // console.log(databaseDetails)
            this.setState({
                data: [...databaseDetails]
            })
        }
    }

    handleRemove = (i) => {
        this.setState(state => ({
            data: state.data.filter((x, j) => j !== i),
        }));
    }

    startEditing = i => {
        this.setState({ 
            editIdx: i 
        });
    }

    stopEditing = () => {
        this.setState({ 
            editIdx: -1 
        });
    }

    handleChange = (e, name, i) => {
        const { value } = e.target;
        this.setState(state => ({
            data: state.data.map(
            (row, j) => (j === i ? { ...row, [name]: value } : row)
            )
        }));
    }

    render() {
        return (
            <div className="container-fluid" style={{marginTop: '70px'}}>
                <div  className="addlist_form_heading">Database Data</div>
                <TableList
                    startEditing={this.startEditing}
                    handleRemove={this.handleRemove}
                    editIdx={this.state.editIdx}
                    handleChange={this.handleChange}
                    stopEditing={this.stopEditing}
                    data={this.state.data}
                    header={[
                        {
                            name: "Id",
                            prop: "id"
                        },
                        {
                            name: "RDBMS",
                            prop: "dbType"
                        },
                        {
                            name: "DB Name",
                            prop: "dbName"
                        },
                        {
                            name: "HostName / IP ADDRESS",
                            prop: "ipAddress"
                        },
                        {
                            name: "Port Number",
                            prop: "portNo"
                        },
                        {
                            name: "Scheme Name",
                            prop: "schemaName"
                        },
                        {
                            name: "Username",
                            prop: "userName"
                        }
                    ]}
                />
            </div>
        );
    }
}

DatabaseData.propTypes = {
    databaseDetails: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    details: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    details: state.details
});

export default connect(mapStateToProps, { databaseDetails })(DatabaseData);