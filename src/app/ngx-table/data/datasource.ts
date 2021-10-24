import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";



export class MyDataSource<T, P, S> implements DataSource<T> {

    private readonly _data: BehaviorSubject<T[]>;
    private _paginator: P | null;
    private _sort: S | null;

    private _loading: ReplaySubject<boolean>;
    public loading$: Observable<boolean>;

    constructor(initialData: T[] = []){
        this._data = new BehaviorSubject(initialData);
        this._paginator = null;
        this._sort = null;
        this._loading = new ReplaySubject(1);
        this.loading$ = this._loading.asObservable();
    }

    get paginator(): P | null { 
        return this._paginator; 
    }

    set paginator(paginator: P | null) {
        this._paginator = paginator;
    }

    get sort(): S | null {
        return this._sort;
    }

    set sort(sort: S | null) {
        this._sort = sort;
    } 

    get data(): T[] {
        return this._data.value;
    }

    set data(data: T[]) {
        this._data.next(data);
    }

    connect(collectionViewer: CollectionViewer): Observable<T[]> {}

    disconnect(collectionViewer: CollectionViewer): void {}
}