import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { addLearnerOrMentor } from '../../redux/actions/addlistActions';

class AddMentor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            address: '',
            technology: '',
            nameError: '',
            emailError: '',
            phoneError: '',
            addressError: '',
            technologyError: ''
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
                password : "Aroha@123"
            }
            // console.log(MentorSignup);
            this.props.addLearnerOrMentor(MentorSignup);

            this.setState({
                name: '',
                email: '',
                phone: '',
                address: '',
                technology: ''
            })
        }
    }

    render() {
        return (
            <div className="addlist">
                <div className="addlist_form_heading">Add Mentor</div>
                <form onSubmit={this.handleSubmit}>
                    <div className="addlist_from">
                        <div className="form-group">
                            <label>Name</label>
                            <br/>
                            <input type="text" name="name" placeholder="Enter Your Name" value={this.state.name} onChange={this.handleChange} />
                            <div className="error">{this.state.nameError}</div>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <br/>
                            <input type="email" name="email" placeholder="Enter Your Email" value={this.state.email} onChange={this.handleChange} />
                            <div className="error">{this.state.emailError}</div>
                        </div>
                        <div className="form-group">
                            <label>Phone No</label>
                            <br/>
                            <input type="text" name="phone" placeholder="Phone Number" value={this.state.phone} onKeyPress={e => this.number(e)} onChange={this.handleChange} />
                            <div className="error">{this.state.phoneError}</div>
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <br/>
                            <textarea type="text" name="address" placeholder="Address.." value={this.state.address} onChange={this.handleChange} />
                            <div className="error">{this.state.addressError}</div>
                        </div>
                        <div className="form-group">
                            <label>Technology</label>
                            <br />
                            <input type="text" name="technology" placeholder="Technology" value={this.state.technology} onChange={this.handleChange} />
                            <div className="error">{this.state.technologyError}</div>
                        </div>
                    </div>
                    <div className="pull-right">
                        <input type="submit" value="Submit" />
                        <input type="reset" value="Cancel" />
                    </div>
                </form>
            </div>
        );
    }
}

AddMentor.propTypes = {
    addLearnerOrMentor: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { addLearnerOrMentor })(AddMentor);