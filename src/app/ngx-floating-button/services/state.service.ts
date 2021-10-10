import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { State } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _state: State;
  private _stateSubject$: BehaviorSubject<State>;
  public state$: Observable<State>;

  constructor() {
    this._state = {} as State;
    this._stateSubject$ = new BehaviorSubject(this._state);
    this.state$ = this._stateSubject$.asObservable();
  }

  get currentState(): State {
    return this._state;
  }

  publish(newState: State): void {
    this._state = newState;
    this._stateSubject$.next(newState);
  }
}
