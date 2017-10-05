﻿import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { jqxTreeComponent } from '../../../jqwidgets-ts/angular_jqxtree';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent {
    @ViewChild('treeA') treeA: jqxTreeComponent;
    @ViewChild('treeB') treeB: jqxTreeComponent;
    @ViewChild('dragStartLog') dragStartLog: ElementRef;
    @ViewChild('dragEndLog') dragEndLog: ElementRef;
    @ViewChild('textarea') textarea: ElementRef;

    onDragStart = (event) => {
        this.dragStartLog.nativeElement.innerText = 'Drag Start: ' + event.args.label;
        this.dragEndLog.nativeElement.innerText = '';
    };

    onDragEnd = (event) => {
        this.dragEndLog.nativeElement.innerText = 'Drag End';
        if (event.args.label) {
            let ev = event.args.originalEvent;
            let x = ev.pageX;
            let y = ev.pageY;
            if (event.args.originalEvent && event.args.originalEvent.originalEvent && event.args.originalEvent.originalEvent.touches) {
                let touch = event.args.originalEvent.originalEvent.changedTouches[0];
                x = touch.pageX;
                y = touch.pageY;
            }
            let width = this.textarea.nativeElement.clientWidth;
            let height = this.textarea.nativeElement.clientHeight;
            let right = this.textarea.nativeElement.offsetLeft + width;
            let bottom = this.textarea.nativeElement.offsetTop + height;
            if (x >= this.textarea.nativeElement.offsetLeft && x <= right) {
                if (y >= this.textarea.nativeElement.offsetTop && y <= bottom) {
                    this.textarea.nativeElement.value = event.args.label;
                }
            }
        }
    };

    dragStartTreeA(event: any): void {
        this.onDragStart(event);
    };

    dragEndTreeA(event: any): void {
        this.onDragEnd(event);
    };

    dragStartTreeB(event: any): void {
        this.onDragStart(event);
    };

    dragEndTreeB(event: any): void {
        this.onDragEnd(event);
    };

    dragStart(item): boolean {
        if (item.label == "Community")
            return false;
    };

    dragEnd(item, dropItem, args, dropPosition, tree): boolean {
        if (item.label == "Forum")
            return false;
    };
}