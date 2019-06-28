import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { addLearnerOrMentor } from '../../redux/actions/addlistActions';

class AddLearner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
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
            phoneError: '',
            alternatePhoneError: '',
            primarySkillsError: '',
            secondarySkillsError: '',
            addressError: '',
            dojError: '',
            refferalError: ''
        };
        //this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
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

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
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
            phoneError: '',
            alternatePhoneError: '',
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

        if(this.state.phone.length < 10 || this.state.phone.length > 10) {
            isError = true;
            errors.phoneError = 'Phone number should be only 10 numbers';
        }
        
        
        if(this.state.alternatePhone.length < 10 || this.state.phone.length > 10) {
            isError = true;
            errors.alternatePhoneError = 'Alternate Phone number should be only 10 numbers';
        }

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
                password : "Aroha@123"
            }
            // console.log(learnerSignup);
            this.props.addLearnerOrMentor(learnerSignup,this.props.history);

            this.setState ({
                name: '',
                email: '',
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

    render() {
        return (
            <div className="container" style={{height: "100vh", marginTop: "100px"}}>
                <div className="addlist">
                    <div className="addlist_form_heading">Add Learner</div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="addlist_from">
                            <div className="form-group">
                                <label>Name</label>
                                <br/>
                                <input type="text" name="name" value={this.state.name} onChange={this.handleChange}  placeholder="Enter Your Name" />
                                <div className="error">{this.state.nameError}</div>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <br/>
                                <input type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter Your Email" />
                                <div className="error">{this.state.emailError}</div>
                            </div>
                            <div className="form-group">
                                <label>Phone No</label>
                                <br/>
                                <input type="text" name="phone" value={this.state.phone} onKeyPress={e => this.number(e)} onChange={this.handleChange} placeholder="Phone Number" />
                                <div className="error">{this.state.phoneError}</div>
                            </div>
                            <div className="form-group">
                                <label>Alternate Ph.No</label>
                                <br/>
                                <input type="text" name="alternatePhone" value={this.state.alternatePhone} onKeyPress={e => this.number(e)} onChange={this.handleChange} placeholder="Alternate Phone Number" />
                                <div className="error">{this.state.alternatePhoneError}</div>
                            </div>
                            <div className="form-group">
                                <label>Primary Skills</label>
                                <br/>
                                <input type="text" name="primarySkills" value={this.state.primarySkills} onChange={this.handleChange} placeholder="Primary Skills" />
                                <div className="error">{this.state.primarySkillsError}</div>
                            </div>
                            <div className="form-group">
                                <label>Secondary Skills</label>
                                <br/>
                                <input type="text" name="secondarySkills" value={this.state.secondarySkills} onChange={this.handleChange} placeholder="Secondary Skills" />
                                <div className="error">{this.state.secondarySkillsError}</div>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <br/>
                                <textarea type="text" name="address" value={this.state.address} onChange={this.handleChange} placeholder="Address.." />
                                <div className="error">{this.state.addressError}</div>
                            </div>
                            <div className="form-group">
                                <label>DOJ</label>
                                <br/>
                                <input type="date" name="doj" value={this.state.doj} onChange={this.handleChange} placeholder="Enter Your DOJ" />
                                <div className="error">{this.state.dojError}</div>
                            </div>
                            <div className="form-group">
                                <label>SOE</label>
                                <br/>
                                <select name="soe" onChange={e => this.reference(e)}>
                                    <option value="Portal">Portal</option>
                                    <option value="Reference">Reference</option>
                                </select>
                            </div>
                            <div 
                                className="form-group" 
                                style={{
                                    display: this.state.reference ? 'block': 'none'
                                }}
                            
                            >
                                <label>Refferal Name</label>
                                <br/>
                                <input type="text" name="refferal" value={this.state.refferal} onChange={this.handleChange} placeholder="Enter Your Refferal Name" />
                                <div className="error">{this.state.refferalError}</div>
                            </div>
                        </div>
                        <div className="pull-right">
                            <input type="submit" value="Submit" />
                            <input type="reset" value="Cancel" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

AddLearner.propTypes = {
    addLearnerOrMentor: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { addLearnerOrMentor })(AddLearner);