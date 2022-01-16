import { ConnectedPosition, Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Directive, ElementRef, Input, OnInit } from '@angular/core';
import { TooltipComponent } from '../components/tooltip/tooltip.component';
import { StateService } from '../services/state.service';

@Directive({
  selector: '[appTooltip]',
  exportAs: 'appTooltip'
})
export class TooltipDirective implements OnInit {

  @Input('ngxTooltip') text: string;

  private _overlayRef!: OverlayRef;

  constructor(
    private overlayPositionBuilder: OverlayPositionBuilder,
    private stateService: StateService,
    private elementRef: ElementRef,
    private overlay: Overlay) {
    this.text = 'tooltip';
  }

  ngOnInit(): void {
    const direction = this.stateService.currentState.direction;
    let positions: ConnectedPosition = {} as ConnectedPosition;

    if (direction === 'top' || direction === 'bottom') {
      positions = {
        offsetX: -45,
        originX: 'start',
        originY: 'center',
        overlayX: 'end',
        overlayY: 'center'
      };
    } else if (direction === 'left' || direction === 'right') {
      positions = { 
          offsetY: -55,
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'center'
        };
    }
    
    const positionStrategy = this.overlayPositionBuilder
    .flexibleConnectedTo(this.elementRef)
    .withPositions([positions]);

    this._overlayRef = this.overlay.create({positionStrategy});
  }

  show() {
    const tooltipPortal = new ComponentPortal(TooltipComponent);
    const tooltipRef: ComponentRef<TooltipComponent> = this._overlayRef.attach(tooltipPortal);
    tooltipRef.instance.text = this.text;
  }

  hide() {
    this._overlayRef.detach();
  }
}