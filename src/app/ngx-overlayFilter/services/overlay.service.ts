import { Overlay } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  private _data: any[] = [];
  private _renderedData: any[] = [];
  private _dataSubject: BehaviorSubject<any[]>;
  private _renderedSubject: BehaviorSubject<any[]>;
  public renderedData$: Observable<any[]>;

  constructor(
    private overlay: Overlay
  ) {
    this._dataSubject = new BehaviorSubject(this._data);
    this._renderedSubject = new BehaviorSubject(this._renderedData);
    this.renderedData$ = this._renderedSubject.asObservable();
  }


  publish(data: any[]): void {
    this._data = data;
    this._renderedData = data;
    this._emitRenderedData();
    this._emitData();
  }

  private _emitData(): void {
    this._dataSubject.next(this._data);
  }

  private _emitRenderedData(): void {
    this._renderedSubject.next(this._renderedData);
  }

  filter(key: string, label: string, isChecked: boolean): void {

    if (!isChecked) {
      const filteredData = this._data.filter(d => d[key] != label);
      this._renderedData = filteredData;
      this._emitRenderedData();
    } else {
    }
  }
}
