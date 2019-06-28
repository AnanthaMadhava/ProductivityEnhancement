import React, { Component } from 'react';
import DataTypeQuery2 from './DataTypeQuery2';

class DataTypeQuery1 extends Component {
    render() {
        return (
            <div className="container">
                <div className="datatype-Query-Builder-grid">
                    <div className="datatype-Query-Builder1">
                        <div className="datatype-Query">
                            <div className="datatype-Query-Heading">Query</div>
                            <div className="datatype-Query-enter">
                                <div className="datatype-Text">
                                    
                                </div>
                            </div>
                            <div className="datatype-pull-right">
                                <input type="submit" value="Submit" />
                            </div>
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
                            <DataTypeQuery2 />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DataTypeQuery1;