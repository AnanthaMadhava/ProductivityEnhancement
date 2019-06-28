import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import classnames from 'classnames';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { mentorDetails } from '../../redux/actions/detailsActions';
import { addLearnerOrMentor } from '../../redux/actions/addlistActions';
// import TableList from './tableData/TableList';
import axios from 'axios';

class LearnerData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            phone: '',
            address: '',
            technology: '',
            nameError: '',
            emailError: '',
            phoneError: '',
            addressError: '',
            technologyError: '',
            data: [],
            editIdx: -1,
            inputAddMentor: false,
            emailValidation: false,
            emailInValidation: true
        }
    }

    componentDidMount(){
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/')
        }
        this.props.mentorDetails();
    }

    componentWillReceiveProps(nextProps) {
        const { roles } = nextProps.auth.user;
        if(roles){
            if(roles[0].authority === 'ROLE_USER'){
                this.props.history.push('/')
            }
        }
        const { mentorDetails } = nextProps.details;
        if(mentorDetails != null){
            // console.log(mentorDetails)
            this.setState({
                data: [...mentorDetails]
            })
        }
    }

    formhandleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
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

    number = e => {
        const num = String.fromCharCode(e.which);

        if(!(/[0-9]/.test(num))) {
            e.preventDefault();
        }
    }

    validate = () => {
        let isError = false;

        const errors = {
            nameError: '',
            emailError: '',
            passwordError: '',
            phoneError: '',
            addressError: '',
            technologyError: ''
        };

        if(this.state.name.length < 5) {
            isError = true;
            errors.nameError = 'Name needs to be atleast 5 characters';
        }

        if(!this.state.email.includes("@")) {
            isError = true;
            errors.emailError= "Requires Valid Email";
        }

        if(this.state.password === ''){
            isError = true;
            errors.passwordError= "Enter Your Password";
        }

        if(this.state.phone.length < 10 || this.state.phone.length > 10) {
            isError = true;
            errors.phoneError = 'Phone number should be only 10 numbers';
        }

        if(this.state.address === '') {
            isError = true;
            errors.addressError = 'Address should not be empty';
        } else if(this.state.address.length < 15) {
            isError = true;
            errors.addressError = 'Address is too small';
        }

        if(this.state.technology === '') {
            isError = true;
            errors.technologyError = 'Technology should not be Empty';
        }

        this.setState({
        ...this.state,
        ...errors
        });

        return isError;
    }

    handleSubmit = e => {
        e.preventDefault();

        const err = this.validate();
        if(!err) {
            const MentorSignup = {
                name: this.state.name,
                email : this.state.email,
                userType : "mentor",
                phoneNo : this.state.phone,
                address : this.state.address,
                primarySkills : this.state.technology,
                password : this.state.password
            }
            // console.log(MentorSignup);
            this.props.addLearnerOrMentor(MentorSignup);

            this.setState({
                name: '',
                email: '',
                password: '',
                phone: '',
                address: '',
                technology: ''
            })
        }
    }

    inputAddMentor = () => {
        if(this.state.inputAddMentor === false){
            this.setState({
                inputAddMentor: true
            })
        } else if(this.state.inputAddMentor === true){
            // this.setState({
            //     inputAddLearner: false
            // })
        }
    }

    emailValidation = e => {
        // console.log(e.target.value);
        if(this.state.email.includes("@")) {
            const Email_Id = e.target.value
            axios.get(`/user/checkEmailAvailability?email=${Email_Id}`)
                .then(res => {
                    console.log(res.data.available)
                    this.setState({
                        emailValidation : res.data.available
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    emailInValidation = e => {
        // console.log(e.target.value);
        if(this.state.email.includes("@")) {
            const Email_Id = e.target.value
            axios.get(`/user/checkEmailAvailability?email=${Email_Id}`)
                .then(res => {
                    console.log(res.data.available)
                    this.setState({
                        emailInValidation : res.data.available
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    render() {

        const columns = [
            {
                name: "id",
                label: "Id",
                options: {
                filter: true,
                sort: true,
                }
            },
            {
                name: "name",
                label: "Name",
                options: {
                filter: true,
                sort: false,
                }
            },
            {
                name: "email",
                label: "Email",
                options: {
                filter: true,
                sort: false,
                }
            },
            {
                name: "phoneNo",
                label: "Phone",
                options: {
                filter: true,
                sort: false,
                }
            },
            {
                name: "primarySkills",
                label: "Technology",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "address",
                label: "Address",
                options: {
                    filter: true,
                    sort: false,
                }
            }
        ];
            
        const data = this.state.data;
        
        const options = {
            filterType: 'checkbox',
            responsive: 'scroll',
            serverSide: true,
            onTableChange: (action, tableState) => {
                console.log(action);
                console.log(tableState);
                // this.xhrRequest('my.api.com/tableData', result => {
                //     this.setState({ data: result });
                // });
            }
        };

        const mentorTable = (
            <div className="container-fluid" 
                style={{
                    marginTop: '80px', 
                    marginBottom: "0",
                    height: this.state.inputAddMentor ? "auto" : "70.5vh"
                }}
            >
                <div className="row justify-content-end addlist_form_heading">
                    {/* <div className="col-6 addlist_heading">
                        Mentor Data
                    </div> */}
                    <div className="col-1 addlist-addNew_Learner">
                        <div className="addNew_Learner" onClick={this.inputAddMentor}>
                            Add New
                        </div>
                    </div>
                </div>
                {/* <TableList
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
                /> */}
                <MUIDataTable
                    title={"Mentor Data"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </div>
        )

        const addMentor = (
            <div className="container" 
                style={{
                    marginTop: this.state.inputAddMentor ? "10px" : "80px",
                    height: "60vh"
                }}
            >
                <div className="addlist_heading" 
                    style={{
                        marginBottom: "20px", 
                        textAlign: "center"
                    }}
                >
                    Add Mentor
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label for="inputName4">Name</label>
                            <input 
                                type="text" 
                                className={classnames('form-control', {
                                    'is-invalid': this.state.nameError
                                })}
                                name="name" 
                                value={this.state.name} 
                                onChange={this.formhandleChange}  
                                placeholder="Enter Your Name" 
                            />
                            {this.state.nameError && (
                                <div className="invalid-feedback">{this.state.nameError}</div>
                            )}
                        </div>
                        <div className="form-group col-md-4">
                            <label for="inputEmail4">Email</label>
                            <input 
                                type="email" 
                                className={classnames('form-control', {
                                    'is-invalid': this.state.emailError
                                },
                                {
                                    'is-valid': this.state.emailValidation
                                },
                                {
                                    'is-invalid': !this.state.emailInValidation
                                })}
                                name="email" 
                                value={this.state.email} 
                                onChange={this.formhandleChange} 
                                onBlur={e => this.emailValidation(e)}
                                onKeyDown={e => this.emailInValidation(e)}
                                placeholder="Enter Your Email" 
                            />
                            {
                                this.state.emailValidation ?
                                    <div className="valid-feedback">Email_Id Available</div>
                                : this.state.emailError ?
                                    <div className="invalid-feedback">{this.state.emailError}</div>
                                : !this.state.emailInValidation ?
                                    <div className="invalid-feedback">Email_Id already in Use</div>
                                :
                                null
                            }
                        </div>
                        <div class="form-group col-md-4">
                            <label for="inputPassword4">Password</label>
                            <input 
                                type="password" 
                                className={classnames('form-control', {
                                    'is-invalid': this.state.passwordError
                                })}
                                name="password"
                                value={this.state.password} 
                                onChange={this.formhandleChange}
                                placeholder="Password" 
                            />
                            {this.state.passwordError && (
                                <div className="invalid-feedback">{this.state.passwordError}</div>
                            )}
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label for="inputPhone">PhoneNo</label>
                            <input 
                                type="text" 
                                className={classnames('form-control', {
                                    'is-invalid': this.state.phoneError
                                })} 
                                name="phone" 
                                value={this.state.phone} 
                                onKeyPress={e => this.number(e)} 
                                onChange={this.formhandleChange} 
                                placeholder="Phone Number" 
                            />
                            {this.state.phoneError && (
                                <div className="invalid-feedback">{this.state.phoneError}</div>
                            )}
                        </div>
                        <div className="form-group col-md-4">
                            <label for="inputAddress">Address</label>
                            <input 
                                type="text" 
                                className={classnames('form-control', {
                                    'is-invalid': this.state.addressError
                                })} 
                                name="address" 
                                value={this.state.address} 
                                onChange={this.formhandleChange}
                                placeholder="Address.." 
                            />
                            {this.state.addressError && (
                                <div className="invalid-feedback">{this.state.addressError}</div>
                            )}
                        </div>
                        <div className="form-group col-md-4">
                            <label for="inputTechnology">Technology</label>
                            <input 
                                type="text" 
                                className={classnames('form-control', {
                                    'is-invalid': this.state.technologyError
                                })}
                                name="technology" 
                                value={this.state.technology} 
                                onChange={this.formhandleChange} 
                                placeholder="Technology"
                            />
                            {this.state.technologyError && (
                                <div className="invalid-feedback">{this.state.technologyError}</div>
                            )}
                        </div>
                    </div>
                    <div className="form-row float-right">
                        <input type="submit" value="Submit" />
                        <input type="reset" value="Cancel" />
                    </div>
                </form>
            </div>
        )

        return (
            <div>
                {
                    this.props.auth.isAuthenticated ?
                    (
                        <div>
                            {mentorTable}
                            {
                                this.state.inputAddMentor ?
                                addMentor
                                :
                                null
                            }
                        </div>
                    )
                    :
                    addMentor
                }
            </div>
        );
    }
}

LearnerData.propTypes = {
    mentorDetails: PropTypes.func.isRequired,
    addLearnerOrMentor: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    details: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    details: state.details
});

export default connect(mapStateToProps, { mentorDetails, addLearnerOrMentor })(LearnerData);