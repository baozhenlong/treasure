class Particle {
    private _framesLeft: number;
    private _x: number;
    private _y: number;
    private _xVel: number;
    private _yVel: number;
    private _next: Particle;
    constructor() {
        this._framesLeft = 0;
    }
    init(x: number, y: number, xVel: number, yVel: number, lifeTime: number): void {
        this._x = x;
        this._y = y;
        this._xVel = xVel;
        this._yVel = yVel;
        this._framesLeft = lifeTime;
    }
    isUse(): boolean {
        return this._framesLeft > 0;
    }
    // 每帧调用一次
    animate(): boolean {
        if (!this.isUse()) {
            return;
        }
        this._framesLeft--;
        this._x += this._xVel;
        this._y += this._yVel;
        return this._framesLeft === 0;
    }
    setNext(next: Particle): void {
        this._next = next;
    }
    getNext(): Particle {
        return this._next;
    }
}

class ParticlePool {
    private _particleArr: Particle[];
    private _firstAvailableParticle: Particle;
    constructor() {
        this._firstAvailableParticle = this._particleArr[0];
        for (let i = 0; i < this._particleArr.length - 1; i++) {
            this._particleArr[i].setNext(this._particleArr[i + 1]);
        }
        this._particleArr[this._particleArr.length - 1].setNext(null);
    }
    // 每帧调用一次
    animate(): void {
        for (let i = 0; i < this._particleArr.length; i++) {
            let particle: Particle = this._particleArr[i];
            if (particle.animate()) {
                // 将粒子添加到列表的前面
                particle.setNext(this._firstAvailableParticle);
                this._firstAvailableParticle = particle;
            }
        }
    }
    create(x: number, y: number, xVel: number, yVel: number, lifeTime: number): void {
        if (this._firstAvailableParticle !== null) {
            // 将粒子从列表中删除
            let newParticle: Particle = this._firstAvailableParticle;
            this._firstAvailableParticle = newParticle.getNext();
            newParticle.init(x, y, xVel, yVel, lifeTime);
        }
    }
}