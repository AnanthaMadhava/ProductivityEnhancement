import React from 'react';

export const SelectTag = (props) => {
    return (
        <div className="select">
            <div className="select-tag">{props.name}</div>
            <div className="choose">
                <select key={props.i} name={props.find} onChange={props.change}>
                    {
                        props.option.map((choice, i) => (
                            <option key={i} value={choice.name}>
                                {choice.name}
                            </option>
                        ))
                    }
                </select>
            </div>
        </div>
    );
};

export const DateTag = () => {
    return (
        <div className="select">
            <div className="select-date">Date</div>
            <div className="choose">
                <input type="date" />
            </div>
        </div>
    );
};

export const QueryCount = (props) => {
    return(
        <div className="query-count">
            <div className="query-executed">Number of queries executed : <span>{props.executed}</span></div>
            <div className="query-errors">Number of errors Occured : <span>{props.error}</span></div>
        </div>
    );
};

export const QueryCreateConnect = (props) => {
    return(
        <div className="query-Builder-Connect">
            <input type="button" value={props.connect}/>
        </div>
    )
}

export const QueryLoginDetails = (props) => {
    return(
        <div className="query-Builder-login">
            <div className="builder-Login">
                <div>
                    Logged in As : <span>{props.loggedInAs}</span>
                </div>
                <div>
                    Last Login : <span>{props.lastLogin}</span>
                </div>
            </div>
        </div>
    )
}
