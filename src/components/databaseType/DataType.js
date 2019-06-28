import React, { Component } from 'react';
import {SelectTag, QueryCreateConnect, QueryLoginDetails} from '../uri/Tags';
import DatabaseType from './DataType';
import DataTypeQueryBuilder from '../dataTypeQueryBuilder';
import {NavLink} from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { databaseDetails } from '../../redux/actions/detailsActions';
import { connectDatabase } from '../../redux/actions/connectDatabaseAction';

class DataType extends Component {

    state = {
        database:[],
        dataMarquee: '',
        displayMarquee: false,
        selectedDatabase: '',
        textarea: '',
    }

    componentDidMount() {
        this.props.databaseDetails();
    }

    componentWillReceiveProps(nextProps) {
        const { databaseDetails } = nextProps.details;
        if(databaseDetails != null){
            console.log(databaseDetails)
            this.setState({
                database: [...databaseDetails]
            })
        }
    }

    datatypeChange = e => {
        const scrollData = e.target.value;
        this.setState({
            selectedDatabase: scrollData
        })
        this.state.database.map((res, i) => {
            if(res.dbType === scrollData){
                this.setState({
                    displayMarquee: true,
                    dataMarquee : res
                })
            }
        })
    }

    handleTextarea = e => {
        this.setState({
            textarea: e.target.value
        })
    }

    connect = e => {
        const db_INFO = {
            dbType : this.state.dataMarquee.dbType,
            dbName : this.state.dataMarquee.dbName,
            ipAddress : this.state.dataMarquee.ipAddress,
            portNo : this.state.dataMarquee.portNo,
            schemaName : this.state.dataMarquee.schemaName,
            userName : this.state.dataMarquee.userName,
            password : this.state.dataMarquee.password
        }
        // console.log(db_INFO)
        this.props.connectDatabase(db_INFO);
    }

    handleSubmit = e => {
        e.preventDefault();
        
        const submit = {
            selectedDatabase : this.state.selectedDatabase,
            textarea: this.state.textarea
        }
        console.log(submit)
    }

    render() {
        const { user } = this.props.auth;
        return (
            <div className="container" style={{marginTop: '70px'}}>
                {/* <div className="datatype-Query-Builder">
                    <div className="query-Builder">
                        <SelectTag 
                            name="Database Type"
                            option={this.state.database}
                        />
                    </div>
                    <QueryCreateConnect 
                        create="Create"
                        connect="Connect"
                    />
                    <QueryLoginDetails 
                        loggedInAs=""
                        lastLogin=""
                    />
                </div> */}
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-auto mr-auto query-Builder" style={{marginTop: "5px"}}>
                            <label for="inputdatabaseType" className="select">Database Type</label>
                            <select className="form-control" name="databaseType" style={{width: "200px"}} onChange={e => this.datatypeChange(e)}>
                                <option disabled selected>Choose...</option>
                                {
                                    this.state.database.map((result,i) => (
                                        <option key={i} value={result.dbType}>
                                            {result.dbType} - {result.dbName}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="col align-self-center">
                            <div className="query-Builder-Connect" style={{fontSize: "12px"}}>
                                {
                                    this.state.displayMarquee ?
                                        <div className="dataMarquee">
                                            <div>DB Type : <b>{this.state.dataMarquee.dbType}</b>,</div>
                                            <div>IP Address : <b>{this.state.dataMarquee.ipAddress}</b>,</div>
                                            <div>PortNo : <b>{this.state.dataMarquee.portNo}</b>,</div>
                                            <div>Scheme Name: <b>{this.state.dataMarquee.schemaName}</b>,</div>
                                            <div>UserName: <b>{this.state.dataMarquee.userName}</b></div>
                                        </div>
                                    :
                                    null
                                }
                            </div>
                        </div>
                        <div className="col-auto query-Builder">
                            <div className="query-Builder-login">
                                <div className="builder-Login">
                                    <div>
                                        Logged in As : <span>{user.name}</span>
                                    </div>
                                    <div>
                                        Last Login : <span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="query-Builder-Button">
                        <NavLink to="/databaseType" className="buttonSwitch_Item" activeClassName="buttonSwitch_Active" component={DatabaseType}>Manual</NavLink>
                        <NavLink to="/queryBuilder" className="buttonSwitch_Item" activeClassName="buttonSwitch_Active" component={DataTypeQueryBuilder}>Automatic</NavLink>
                        <div className="query-Builder-Connect">
                            <input type="button" value="Connect" onClick={this.connect}/>
                        </div>
                    </div>
                    <div className="datatype-Query" style={{width: "100%"}}>
                        <div className="datatype-Query-Heading">Query</div>
                        <textarea className="datatype-Query-enter" style={{height: "100px"}} name="textarea" value={this.state.textarea} onChange={this.handleTextarea}>
                            {/* <textarea className="datatype-Text">
                                
                            </textarea> */}
                        </textarea>
                        <div className="datatype-pull-right">
                            <input type="submit" value="Execute SQL" />
                        </div>
                    </div>
                </form>
                <div className="datatype-Result-enter">
                    <div className="datatype-Text">
                        Result :
                    </div>
                </div>
                <div className="datatype-Error-enter">
                    <div className="datatype-Text">
                        Error :
                    </div>
                </div>
            </div>
        );
    }
}

DataType.propTypes = {
    databaseDetails: PropTypes.func.isRequired,
    connectDatabase: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    details: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    details: state.details
});

export default connect(mapStateToProps, { databaseDetails, connectDatabase })(DataType);