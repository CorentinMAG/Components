import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { OverlayService } from '../../services/overlay.service';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}


@Component({
  selector: 'ngx-overlay',
  templateUrl: './ngx-overlay.component.html',
  styleUrls: ['./ngx-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxOverlayComponent implements OnInit {

  @Input() data: string[] = [];
  @Input() key: string = "";
  value: string = '';

  _data!: {value: string, checked: boolean}[];

  renderedData!: {value: string, checked: boolean}[];

  allComplete: boolean = true;

  constructor(
    private dataService: OverlayService
  ) {}

  ngOnInit(): void {
    this._data = this.data.map(d => {return {value: d, checked: true}})
    this.renderedData = this._data;
  }

  filter(value: string): void {
    this.renderedData = this._data.filter(d => d.value.toString().toLowerCase().includes(value));
  }

  onChange(e: any): void {
    const value = e.target.value;
    this.filter(value);
  }

  updateAllComplete(): void {
    this.allComplete = this.renderedData.every(d => d.checked);
    
  }

  someComplete(): boolean {
    return this.renderedData.filter(d => d.checked).length > 0 && !this.allComplete;
  }

  setAll(checked: boolean): void {
    this.allComplete = checked;

    this.renderedData.forEach(d => d.checked = checked);
    
  }

  checkListChange(e: any): void {
    const label = e.source.value;
    const isChecked = e.checked;
    this.dataService.filter(this.key, label, isChecked);
  }
}
