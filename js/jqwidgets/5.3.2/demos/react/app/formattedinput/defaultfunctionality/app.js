import React from 'react';
import ReactDOM from 'react-dom';

import JqxFormattedInput from '../../../jqwidgets-react/react_jqxformattedinput.js';

class App extends React.Component {
    render() {
        return (
            <JqxFormattedInput
                width={250} height={25} radix={'decimal'}
                value={15} spinButtons={true} dropDown={true}
            />
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
