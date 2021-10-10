export type DIRECTION = 'top' | 'left' | 'right' | 'bottom';
export type POSITION = 'br' | 'bl' | 'tl' | 'tr';
export type DISPLAY = 'row' | 'column' | 'row-reverse' | 'column-reverse';

export interface State {
    isOpen: boolean,
    direction: DIRECTION,
    position: POSITION,
    isHoverable: boolean
}