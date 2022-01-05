import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AfterViewInit, ChangeDetectionStrategy, Component, ComponentRef, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { OverlayService } from '../../services/overlay.service';
import { NgxOverlayComponent } from '../overlay/ngx-overlay.component';

@Component({
  selector: 'ngx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('dataSource') data: any[] = [];
  @Input() columnsToDisplay: string[] = [];

  private _overlayRefs: {ref: OverlayRef, isOpen: boolean, el: HTMLButtonElement, data: any[], key: string }[] = [];
  public dataSource!: MatTableDataSource<any[]>;
  private _dataSubscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChildren(MatButton, {read: ElementRef}) buttons!: QueryList<ElementRef>;


  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private dataService: OverlayService
  ) {}

  ngOnInit(): void {
    this.dataService.publish(this.data);
    this.dataSource = new MatTableDataSource(this.data);

    this._dataSubscription = this.dataService.renderedData$.subscribe(
      (data: any[]) => this.dataSource.data = data
    );
  }

  ngOnDestroy(): void {
    this._dataSubscription.unsubscribe();
  }

  getKeys(): string[] {
    const keys = Object.keys(this.data[0]);
    return keys;
  }

  getValuePerColumns(keys: string[]): string[][] {
    let res: string[][] = [];
    keys.forEach(key => {
      let r:string[] = [];
      this.data.forEach(row => {
        const v = row[key];
        if (!r.includes(v)) {
          r.push(v)
        }
       
      })
      res.push(r);
    });
    return res;
  }

  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;

    const keys = this.getKeys();
    const v = this.getValuePerColumns(keys);

    this.buttons.forEach((b, i) => {
      const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(b.nativeElement)
       .withPositions([{
         originX: 'end',
         originY: 'bottom',
         overlayX: 'start',
         overlayY: 'top'
       }]);
      const data = v[i];
      const key = keys[i];
      const overlayRef = this.overlay.create({positionStrategy});
      this._overlayRefs.push({ref: overlayRef, isOpen: false, el: b.nativeElement, data, key});
      
    });
  }

  onToggle(e: any): void {
    e.stopPropagation();

    const target = e.target.parentElement.parentElement;
    const overlayObj = this._overlayRefs.find(e => e.el === target);
    const isOpen = overlayObj!.isOpen;

    if (isOpen) {
      overlayObj?.ref.detach();
    } else {
      const overlayPortal: ComponentPortal<NgxOverlayComponent> = new ComponentPortal(NgxOverlayComponent);
      const overlayComponentRef: ComponentRef<NgxOverlayComponent> = overlayObj!.ref.attach(overlayPortal);
      overlayComponentRef.instance.data = overlayObj!.data;
      overlayComponentRef.instance.key = overlayObj!.key;
    }
    overlayObj!.isOpen = !overlayObj!.isOpen
  }

  rowClicked(row: any): void {
  }
}
