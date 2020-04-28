enum EventEnum {
    Achievement
}
/**
 * 观察者
 *
 * @class Observer
 */
class Observer {
    onNotify(entity, event: EventEnum): void { }
}

class Achievement extends Observer {
    onNotify(entity, event: EventEnum): void {
        if (event === EventEnum.Achievement && !this._isUnlocked) {
            this.unlock();
        }
    }
    private _isUnlocked: boolean = false;
    private unlock(): void {
        console.log('unlock');
    }
}

/**
 * 被观察者（主题）
 *
 * @class Subject
 */
class Subject {

    /**
     * 通知观察者
     *
     * @param {*} entity
     * @param {EventEnum} event
     * @memberof Subject
     */
    protected notify(entity, event: EventEnum): void {
        this._observerArr.forEach((observer: Observer) => {
            observer.onNotify(entity, event);
        });
    }

    /**
     * 添加观察者
     *
     * @param {Observer} observer
     * @memberof Subject
     */
    addObserver(observer: Observer): void {

    }

    /**
     * 移除观察者
     *
     * @param {Observer} observer
     * @memberof Subject
     */
    removeObserver(observer: Observer): void {

    }
    /**
     * 观察者列表，保证每个观察者是被独立处理的，不会相互干扰
     *
     * @private
     * @type {Observer[]}
     * @memberof Subject
     */
    private _observerArr: Observer[];
}