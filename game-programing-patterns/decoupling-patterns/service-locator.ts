class AudioTemplate {
    playSound(id: number): void { }
    stopSound(id: number): void { }
    stopAllSound(): void { }
}
class ConsoleAudio extends AudioTemplate {
    playSound(id: number): void {
        // 使用控制台音频 API 播放声音
    }
    stopSound(id: number): void {
        // 使用控制台音频 API 停止声音
    }
    stopAllSound(): void {
        // 使用控制台音频 API 停止所有声音
    }
}

class Locator {
    static _service: AudioTemplate;
    static _nullService: AudioTemplate = new AudioTemplate();
    static init(): void {
        this._service = this._nullService;
    }

    static getAudio(): AudioTemplate {
        return this._service;
    }
    static provide(service: AudioTemplate) {
        if (service === null) {
            this._service = this._nullService;
        } else {
            this._service = service;
        }
    }
}

// 在任何尝试使用该服务之前，它都依赖于一些外部代码来注册服务提供者
Locator.provide(new ConsoleAudio);

// getAudio 函数进行定位，可以从代码库中的任何位置调用它，它将提供要使用的服务实例
let audio: ConsoleAudio = Locator.getAudio();
audio.playSound(0);