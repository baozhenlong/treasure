enum Color {
    White,
    Black
}

class FrameBuffer {
    private _width: number = 100;
    private _height: number = 100;
    private _pixelArr: Color[] = [];

    getPixelArr(): Color[] {
        return this._pixelArr;
    }

    clear(): void {
        for (let i = 0; i < this._width * this._height; i++) {
            this._pixelArr[i] = Color.White;
        }
    }

    draw(x: number, y: number) {
        this._pixelArr[x + this._height + y] = Color.Black;
    }
}

class Scene {
    private _frameBufferArr: FrameBuffer[];
    private _currentFrameBuffer: FrameBuffer;
    private _nextFrameBuffer: FrameBuffer;
    constructor() {
        this._currentFrameBuffer = this._frameBufferArr[0];
        this._nextFrameBuffer = this._frameBufferArr[1];
    }
    draw(): void {
        this._nextFrameBuffer.clear();
        this._nextFrameBuffer.draw(1, 1);
        this._nextFrameBuffer.draw(4, 1);
        this._nextFrameBuffer.draw(4, 1);
        this._swap();
    }
    getBuffer(): FrameBuffer {
        return this._currentFrameBuffer;
    }
    private _swap(): void {
        let temp: FrameBuffer = this._currentFrameBuffer;
        this._currentFrameBuffer = this._nextFrameBuffer;
        this._nextFrameBuffer = temp;
    }
}