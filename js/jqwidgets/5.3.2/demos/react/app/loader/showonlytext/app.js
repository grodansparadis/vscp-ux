import React from 'react';
import ReactDOM from 'react-dom';

import JqxLoader from '../../../jqwidgets-react/react_jqxloader.js';
import JqxButton from '../../../jqwidgets-react/react_jqxbuttons.js';

class App extends React.Component {
    componentDidMount() {
        this.refs.openLoader.on('click', () => {
            this.refs.myLoader.open();
        });

        this.refs.closeLoader.on('click', () => {
            this.refs.myLoader.close();
        });
    }
    render() {
        return (
            <div> 
                <JqxLoader ref='myLoader' style={{ marginTop: 230 }}
                    width={100} height={35}
                    html={'<div class="jqx-loader-text">Show only text in loader...</div>'}
                />
                <JqxButton ref='openLoader' style={{ float: 'left', marginRight: 10 }}
                    value='Open Loader' width={150} height={25}
                />
                <JqxButton ref='closeLoader' style={{ float: 'left' }}
                    value='Close' width={150} height={25}
                />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
