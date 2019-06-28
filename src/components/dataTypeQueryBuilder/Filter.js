import React, { Component } from 'react';
import { SelectTag } from '../uri/Tags';
import {Icon, Button} from 'antd';

class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
        return (
            <div>
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
        );
    }
}

export default Filter;