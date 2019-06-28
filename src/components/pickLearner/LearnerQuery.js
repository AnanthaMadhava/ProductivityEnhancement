import React, { Component } from 'react';

class LearnerQuery extends Component {

    state = {
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
    };

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
            <div className="container">
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
        );
    }
}

export default LearnerQuery;