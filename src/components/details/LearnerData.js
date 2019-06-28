import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { learnerDetails } from '../../redux/actions/detailsActions';
import TableList from './tableData/TableList';

class LearnerData extends Component {

    state = {
        data: [],
        editIdx: -1
    }

    componentDidMount(){
        this.props.learnerDetails();
    }

    componentWillReceiveProps(nextProps) {
        const { learnerDetails } = nextProps.details;
        if(learnerDetails != null){
            // console.log(learnerDetails)
            this.setState({
                data: [...learnerDetails]
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
            <div className="container-fluid" style={{marginTop: '100px'}}>
                <div  className="addlist_form_heading">Learner Data</div>
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
                            name: "Name",
                            prop: "name"
                        },
                        {
                            name: "Email",
                            prop: "email"
                        },
                        {
                            name: "Phone",
                            prop: "phoneNo"
                        },
                        {
                            name: "Alternate Phone",
                            prop: "altPhoneNo"
                        },
                        {
                            name: "Primary Skills",
                            prop: "primarySkills"
                        },
                        {
                            name: "Secondary Skills",
                            prop: "secondarySkills"
                        },
                        {
                            name: "Address",
                            prop: "address"
                        },
                        {
                            name: "DOJ",
                            prop: "dateOfJoin"
                        }
                    ]}
                />
            </div>
        );
    }
}

LearnerData.propTypes = {
    learnerDetails: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    details: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    details: state.details
});

export default connect(mapStateToProps, { learnerDetails })(LearnerData);