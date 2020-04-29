/**
 * 处理自上次呼叫以来发生的所有用户输入
 *
 */
function processInput(): void { }

/**
 * 将游戏模拟前进一个步骤
 *
 */
function update(elapsed?: number): void { }

/**
 * 绘制游戏
 *
 */
function render(): void { }

function getCurrentTime(): number {
    return Date.now();
}

function sleep(time: number): void { }

function gameLoop(): void {
    while (true) {
        processInput();
        update();
        render();
    }
}

function gameLoopSleep(): void {
    while (true) {
        let msPerFrame: number = 16; // 每帧的毫秒
        let start: number = getCurrentTime();
        processInput();
        update();
        render();
        sleep(start + msPerFrame - getCurrentTime());
    }
}

function gameLoopStep(): void {
    let lastTime: number = getCurrentTime();
    while (true) {
        let currentTime: number = getCurrentTime();
        let elapsed: number = currentTime - lastTime;
        processInput();
        update(elapsed);
        render();
        lastTime = currentTime;
    }
}

function gameLoopPlayCatchUp(): void {
    let previous: number = getCurrentTime();
    let lag: number = 0;
    let msPerFrame: number = 16; // 每帧的毫秒
    while (true) {
        let currentTime: number = getCurrentTime();
        let elapsed: number = currentTime - previous;
        previous = currentTime;
        lag += elapsed;
        processInput();
        while (lag >= msPerFrame) {
            update();
            lag -= msPerFrame;
        }
        render();
    }
}
