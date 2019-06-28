import React, { Component } from 'react';
import {SelectTag, QueryCreateConnect, QueryLoginDetails} from '../uri/Tags';
import {Icon, Button} from 'antd';
import DatabaseType from '../databaseType';
import DataTypeQueryBuilder from '../dataTypeQueryBuilder';
import {NavLink} from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { databaseDetails } from '../../redux/actions/detailsActions';
import DataTypeQuery2 from './DataTypeQuery2';

class DataTypeQuery extends Component {

    state = {
        database:[],
        result:[
            {
                "name": "Hello"
            },
            {
                "name": "Welcome"
            },
            {
                "name": "Anantha"
            }
        ],
        columns:[
            {
                "name": "Table1"
            },
            {
                "name": "Table2"
            }
        ],
        operator:[
            {
                "name": '='
            },
            {
                "name": '*'
            }
        ],
        values:[
            {
                "name": "Internal"
            },
            {
                "name": "External"
            }
        ],
        queryCheckboxValue: [],
        queryCheckboxValueError: '',
        table: [{}]
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

    getQueryCheckTable = e => {
        // console.log(e.target.value);
        this.setState({
            queryCheckboxValue: [...this.state.queryCheckboxValue, e.target.value]
        })
    }

    validate = () => {
        let isError = false;

        const errors = {
            queryCheckboxValueError: ''
        };

        if(this.state.queryCheckboxValue.length === 0) {
            isError = true;
            errors.queryCheckboxValueError = 'Please select the checkbox';
        }

        this.setState({
        ...this.state,
        ...errors
        });

        return isError;
    }

    add = e => {
        e.preventDefault();
        
        const err = this.validate();

        if(!err){
            console.log(this.state.queryCheckboxValue);
            const CheckboxValue = this.state.queryCheckboxValue;
            for (let i = 0; i < CheckboxValue.length; i++) {
                console.log(CheckboxValue[i]);
            }
        }
    }

    addrow = () => {
        this.setState({
            table: [...this.state.table, ""]
        })
    }

    minusrow = (index) => {
        this.state.table.splice(index,1)
        
        if(index !== 0) {
            this.setState({
                table: this.state.table
            })
        }
    }

    handleChange = (e) => {
        console.log(e);
    }

    render() {
        const { user } = this.props.auth;
        return (
            <div className="container" style={{marginTop: '120px'}}>
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
                <form>
                    <div className="row">
                        <div className="col-auto mr-auto query-Builder" style={{marginTop: "5px"}}>
                            <label for="inputdatabaseType" className="select">Database Type</label>
                            <select className="form-control" name="databaseType" style={{width: "200px"}}>
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
                            <div className="query-Builder-Connect">
                                <input type="button" value="Connect"/>
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
                </form>
                <div className="query-Builder-Button">
                    <NavLink to="/databaseType" className="buttonSwitch_Item" activeClassName="buttonSwitch_Active" component={DatabaseType}>Manual</NavLink>
                    <NavLink to="/queryBuilder" className="buttonSwitch_Item" activeClassName="buttonSwitch_Active" component={DataTypeQueryBuilder}>Automatic</NavLink>
                </div>
                <div className="datatype-Query-Builder-grid">
                    <div className="datatype-Query-Builder1">
                        <div className="datatype-Query">
                            <form>
                                <div className="datatype-Query-Heading">Query</div>
                                <div className="datatype-Query-enter" style={{height: "250px"}}>
                                    <div className="datatype-Text">
                                        
                                    </div>
                                </div>
                                <div className="datatype-pull-right">
                                    <input type="submit" value="Submit" />
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
                    </div>
                    <div className="datatype-Query-Builder2">
                        <div className="datatype-Query">
                            <div className="datatype-Query-enter2">
                                <div className="datatype-Query-enterData">
                                    <div className="datatype-Query-tablelist">
                                        <form onSubmit={e => this.add(e)}>
                                            <div className="Query-tablelist-Data">
                                                <div className="Query-tablelist">
                                                    <div className="Query-Table-Heading">List Of Tables</div>
                                                    <div className="Query-text">
                                                        {
                                                            this.state.result.map((table, i) => (
                                                                <div key={i}>
                                                                    <input type="checkbox" name="queryCheckboxValue" value={table.name} onChange={e => this.getQueryCheckTable(e)} /><span>Table {i}</span>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                                <div className="query-table-Add">
                                                    <input type="submit" value="Add"/>
                                                </div>
                                            </div>
                                            <div className="error">{this.state.queryCheckboxValueError}</div>
                                        </form>
                                    </div>
                                    <div className="datatype-Query-filter">
                                        <div className="datatype-Query-Heading">Filter</div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Columns</th>
                                                    <th>Operator</th>
                                                    <th>Values</th>
                                                    <th>And</th>
                                                    <th>Or</th>
                                                    <th><Button className="add_On_Button" onClick={e => this.addrow(e)}><Icon type="plus" /></Button></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.table.map((tables, index)=>{
                                                        return(
                                                            <tr key={index} value={tables}>
                                                                <th>
                                                                    <SelectTag 
                                                                        find='filter'
                                                                        option={this.state.columns}
                                                                        change={e => this.handleChange(e)}
                                                                    />
                                                                </th>
                                                                <th>
                                                                    <SelectTag 
                                                                        option={this.state.operator}
                                                                    />
                                                                </th>
                                                                <th>
                                                                    <SelectTag 
                                                                        option={this.state.values}
                                                                    />
                                                                </th>
                                                                <th>
                                                                    <input type="radio" />
                                                                </th>
                                                                <th>
                                                                    <input type="radio" />
                                                                </th>
                                                                <th>
                                                                    <Button type="dashed" className="add_On_Button" onClick={e => this.minusrow(index)}>
                                                                        <Icon type="minus" />
                                                                    </Button>
                                                                </th>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="datatype-Query-JoinCondition">
                                        <div className="datatype-Query-Heading">Join Condition</div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Columns</th>
                                                    <th>Operator</th>
                                                    <th>Column</th>
                                                    <th><Button className="add_On_Button" onClick={e => this.addrow(e)}><Icon type="plus" /></Button></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.table.map((tables, index)=>(
                                                        <tr key={index} value={tables}>
                                                            <th>
                                                                <SelectTag 
                                                                    option={this.state.columns}
                                                                />
                                                            </th>
                                                            <th>
                                                                <SelectTag 
                                                                    option={this.state.operator}
                                                                />
                                                            </th>
                                                            <th>
                                                                <SelectTag 
                                                                    option={this.state.values}
                                                                />
                                                            </th>
                                                            <th>
                                                                <Button className="add_On_Button" onClick={e => this.minusrow(index)}>
                                                                    <Icon type="minus" />
                                                                </Button>
                                                            </th>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="datatype-Query-Sort">
                                        <div className="datatype-Query-Heading">Sort</div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Columns</th>
                                                    <th>Sort Type</th>
                                                    <th>Sort Order</th>
                                                    <th><Button className="add_On_Button" onClick={e => this.addrow(e)}><Icon type="plus" /></Button></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.table.map((tables, index)=>{
                                                        return(
                                                            <tr key={index} value={tables}>
                                                                <th>
                                                                    <SelectTag 
                                                                        option={this.state.columns}
                                                                    />
                                                                </th>
                                                                <th>
                                                                    <SelectTag 
                                                                        option={this.state.operator}
                                                                    />
                                                                </th>
                                                                <th>
                                                                    <SelectTag 
                                                                        option={this.state.values}
                                                                    />
                                                                </th>
                                                                <th>
                                                                    <Button className="add_On_Button" onClick={e => this.minusrow(index)}>
                                                                        <Icon type="minus" />
                                                                    </Button>
                                                                </th>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DataTypeQuery.propTypes = {
    databaseDetails: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    details: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    details: state.details
});

export default connect(mapStateToProps, {databaseDetails})(DataTypeQuery);