import { Container, Matrix} from 'pixi.js';
import { TrackSegment } from './trackSegment';
import { Cave } from './cave';

const DISTANCE_TO_ENDS = 2000;
 
export class TrackQueue {
    private _currentSegment: TrackSegment;
    private _head: TrackSegment;
    private _tail: TrackSegment;
    private _container: Container;
    private _cave: Cave;

    public constructor() {
        let transform = new Matrix(); 
        transform.translate(0, 1);
        transform.scale(100, 100); 

        this._tail = new TrackSegment(Math.PI/2, null);
        this._head = this._tail;
        this._currentSegment = this._tail;
        let container = new Container();
        container.addChild(this._currentSegment.curve.container);
        this._container = container;
        this._cave = new Cave();
        container.addChild(this._cave.container);
    }

    public get container() { return this._container; }
    public get current() { return this._currentSegment; }
    public get next() { return this._currentSegment.next; }

    public distanceToHead = () => this._head.curve.point(1.0).distance(this._currentSegment.curve.point(0.5));
    public distanceToTail = () => this._tail.curve.point(0.0).distance(this._currentSegment.curve.point(0.5));

    public toNext() {
        if(this._currentSegment)
        this._currentSegment = this._currentSegment.next;
    }

    private _add() {
        const angle = -Math.PI/4 + (Math.random() * Math.PI/2);
        const next = new TrackSegment(angle, this._head);
        this._head.next = next;
        this._head = next;
        this._container.addChild(next.curve.container);
        const point = next.curve.point(0.5);
        this._cave.Add(next.curve.transform);
    }

    private _remove() {
        const newTail = this._tail.next;
        this._tail.curve.container.destroy();
        this._tail = newTail;
    }

    public update() {
        while(this.distanceToHead() < DISTANCE_TO_ENDS)
            this._add();
        while(this.distanceToTail() > DISTANCE_TO_ENDS)
            this._remove();
    }
}