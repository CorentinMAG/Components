import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable()
export class DataService {


    private data: object[];
    private dataSubject: BehaviorSubject<object[]>;
    public data$: Observable<object>;

    constructor() {
        this.data = [];
        this.dataSubject = new BehaviorSubject(this.data);
        this.data$ = this.dataSubject.asObservable();
    }

    private emitData() {
        this.dataSubject.next(this.data);
    }

    public addData(data: object) {
        this.data.push(data);
        this.emitData();
    }

    public removeData(data: object) {
        const idx = this.data.indexOf(data);
        this.data.splice(idx, 1);
        this.emitData();
    }

    public updateData(oldData: object, newData: object) {
        const idx = this.data.indexOf(oldData);
        this.data[idx] = newData;
        this.emitData();
    }
}