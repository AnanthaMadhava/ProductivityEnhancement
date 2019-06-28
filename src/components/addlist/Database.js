import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import classnames from 'classnames';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { databaseDetails } from '../../redux/actions/detailsActions';
import { addDatabase } from '../../redux/actions/addlistActions';
import TableList from './tableData/TableList';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

class DatabaseData extends Component {

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
            passwordError: '',
            data: [],
            editIdx: -1,
            inputAddDatabase: false
        }
        //this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/')
        }
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

    inputAddDatabase = () => {
        if(this.state.inputAddDatabase === false){
            this.setState({
                inputAddDatabase: true
            })
        } else if(this.state.inputAddDatabase === true){
            // this.setState({
            //     inputAddDatabase: false
            // })
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
                name: "dbType",
                label: "RDBMS",
                options: {
                filter: true,
                sort: false,
                }
            },
            {
                name: "dbName",
                label: "DB Name",
                options: {
                filter: true,
                sort: false,
                }
            },
            {
                name: "ipAddress",
                label: "HostName / IP Address",
                options: {
                filter: true,
                sort: false,
                }
            },
            {
                name: "portNo",
                label: "Port Number",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "schemaName",
                label: "Scheme Name",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "userName",
                label: "Username",
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
                // console.log(tableState.selectedRows.data[0].dataIndex);
                // this.xhrRequest('my.api.com/tableData', result => {
                //     this.setState({ data: result });
                // });
                if(tableState.selectedRows.data){
                    console.log(tableState.selectedRows.data)
                }
            }
        };

        const databaseTable = (
            <div className="container-fluid" 
                style={{
                    marginTop: '80px', 
                    marginBottom: "0",
                    height: this.state.inputAddDatabase ? "auto" : "70.5vh"
                }}
            >
                <div className="row justify-content-end addlist_form_heading">
                    {/* <div className="col-6 addlist_heading">
                        Database Data
                    </div> */}
                    <div className="col-1 addlist-addNew_Learner">
                        <div className="addNew_Learner" onClick={this.inputAddDatabase}>
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
                /> */}
                <MUIDataTable
                    title={"Database Data"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </div>
        )

        const addDatabase = (
            <div className="container" 
                style={{
                    marginTop: this.state.inputAddDatabase ? "10px" : "80px",
                    height: "80vh"
                }}
            >
                <div className="addlist_heading" 
                    style={{
                        marginBottom: "20px", 
                        textAlign: "center"
                    }}
                >
                    Add Database
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="inputRDBMS">RDBMS</label>
                            <select className="form-control" name="rdms" onChange={e => this.reference(e)}>
                                <option selected>Choose your DB</option>
                                <option value="ORACLE">Oracle</option>
                                <option value="MYSQL">My SQL</option>
                                <option value="MARIADB">Mariya DB</option>
                                <option value="postgresql">Postgresql</option>
                                <option value="DB2">db2</option>
                                <option value="SYBASE">Sybase</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputDBName">DB Name</label>
                            <input 
                                type="text" 
                                className={classnames('form-control', {
                                    'is-invalid': this.state.dbNameError
                                })}
                                name="dbName" 
                                value={this.state.dbName} 
                                onChange={this.formhandleChange} 
                                placeholder="Enter DB Name"
                            />
                            {this.state.dbNameError && (
                                <div className="invalid-feedback">{this.state.dbNameError}</div>
                            )}
                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputHostNameOrIPAddress">Host Name / IP Address</label>
                            <input 
                                type="text" 
                                className={classnames('form-control', {
                                    'is-invalid': this.state.hostname_IpAddressError
                                })}
                                name="hostname_IpAddress" 
                                value={this.state.hostname_IpAddress} 
                                onChange={this.formhandleChange}
                                placeholder="Host Name / IP Address"
                            />
                            {this.state.hostname_IpAddressError && (
                                <div className="invalid-feedback">{this.state.hostname_IpAddressError}</div>
                            )}
                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputPortNumber">Port Number</label>
                            <input 
                                type="text" 
                                className={classnames('form-control', {
                                    'is-invalid': this.state.portNumberError
                                })}
                                name="portNumber" 
                                onKeyPress={e => this.number(e)} 
                                value={this.state.portNumber} 
                                onChange={this.formhandleChange} 
                                placeholder="Port Number"
                            />
                            {this.state.portNumberError && (
                                <div className="invalid-feedback">{this.state.portNumberError}</div>
                            )}
                        </div>
                        <div className="form-group col-md-6"
                            style={{
                                display: this.state.reference ? 'none': 'block'
                            }}
                        >
                            <label for="inputSchemeName">Scheme Name</label>
                            <input 
                                type="text" 
                                className={classnames('form-control', {
                                    'is-invalid': this.state.schemeNameError
                                })}
                                name="schemeName" 
                                value={this.state.schemeName} 
                                onChange={this.formhandleChange}
                                placeholder="Enter Your Schme Name"
                            />
                            {this.state.schemeNameError && (
                                <div className="invalid-feedback">{this.state.schemeNameError}</div>
                            )}
                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputUsername">Username</label>
                            <input 
                                type="text" 
                                className={classnames('form-control', {
                                    'is-invalid': this.state.usernameError
                                })}
                                name="username" 
                                value={this.state.username} 
                                onChange={this.formhandleChange}
                                placeholder="Username"
                            />
                            {this.state.usernameError && (
                                <div className="invalid-feedback">{this.state.usernameError}</div>
                            )}
                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputPassword">Password</label>
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
                            {databaseTable}
                            {
                                this.state.inputAddDatabase ?
                                addDatabase
                                :
                                null
                            }
                        </div>
                    )
                    :
                    addDatabase
                }
            </div>
        );
    }
}

DatabaseData.propTypes = {
    databaseDetails: PropTypes.func.isRequired,
    addDatabase: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    details: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    details: state.details
});

export default connect(mapStateToProps, { databaseDetails, addDatabase })(DatabaseData);