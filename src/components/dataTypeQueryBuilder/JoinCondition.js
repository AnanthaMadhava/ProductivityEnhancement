import React, { Component } from 'react';
import { SelectTag } from '../uri/Tags';
import {Icon, Button} from 'antd';

class JoinCondition extends Component {

    state = {
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
        table: [{}]
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

    render() {
        return (
            <div>
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
        );
    }
}

export default JoinCondition;