import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  public localeWatch = new Subject<Boolean>();
  public emitLocaleChange(val) {
		this.localeWatch.next(val);
	}
}
