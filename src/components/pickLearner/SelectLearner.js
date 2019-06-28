import React, { Component } from 'react';
import { SelectTag, DateTag, QueryCount } from '../uri/Tags';

class SelectLearner extends Component {

    state = {
        react:[
            {
                "name": "Anantha"
            },
            {
                "name": "Arun"
            }
        ],
        querybuilt: [
            {
                "Query": "SELECT * FROM Customers"
            },
            {
                'Query': "INSERT INTO TABLE_NAME (column1, column2, column3,...columnN)  VALUES (value1, value2, value3,...valueN)"
            },
            {
                "Query": "UPDATE table_name SET column1 = value1, column2 = value2, WHERE condition"
            }
        ],
        queryExecuted: false,
        checkboxValue: [],
        selectCheckboxError: ''
    }

    validate = () => {
        let isError = false;

        const errors = {
            selectCheckboxError: ''
        };

        if(this.state.checkboxValue.length === 0) {
            isError = true;
            errors.selectCheckboxError = 'Please select the checkbox';
        }

        this.setState({
        ...this.state,
        ...errors
        });

        return isError;
    }

    report = e => {
        e.preventDefault();

        const err = this.validate();

        if(!err){
            console.log(this.state.checkboxValue);
        
            this.setState({
                queryExecuted: true
            })
        }
    }

    getQuery = e => {
        this.setState({
            [e.target.name] : [...this.state.checkboxValue, e.target.value],
            queryExecuted: false
        })
    }

    output = () => (
        <div className="learner-query-output">
            <div className="learner-text">
                <div className="query-text">
                    {this.state.checkboxValue}
                </div>
            </div>
        </div>
    )

    render() {
        return (
            <div className="container" style={{marginTop: '120px'}}>
                {/* <div className="query-Builder">
                    <SelectTag 
                        name="Pick Learner"
                        option={this.state.react}
                    />
                    <DateTag />
                </div>
                <div className="query-Builder">
                    <div className="select">
                        <div className="select-tag">Pick Learner</div>
                        <div className="choose">
                            
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label for="inputPickLearner">Pick Learner</label>
                    <select className="form-control" name="pickLearner">
                        <option selected>Choose...</option>
                        <option value="Portal">Portal</option>
                        <option value="Reference">Reference</option>
                    </select>
                </div> */}
                <div className="row">
                    <div className="col-auto mr-auto query-Builder">
                        <label for="inputPickLearner" className="select">Pick Learner</label>
                        <select className="form-control" name="pickLearner" style={{width: "200px"}}>
                            {/* <option selected>Choose...</option>
                            <option value="Portal">Portal</option>
                            <option value="Reference">Reference</option> */}
                            <option disabled selected>Choose...</option>
                            {
                                this.state.react.map((result,i) => (
                                    <option key={i} value={result.name}>
                                        {result.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-auto query-Builder">
                        <label for="inputDate" className="select">Date</label>
                        <input type="date" className="form-control" name="date" placeholder="Enter Your DOJ" style={{width: "200px"}}/>
                    </div>
                </div>
                <QueryCount 
                    executed="10"
                    error="15"
                />
                <div>
                    <form  onSubmit={e => this.report(e)} >
                        <div className="learner-query">
                            <div className="learner-text">
                                {
                                    this.state.querybuilt.map((result, i) => (
                                        <div key={i}>
                                            <input type="checkbox" name="checkboxValue" value={result.Query} onChange={e => this.getQuery(e)} /><span>Query {i}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="error">{this.state.selectCheckboxError}</div>
                        <div className={this.state.queryExecuted ? 'active' : 'query-report'}>
                            <input type="submit" value="Detais Report"/>
                        </div>
                        {
                            this.state.queryExecuted ? this.output() : ''
                        }
                    </form>
                </div>
            </div>
        );
    }
};

export default SelectLearner;