import React from 'react';
import ReactDOM from 'react-dom';

import JqxTreeGrid from '../../../jqwidgets-react/react_jqxtreegrid.js';

class App extends React.Component {
    componentDidMount() {
        this.refs.myTreeGrid.expandRow(1);
    }
    render () {
        // prepare the data
        let source = {
            dataType: 'array',
            dataFields: [
                { name: 'name', type: 'string' },
                { name: 'quantity', type: 'number' },
                { name: 'id', type: 'number' },
                { name: 'parentid', type: 'number' },
                { name: 'price', type: 'number' },
                { name: 'date', type: 'date' },
                { name: 'customer', type: 'string' }
            ],
            hierarchy:
            {
                keyDataField: { name: 'id' },
                parentDataField: { name: 'parentid' }
            },
            id: 'id',
            localData: generateordersdata()
        };
        let dataAdapter = new $.jqx.dataAdapter(source);
        // create Tree Grid
        let columns = [
            { text: 'Order Name', dataField: 'name', align: 'center', width: 250 },
            { text: 'Customer', dataField: 'customer', align: 'center', width: 250 },
            { text: 'Price', dataField: 'price', cellsFormat: 'c2', align: 'center', cellsAlign: 'right', width: 80 },
            {
                text: 'Order Date', dataField: 'date', align: 'center', cellsFormat: 'dd-MMMM-yyyy hh:mm', cellsRenderer: (rowKey, column, cellValue, rowData, cellText) => {
                    if (rowData.level === 0) {
                        return dataAdapter.formatDate(cellValue, 'dd-MMMM-yyyy');
                    }
                    return cellText;
                }
            }
        ];
        return (
            <JqxTreeGrid ref='myTreeGrid'
                width={850}
                source={dataAdapter}
                sortable={true}
                pageable={true}
                pagerMode={'advanced'}
                pageSizeMode={'root'}
                pageSize={2}
                pageSizeOptions={['2', '3', '4']}
                columns={columns}
            />
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
