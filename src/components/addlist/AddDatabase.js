import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { addDatabase } from '../../redux/actions/addlistActions';

class AddDatabase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rdms: 'ORACLE',
            dbName: '',
            hostname_IpAddress: '',
            portNumber: '',
            schemeName: '',
            username: '',
            password: '',
            reference: false,
            dbNameError: '',
            hostname_IpAddressError: '',
            portNumberError: '',
            schemeNameError: '',
            usernameError: '',
            passwordError: ''
        }
        //this.handleChange = this.handleChange.bind(this);
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    reference = e => {
        console.log(e.target.value);
        if(e.target.value === "MYSQL"){
            this.setState({
                schemeName: '',
                rdms: e.target.value,
                reference: true
            });
        } else if(e.target.value === "ORACLE"){
            this.setState({
                rdms: e.target.value,
                reference: false
            });
        }
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
            dbNameError: '',
            hostname_IpAddressError: '',
            portNumberError: '',
            schemeNameError: '',
            usernameError: '',
            passwordError: ''
        };

        if(this.state.dbName === '') {
            isError = true;
            errors.dbNameError = 'DB Name should not be empty';
        }

        if(this.state.hostname_IpAddress === '') {
            isError = true;
            errors.hostname_IpAddressError = 'Enter Host Name / Ip Address';
        }

        if(this.state.portNumber === '') {
            isError = true;
            errors.portNumberError = 'Port Number should not be empty';
        }

        if(this.state.reference === false) {
            if(this.state.schemeName === '') {
                errors.schemeNameError = "Enter Your Scheme Name";
            }
        }

        if(this.state.username.length < 5) {
            isError = true;
            errors.usernameError = 'Username needs to be atleast 5 characters'
        }

        if(this.state.password === '') {
            isError = true;
            errors.passwordError = 'Enter your Password';
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
            // console.log(this.state);
            const DbInfo = {
                dbType : this.state.rdms,
                dbName : this.state.dbName,
                ipAddress : this.state.hostname_IpAddress,
                portNo : parseInt(this.state.portNumber),
                schemaName : this.state.schemeName,
                userName : this.state.username,
                password : this.state.password
            }
            // console.log(DbInfo);

            this.props.addDatabase(DbInfo);

            this.setState({
                dbName: '',
                hostname_IpAddress: '',
                portNumber: '',
                schemeName: '',
                username: '',
                password: '',
                reference: false,
                dbNameError: '',
                hostname_IpAddressError: '',
                portNumberError: '',
                schemeNameError: '',
                usernameError: '',
                passwordError: ''
            })
        }
    }

    render() {
        return (
            <div className="addlist">
                <div className="addlist_form_heading">Add Database</div>
                <form onSubmit={this.handleSubmit}>
                    <div className="addlist_from_databese">
                        <div className="form-group">
                            <label>RDBMS</label>
                            <br/>
                            <select name="rdms" onChange={e => this.reference(e)}>
                                <option value="ORACLE">Oracle</option>
                                <option value="MYSQL">My SQL</option>
                                <option value="MARIADB">Mariya DB</option>
                                <option value="postgresql">Postgresql</option>
                                <option value="DB2">db2</option>
                                <option value="SYBASE">Sybase</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>DB Name</label>
                            <br/>
                            <input type="text" placeholder="Enter DB Name" name="dbName" value={this.state.dbName} onChange={this.handleChange} />
                            <div className="error">{this.state.dbNameError}</div>
                        </div>
                        <div className="form-group">
                            <label>Host Name / IP Address</label>
                            <br/>
                            <input type="text" placeholder="Host Name / IP Address" name="hostname_IpAddress" value={this.state.hostname_IpAddress} onChange={this.handleChange} />
                            <div className="error">{this.state.hostname_IpAddressError}</div>
                        </div>
                        <div className="form-group">
                            <label>Port Number</label>
                            <br/>
                            <input type="text" placeholder="Port Number" name="portNumber" onKeyPress={e => this.number(e)} value={this.state.portNumber} onChange={this.handleChange} />
                            <div className="error">{this.state.portNumberError}</div>
                        </div>
                        <div 
                            className="form-group"
                            style={{
                                display: this.state.reference ? 'none': 'block'
                            }}
                        >
                            <label>Scheme Name</label>
                            <br />
                            <input type="text" placeholder="Enter Your Schme Name" name="schemeName" value={this.state.schemeName} onChange={this.handleChange} />
                            <div className="error">{this.state.schemeNameError}</div>
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <br />
                            <input type="text" placeholder="username" name="username" value={this.state.username} onChange={this.handleChange} />
                            <div className="error">{this.state.usernameError}</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <br />
                            <input type="password" placeholder="password"name="password"  value={this.state.password} onChange={this.handleChange} />
                            <div className="error">{this.state.passwordError}</div>
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

AddDatabase.propTypes = {
    addDatabase: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { addDatabase })(AddDatabase);