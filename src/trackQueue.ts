import { Container, Matrix} from 'pixi.js';
import { TrackSegment } from './trackSegment';
 
export class TrackQueue {
    private _currentSegment: TrackSegment;
    private _head: TrackSegment;
    private _tail: TrackSegment;
    private _container: Container;

    public constructor(container: Container) {
        let transform = new Matrix(); 
        transform.translate(0, 1);
        transform.scale(100, 100); 

        this._tail = new TrackSegment(Math.PI/2, null);
        this._head = this._tail;
        this._currentSegment = this._tail;
        container.addChild(this._currentSegment.curve.container);
        this._container = container;
    }

    public get current() { return this._currentSegment; }

    public toNext() {
        if(this._currentSegment)
        this._currentSegment = this._currentSegment.next;
    }

    public add() {
        const angle = -Math.PI/4 + (Math.random() * Math.PI/2);
        const next = new TrackSegment(angle, this._head);
        this._head.next = next;
        this._head = next;
        this._container.addChild(next.curve.container);
    }
}