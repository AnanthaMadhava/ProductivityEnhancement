import React, { Component } from 'react';
import { HeaderLogo } from '../uri/icons';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';
import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usernameOrEmail: '',
            password: '',
            usernameError: '',
            passwordError: '',
            emailValid: true,
            emailInValid: false
        }
    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/')
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated){
            if(nextProps.auth.user.roles[0].authority === "ROLE_USER"){
                this.props.history.push('/databaseType')
            } else if(nextProps.auth.user.roles[0].authority === "ROLE_MENTOR"){
                this.props.history.push('/pickLearner')
            } else if(nextProps.auth.user.roles[0].authority === "ROLE_ADMIN"){
                this.props.history.push('/Mentor')
            }
        }

        if(nextProps.errors){
            if(nextProps.errors.status === 401){
                console.log(nextProps.errors.message)
            }
        }
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    emailValid = e => {
        // console.log(e.target.value);
        if(this.state.usernameOrEmail !== '') {
            const Email_Id = e.target.value
            axios.get(`/user/checkEmailAvailability?email=${Email_Id}`)
                .then(res => {
                    // console.log(res.data.available)
                    this.setState({
                        emailValid : res.data.available
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    emailInValid = e => {
        // console.log(e.target.value);
        if(this.state.usernameOrEmail !== '') {
            const Email_Id = e.target.value
            axios.get(`/user/checkEmailAvailability?email=${Email_Id}`)
                .then(res => {
                    // console.log(res.data.available)
                    this.setState({
                        emailInValid : res.data.available
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    validate = () => {
        let isError = false;

        const errors = {
            usernameError: '',
            passwordError: ''
        };

        if(this.state.usernameOrEmail === '') {
            isError = true;
            errors.usernameError = 'Enter your username Or Email_id';
        }

        if(this.state.password === '') {
            isError = true;
            errors.passwordError = 'Enter Your password';
        }

        this.setState({
        ...this.state,
        ...errors
        });

        return isError;
    }

    onSubmit = e => {
        e.preventDefault();

        const err = this.validate();

        if(!err) {
            const userData = {
                usernameOrEmail: this.state.usernameOrEmail,
                password: this.state.password
            }
            // console.log(sigin);
            this.props.loginUser(userData);
        }
    }
    render() {
        // const { errors } = this.state;
        // console.log(errors);

        return (
            <div className="login-page">
                <div className="login-page-aside">
                    <div className="login-page-logo">
                            <HeaderLogo 
                                link={true}
                                linkTo="/"
                                width='370px'
                                height='135px'
                            />
                    </div>
                </div>
                <div className="login-page-form">
                    <div className="loin-form-newUser">
                        <div className="form-newUser">
                            <Link to="/Learner"
                                style={{
                                    color: "#ffffff",
                                    textDecoration: "none"
                                }}
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                    <div className="login-form-page">
                        {/* <div className="login-from content">
                            <div className="login-form-title">Login</div>
                            <form onSubmit={e => this.onSubmit(e)}>
                                <div className="form-control">
                                    <input type="text" name="usernameOrEmail" value={this.state.username} onChange={e => this.change(e)} placeholder="Username Or Email_id" />
                                    <div className="error">{this.state.usernameError}</div>
                                </div>
                                <div className="form-control">
                                    <input type="password" name="password" value={this.state.password} onChange={e => this.change(e)} placeholder="Password" />
                                    <div className="error">{this.state.passwordError}</div>
                                </div>
                                <div className="form-control">
                                    <input type="submit" className="login-form-button" value="Login"/>
                                </div>
                            </form>
                        </div> */}
                        <form onSubmit={e => this.onSubmit(e)}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className={classnames('form-control', {
                                        'is-invalid': this.state.usernameError
                                    },
                                    {
                                        'is-valid': !this.state.emailValid
                                    },
                                    {
                                        'is-invalid': this.state.emailInValid
                                    })}
                                    name="usernameOrEmail" 
                                    value={this.state.username} 
                                    onChange={e => this.change(e)} 
                                    onBlur={e => this.emailValid(e)}
                                    onKeyDown={e => this.emailInValid(e)}
                                    placeholder="Username Or Email_id"
                                />
                                {
                                    !this.state.emailValid ?
                                        <div className="valid-feedback">Email_Id Exist</div>
                                    : this.state.usernameError ?
                                        <div className="invalid-feedback">{this.state.usernameError}</div>
                                    : this.state.emailValid ?
                                        <div className="invalid-feedback">Incorrect Email_Id</div>
                                    :
                                    null
                                }
                                {/* {this.state.usernameError && (
                                    <div className="invalid-feedback">{this.state.usernameError}</div>
                                )} */}
                            </div>
                            <div className="form-group">
                                <input 
                                    type="password" 
                                    className={classnames('form-control', {
                                        'is-invalid': this.state.passwordError
                                    })}
                                    name="password" 
                                    value={this.state.password} 
                                    onChange={e => this.change(e)} 
                                    placeholder="Password"
                                />
                                {this.state.passwordError && (
                                    <div className="invalid-feedback">{this.state.passwordError}</div>
                                )}
                            </div>
                            <button type="submit" className="btn btn-primary" style={{width: "100%", backgroundColor: "#1C4366"}}>Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);