import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { State } from '../../models/model';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'ngx-floating-button-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ngx-floating-button-item.component.html',
  styleUrls: ['./ngx-floating-button-item.component.scss'],
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

  @HostListener('click')
  onClick(): void {
    const currentState: State = this.stateService.currentState;

    if (!currentState.isHoverable) {
      const newState = {...currentState, isOpen: !currentState.isOpen};
      this.stateService.publish(newState);
    }
  }

}
