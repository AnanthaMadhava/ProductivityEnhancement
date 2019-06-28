import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { mentorDetails } from '../../redux/actions/detailsActions';
import TableList from './tableData/TableList';
import MentData from './mentor.json';

class LearnerData extends Component {

    state = {
        data: [],
        editIdx: -1
    }

    componentDidMount(){
        this.props.mentorDetails();
    }

    componentWillReceiveProps(nextProps) {
        const { mentorDetails } = nextProps.details;
        if(mentorDetails != null){
            // console.log(mentorDetails)
            this.setState({
                data: [...mentorDetails]
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
                <div  className="addlist_form_heading">Mentor Data</div>
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
                            name: "Technology",
                            prop: "primarySkills"
                        },
                        {
                            name: "Address",
                            prop: "address"
                        }
                    ]}
                />
            </div>
        );
    }
}

LearnerData.propTypes = {
    mentorDetails: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    details: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    details: state.details
});

export default connect(mapStateToProps, { mentorDetails })(LearnerData);