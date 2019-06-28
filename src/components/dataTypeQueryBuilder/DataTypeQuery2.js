import React, { Component } from 'react';
import { SelectTag } from '../uri/Tags';
import {Icon, Button} from 'antd';
import Filter from './Filter'
import JoinCondition from './JoinCondition';
import Sort from './Sort';

class DataTypeQuery2 extends Component {

    state = {
        table:[
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
        queryCheckboxValueError: ''
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
        console.log("Hello")
    }

    render() {
        return (
            <div className="datatype-Query-enter2">
                <div className="datatype-Query-enterData">
                    <div className="datatype-Query-tablelist">
                        <form onSubmit={e => this.add(e)}>
                            <div className="Query-tablelist-Data">
                                <div className="Query-tablelist">
                                    <div className="Query-Table-Heading">List Of Tables</div>
                                    <div className="Query-text">
                                        {
                                            this.state.table.map((table, i) => (
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
                        <Filter />
                    </div>
                    <div className="datatype-Query-JoinCondition">
                        <JoinCondition />
                    </div>
                    <div className="datatype-Query-Sort">
                        <Sort />
                    </div>
                    {/* <form>
                        <div className="datatype-Query-enter">
                            
                        </div>
                        <div className="datatype-Query-submit">
                            <div className="datatype-pull-right">
                                <input type="submit" value="Ok" />
                                <input type="reset" value="Cancel" />
                            </div>
                        </div>
                    </form> */}
                </div>
            </div>
        );
    }
}

export default DataTypeQuery2;