import React from 'react';
import ReactDOM from 'react-dom';

import JqxSortable from '../../../jqwidgets-react/react_jqxsortable.js';

class App extends React.Component {
    render() {
        let firstNames = ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael', 'Robert', 'Laura', 'Anne'];
        let lastNames = ['Davolio', 'Fuller', 'Leverling', 'Peacock', 'Buchanan', 'Suyama', 'King', 'Callahan', 'Dodsworth'];
        let titles = ['Sales Representative', 'Vice President, Sales', 'Sales Representative', 'Sales Representative', 'Sales Manager', 'Sales Representative', 'Sales Representative', 'Inside Sales Coordinator', 'Sales Representative'];
        let sortableList1 = '',
            sortableList2 = '',
            firstNamesLength = firstNames.length,
            firstNamesHalf = Math.floor(firstNamesLength / 2);
        for (let i = 0; i < firstNames.length; i++) {
            let imgurl = '../../images/' + firstNames[i].toLowerCase() + '.png';
            let img = '<img height="50" width="40" src="' + imgurl + '"/>';
            let element = '<div><table style="min-width: 130px;"><tr><td style="width: 40px;" rowspan="2">' + img + '</td><td>' + firstNames[i] + ' ' + lastNames[i] + '</td></tr><tr><td>' + titles[i] + '</td></tr></table></div>';
            if (i < firstNamesHalf) {
                sortableList1 = sortableList1 + element;
            } else {
                sortableList2 = sortableList2 + element;
            }
        }
        return (
            <div >

                <div className='sortable-container'>
                    <span>Team A</span>
                    <JqxSortable ref='sortable1' className='sortable'
                        template={sortableList1}
                        connectWith={'.sortable'} opacity={0.5}
                    />
                </div>

                <div className='sortable-container'>
                    <span>Team B</span>
                    <JqxSortable ref='sortable2' className='sortable'
                        template={sortableList2}
                        connectWith={'.sortable'} opacity={0.5}
                    />
                </div>

            </div >
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
