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
  @Input() tooltip?: string;
  @Input() color: string = 'primary';
  @Input() disabled: boolean = false;
  @Input() tooltipDisabled: boolean = false;

  @ViewChild('elementRef', {read: ElementRef}) elementRef!: ElementRef<HTMLButtonElement>;
  @ViewChild('tooltipRef') tooltipRef!: TooltipDirective;

  constructor(
    public stateService: StateService
  ) {}

  ngOnInit(): void {
  }

  @HostListener('click')
  onClick(): void {

    if (!this.disabled) {
      const currentState: State = this.stateService.currentState;

      const newState = {...currentState, isOpen: !currentState.isOpen};
      this.stateService.publish(newState);
    }
  }
}
