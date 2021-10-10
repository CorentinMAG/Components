import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { TooltipComponent } from '../components/tooltip/tooltip.component';

@Directive({
  selector: '[appTooltip]',
  exportAs: 'appTooltip'
})
export class TooltipDirective implements OnInit {

  @Input('ngxTooltip') text: string;

  private _overlayRef!: OverlayRef;

  constructor(
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef,
    private overlay: Overlay) {
    this.text = 'tooltip';
  }

  ngOnInit(): void {

    const positionStrategy = this.overlayPositionBuilder
    .flexibleConnectedTo(this.elementRef)
    .withPositions([{
      offsetX: -40,
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center'
    }])
    this._overlayRef = this.overlay.create({positionStrategy});
  }

  // @HostListener('mouseenter')
  show() {
    const tooltipPortal = new ComponentPortal(TooltipComponent);
    const tooltipRef: ComponentRef<TooltipComponent> = this._overlayRef.attach(tooltipPortal);
    tooltipRef.instance.text = this.text;
  }

  // @HostListener('mouseout')
  hide() {
    this._overlayRef.detach();
  }

}
