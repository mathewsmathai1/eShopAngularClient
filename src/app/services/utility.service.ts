import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  catalogueState!: BehaviorSubject<boolean>;
  currentState: boolean = true;
  constructor() {
    this.catalogueState = new BehaviorSubject(this.currentState);
  }

  setCatalogueState(bool: boolean) {
    //change only if current state is different to avoid unnecessary API calls
    if (this.catalogueState.value != bool) this.catalogueState.next(bool);
  }
}
