import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import classnames from 'classnames';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { learnerDetails } from '../../redux/actions/detailsActions';
import { addLearnerOrMentor } from '../../redux/actions/addlistActions';
// import TableList from './tableData/TableList';
import axios from 'axios';

class Learner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            editIdx: -1,
            name: '',
            email: '',
            password: '',
            phone: '',
            alternatePhone: '',
            primarySkills: '',
            secondarySkills: '',
            address: '',
            doj: '',
            soe: 'Portal',
            reference: false,
            refferal: '',
            nameError: '',
            emailError: '',
            passwordError: '',
            phoneError: '',
            // alternatePhoneError: '',
            primarySkillsError: '',
            secondarySkillsError: '',
            addressError: '',
            dojError: '',
            refferalError: '',
            inputAddLearner: false,
            userRole : '',
            emailValidation: false,
            emailInValidation: true
        };
        //this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        const { roles } = this.props.auth.user;
        if(roles){
            this.setState({
                userRole : roles[0].authority
            })
        }
        this.props.learnerDetails();
    }

    componentWillReceiveProps(nextProps) {
        const { roles } = nextProps.auth.user;
        if(roles){
            if(roles[0].authority === 'ROLE_USER'){
                this.props.history.push('/databaseType')
            }
        }
        const { learnerDetails } = nextProps.details;
        if(learnerDetails != null){
            // console.log(learnerDetails)
            this.setState({
                data: [...learnerDetails]
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

    reference = e => {
        //console.log(e.target.value);
        if(e.target.value === "Reference"){
            this.setState({
                soe: e.target.value,
                reference: true
            });
        } else if(e.target.value === "Portal"){
            this.setState({
                soe: e.target.value,
                reference: false,
                refferal: ''
            });
        }
    }

    validate = () => {
        let isError = false;

        const errors = {
            nameError: '',
            emailError: '',
            passwordError: '',
            phoneError: '',
            // alternatePhoneError: '',
            primarySkillsError: '',
            secondarySkillsError: '',
            addressError: '',
            dojError: '',
            refferalError: ''
        };

        if(this.state.name.length < 5) {
            isError = true;
            errors.nameError = 'Username needs to be atleast 5 characters';
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
        
        
        // if(this.state.alternatePhone.length < 10 || this.state.phone.length > 10) {
        //     isError = true;
        //     errors.alternatePhoneError = 'Alternate Phone number should be only 10 numbers';
        // }

        if(this.state.primarySkills === '') {
            isError = true;
            errors.primarySkillsError = 'Primary Skills should not be Empty';
        }

        if(this.state.secondarySkills === '') {
            isError = true;
            errors.secondarySkillsError = 'Secondary Skills should not be Empty';
        }

        if(this.state.address === '') {
            isError = true;
            errors.addressError = 'Address should not be empty';
        } else if(this.state.address.length < 15) {
            isError = true;
            errors.addressError = 'Address is too small';
        }

        if(this.state.doj === '') {
            isError = true;
            errors.dojError = 'DOJ should not be empty';
        }

        if(this.state.soe === 'Reference') {
            if(this.state.refferal === '') {
                isError = true;
                errors.refferalError = 'Enter the Reference Person Name';
            }
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
            let ref = null;
            if(this.state.soe === "Portal"){
                ref = null;
            } else {
                ref = this.state.refferal;
            }
            const learnerSignup = {
                name : this.state.name,
                email : this.state.email,
                userType: "learner",
                phoneNo : this.state.phone,
                altPhoneNo : this.state.alternatePhone,
                primarySkills : this.state.primarySkills,
                secondarySkills : this.state.secondarySkills,
                address : this.state.address,
                dateOfJoin : this.state.doj,
                soe : this.state.soe,
                soeRef : ref,
                password : this.state.password
            }
            // console.log(learnerSignup);
            this.props.addLearnerOrMentor(learnerSignup,this.props.history);

            this.setState ({
                name: '',
                email: '',
                password: '',
                phone: '',
                alternatePhone: '',
                primarySkills: '',
                secondarySkills: '',
                address: '',
                doj: '',
                refferal: ''
            })
        }
    }

    number = e => {
        const num = String.fromCharCode(e.which);

        if(!(/[0-9]/.test(num))) {
            e.preventDefault();
        }
    }

    inputAddLearner = () => {
        if(this.state.inputAddLearner === false){
            this.setState({
                inputAddLearner: true
            })
        } else if(this.state.inputAddLearner === true){
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
                name: "altPhoneNo",
                label: "Alternate Phone",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "primarySkills",
                label: "Primary Skills",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "secondarySkills",
                label: "Secondary Skills",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "address",
                label: "Primary Skills",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "dateOfJoin",
                label: "DOJ",
                options: {
                    filter: true,
                    sort: false,
                }
            }
        ];
            
        const data = this.state.data;
        
        const options = {
            filterType: 'checkbox',
            responsive: 'scroll'
        };

        const leatnerTable = (
            <div className="container-fluid" 
                style={{
                    marginTop: '80px', 
                    marginBottom: "0",
                    height: this.state.inputAddLearner ? "auto" : "70.5vh"}}
            >
                <div className="row justify-content-end addlist_form_heading">
                    {/* <div className="col-6 addlist_heading">
                        Learner Data
                    </div> */}
                    <div className="col-1 addlist-addNew_Learner">
                        <div className="addNew_Learner" onClick={this.inputAddLearner}>
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
                /> */}
                <MUIDataTable
                    title={"Learner Data"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </div>
        )

        const addLearner = (
            <div className="container" 
                style={{
                    marginTop: this.state.inputAddLearner ? "10px" : "80px",
                    height: "100vh"
                }}
            >
                <div className="addlist_heading" 
                    style={{
                        marginBottom: "20px", 
                        textAlign: "center"
                    }}
                >
                    Add Learner
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
                        <div className="form-group col-md-4">
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
                            <label for="inputAlternatePhone">Alternate Ph.No</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="alternatePhone" 
                                value={this.state.alternatePhone} 
                                onKeyPress={e => this.number(e)} 
                                onChange={this.formhandleChange} 
                                placeholder="Alternate Phone Number" 
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label for="inputPrimarySkills">Primary Skills</label>
                            <input 
                                type="text" 
                                className={classnames('form-control', {
                                    'is-invalid': this.state.primarySkillsError
                                })}
                                name="primarySkills" 
                                value={this.state.primarySkills} 
                                onChange={this.formhandleChange} 
                                placeholder="Primary Skills" 
                            />
                            {this.state.primarySkillsError && (
                                <div className="invalid-feedback">{this.state.primarySkillsError}</div>
                            )}
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label for="inputSecondarySkills">Secondary Skills</label>
                            <input 
                                type="text" 
                                className={classnames('form-control', {
                                    'is-invalid': this.state.secondarySkillsError
                                })}
                                name="secondarySkills" 
                                value={this.state.secondarySkills} 
                                onChange={this.formhandleChange} 
                                placeholder="Secondary Skills" 
                            />
                            {this.state.secondarySkillsError && (
                                <div className="invalid-feedback">{this.state.secondarySkillsError}</div>
                            )}
                        </div>
                        <div className="form-group col-md-4">
                            <label for="inputAddress">Address</label>
                            <textarea 
                                type="text" 
                                className={classnames('form-control', {
                                    'is-invalid': this.state.addressError
                                })}
                                name="address" 
                                rows="1"
                                value={this.state.address} 
                                onChange={this.formhandleChange} 
                                placeholder="Address.." 
                            />
                            {this.state.addressError && (
                                <div className="invalid-feedback">{this.state.addressError}</div>
                            )}
                        </div>
                        <div className="form-group col-md-4">
                            <label for="inputDOJ">DOJ</label>
                            <input 
                                type="date" 
                                className={classnames('form-control', {
                                    'is-invalid': this.state.dojError
                                })}
                                name="doj" 
                                value={this.state.doj} 
                                onChange={this.formhandleChange} 
                                placeholder="Enter Your DOJ" 
                            />
                            {this.state.dojError && (
                                <div className="invalid-feedback">{this.state.dojError}</div>
                            )}
                        </div> 
                    </div>
                    <div className="form-row">   
                        <div className="form-group col-md-4">
                            <label for="inputSOE">SOE</label>
                            <select className="form-control" name="soe" onChange={e => this.reference(e)}>
                                <option selected>Choose...</option>
                                <option value="Portal">Portal</option>
                                <option value="Reference">Reference</option>
                            </select>
                        </div>
                        <div className="form-group col-md-4"
                            style={{
                                display: this.state.reference ? 'inline': 'none'
                            }}
                        >
                            <label for="inputRefferalName">Refferal Name</label>
                            <input 
                                type="text" 
                                className={classnames('form-control', {
                                    'is-invalid': this.state.refferalError
                                })}
                                name="refferal" 
                                value={this.state.refferal} 
                                onChange={this.formhandleChange} 
                                placeholder="Enter Your Refferal Name" 
                            />
                            {this.state.refferalError && (
                                <div className="invalid-feedback">{this.state.refferalError}</div>
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
                            {leatnerTable}
                            {
                                this.state.inputAddLearner ?
                                addLearner
                                :
                                null
                            }
                        </div>
                    )
                    :
                    addLearner
                }
            </div>
        );
    }
}

Learner.propTypes = {
    learnerDetails: PropTypes.func.isRequired,
    addLearnerOrMentor: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    details: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    details: state.details
});

export default connect(mapStateToProps, { learnerDetails, addLearnerOrMentor })(Learner);