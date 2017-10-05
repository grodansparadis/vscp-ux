﻿import { Component, ViewChild } from '@angular/core';

import { jqxTreeGridComponent } from '../../../jqwidgets-ts/angular_jqxtreegrid';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent {
    @ViewChild('TreeGrid') treeGrid: jqxTreeGridComponent;
    
    source: any =
    {
        dataType: "csv",
        dataFields: [
            { name: 'EmployeeKey', type: 'number' },
            { name: 'ParentEmployeeKey', type: 'number' },
            { name: 'FirstName', type: 'string' },
            { name: 'LastName', type: 'string' },
            { name: 'Title', type: 'string' },
            { name: 'HireDate', type: 'date' },
            { name: 'BirthDate', type: 'date' },
            { name: 'Phone', type: 'string' },
            { name: 'Gender', type: 'string' },
            { name: 'DepartmentName', type: 'string' }
        ],
        hierarchy:
        {
            keyDataField: { name: 'EmployeeKey' },
            parentDataField: { name: 'ParentEmployeeKey' }
        },
        id: 'EmployeeKey',
        url: '../sampledata/employeesadv.csv'
    };

    dataAdapter: any = new jqx.dataAdapter(this.source);
    
    columns: any[] = [
        { text: 'FirstName', dataField: 'FirstName', minWidth: 100, width: 200 },
        { text: 'LastName', dataField: 'LastName', width: 200 },
        { text: 'Department Name', dataField: 'DepartmentName', width: 200 },
        { text: 'Title', dataField: 'Title' }
    ];

    ready(): void {
        this.treeGrid.expandRow(32);
        this.treeGrid.expandRow(73);
    };
}