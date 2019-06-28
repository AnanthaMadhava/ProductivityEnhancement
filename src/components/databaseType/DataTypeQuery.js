import React from 'react';

const DataTypeQuery = () => {
    return (
        <div className="container">
            <div className="datatype-Query">
                <div className="datatype-Query-Heading">Query</div>
                <textarea className="datatype-Query-enter">
                    {/* <textarea className="datatype-Text">
                        
                    </textarea> */}
                </textarea>
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
    );
};

export default DataTypeQuery;