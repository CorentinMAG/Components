import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { StateService } from '../../services/state.service';
import { style, state, transition, animate, trigger } from '@angular/animations';

@Component({
  selector: 'ngx-floating-button-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ngx-floating-button-item.component.html',
  styleUrls: ['./ngx-floating-button-item.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        transform: 'scale(1)',
      })),
      state('closed', style({
        transform: 'scale(0)',
      })),
      transition('open => closed', [animate('0.8s')]),
      transition('closed => open', [animate('0.15s')])
    ])
  ]
})
export class NgxFloatingButtonItemComponent implements OnInit {

  @Input() icon: string = 'home';
  @Input() tooltip: string = this.icon;
  @Input() color: string;
  @Input() disabled: boolean;
  @Input() tooltipDisabled: boolean;

  @ViewChild('elementRef', {read: ElementRef}) elementRef!: ElementRef<HTMLButtonElement>;
  @ViewChild('tooltipRef') tooltipRef!: TooltipDirective;

  constructor(
    public stateService: StateService
  ) {
    this.icon = 'home';
    this.tooltip = this.icon;
    this.color = 'primary';
    this.disabled = false;
    this.tooltipDisabled = false;

  }

  ngOnInit(): void {
  }

}
