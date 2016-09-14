﻿/// <reference path="../../../../../jqwidgets-ts/jqwidgets.d.ts" />
import {Component, ViewChild, AfterViewChecked, ViewEncapsulation} from '@angular/core';
import {jqxSortableComponent} from '../../../../../jqwidgets-ts/angular_jqxsortable';

@Component({
    selector: 'my-app',
    template: '<angularSortable></angularSortable>',
    styles: [`
            .jqx-sortable {
                        margin: 2px;
                        padding: 5px;
                        float: left;
                        width: 200px;
                        border: lightblue solid 1px;
                    }
                        .jqx-sortable div {
                            border-radius: 5px;
                            padding: 5px;
                            cursor: pointer;
                            background-color: white;
                            color: black;
                            border: 1px solid transparent;
                        }
                            .jqx-sortable div:hover {
                                border: 1px solid #356AA0;
                            }        
            `],
    directives: [jqxSortableComponent],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent implements AfterViewChecked {
    @ViewChild(jqxSortableComponent) sortable: jqxSortableComponent;

    settings: jqwidgets.SortableOptions;
    flag: Boolean = false;

    constructor() {
        this.settings = {
            opacity: 0.5
        }
    }

    public ngAfterViewChecked(): void {
        if (this.flag === false) {
                this.Initialize();
        }
        this.flag = true;
    }
    
    loadInfo() {
        let firstNames = ["Nancy", "Andrew", "Janet", "Margaret", "Steven"];
        let lastNames = ["Davolio", "Fuller", "Leverling", "Peacock", "Buchanan"];
        let titles = ["Sales Representative", "Vice President, Sales", "Sales Representative", "Sales Representative", "Sales Manager"];
        let sortableList = '';
        for (let i = 0; i < firstNames.length; i++) {
            let imgurl = '../../images/' + firstNames[i].toLowerCase() + '.png';
            let img = '<img height="50" width="40" src="' + imgurl + '"/>';
            let element = '<div><table style="min-width: 130px;"><tr><td style="width: 40px;" rowspan="2">' + img + '</td><td>' + firstNames[i] + " " + lastNames[i] + '</td></tr><tr><td>' + titles[i] + '</td></tr></table></div>';
            sortableList = sortableList + element;
        }
        (<HTMLElement>document.getElementsByClassName('jqx-sortable')[0]).innerHTML = sortableList;
    }
    
    Initialize(): void {
        this.sortable.createWidget(this.settings);
        this.loadInfo();
    }
}
