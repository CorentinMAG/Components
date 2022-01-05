import { Overlay } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  private _data: any[] = [];
  private _renderedData: any[] = [];
  private _filters: any[] = [] = [];
  private _dataSubject: BehaviorSubject<any[]>;
  private _filterSubject: BehaviorSubject<any[]>;
  private _renderedSubject: BehaviorSubject<any[]>;
  public renderedData$: Observable<any[]>;
  public filters$: Observable<any[]>;

  constructor(
    private overlay: Overlay
  ) {
    this._dataSubject = new BehaviorSubject(this._data);
    this._renderedSubject = new BehaviorSubject(this._renderedData);
    this.renderedData$ = this._renderedSubject.asObservable();
    this._filterSubject = new BehaviorSubject(this._filters);
    this.filters$ = this._filterSubject.asObservable();

    this._filterSubject.subscribe(
      (filter: any) => this._filter()
    );
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

  private _emitFilters(): void {
    this._filterSubject.next(this._filters);
  }

  updateFilter(key: string, label: string | string[], isChecked: boolean): void {
    const idx = this._filters.findIndex((f:any) => f.key === key);

    if (idx != -1) {
      // there is a filter for this key
      const filter = this._filters[idx];

      if (isChecked) {
        // we need to remove the label from the value array

        if (label === 'ALL') {
          // we remove all labels from the value array
          filter.value = [];
        } else {
          const _idx = filter.value.indexOf(label);
          filter.value.splice(_idx, 1);
        }
      } else {
        // we add the label to the value array
        if (label.length > 1) {
          this._filters[idx] = {key, value: label}
        } else {
          this._filters[idx] = {key, value: [... this._filters[idx].value, label]};
        }
      }
    } else {
      // the filter doesn't exist so we have to create a new one
      label.length > 1 ?
        this._filters.push({key, value: label}) :
        this._filters.push({key, value: [label]});
    }
    this._emitFilters();
  }

  _filter(): void {
    const filteredData = this._data.filter(d => this._filters.every(f => {

      if (f.value[0] != 'ALL') {
        return !f.value.includes(d[f.key]);
      } else {
        return false;
      }
      
    }));
    this._renderedData = filteredData;
    this._emitRenderedData();
  }
}
