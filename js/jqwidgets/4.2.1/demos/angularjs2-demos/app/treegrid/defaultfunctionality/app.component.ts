﻿/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked} from '@angular/core';
import {jqxTreeGridComponent} from '../../../../../jqwidgets-ts/angular_jqxtreegrid';

@Component({
    selector: 'my-app',
    template: '<angularTreeGrid></angularTreeGrid>',
    directives: [jqxTreeGridComponent]
})

export class AppComponent implements AfterViewChecked {
    @ViewChild(jqxTreeGridComponent) treeGrid: jqxTreeGridComponent;

    source: {};
    treeGridSettings: jqwidgets.TreeGridOptions;
    flag: Boolean = false;

    constructor() {

        this.source = {
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
            url: '../../demos/sampledata/employeesadv.csv'
        }
        var self = this;
        var dataAdapter = new $.jqx.dataAdapter(this.source);
        this.treeGridSettings = {
            height: 'auto',
            width: 850,
            source: dataAdapter,
            pageable: true,
            columnsResize: true,
            ready: function ()
            {
                self.treeGrid.expandRow(32);
            },
            columns: [
                { text: 'FirstName', dataField: 'FirstName', minWidth: 100, width: 200 },
                { text: 'LastName', dataField: 'LastName', width: 200 },
                { text: 'Department Name', dataField: 'DepartmentName', width: 150 },
                { text: 'Title', dataField: 'Title', width: 300 },
                { text: 'Birth Date', dataField: 'BirthDate', cellsFormat: 'd', width: 120 },
                { text: 'Hire Date', dataField: 'HireDate', cellsFormat: 'd', width: 120 },
                { text: 'Phone', dataField: 'Phone', cellsFormat: 'd', width: 120 }
            ],
        };
    }

    public ngAfterViewChecked(): void {
        if (this.flag === false) {
            
            this.Initialize();
        }
        this.flag = true;
    }

    Initialize(): void {
        this.treeGrid.createWidget(this.treeGridSettings);
    }
}
