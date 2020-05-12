interface AudioParams {
    volume: number;
    id: number;
}

class AudioMgr {
    static instance: AudioMgr;
    static maximalPending: number = 16;
    static pendingArr: AudioParams[];
    static init(): void {
        this.pendingArr = [];
    }
    playSound(id: number, volume: number): void {
        if (AudioMgr.pendingArr.length <= AudioMgr.maximalPending) {
            for (let i = 0; i < AudioMgr.pendingArr.length; i++) {
                //　收到两个播放同一声音的请求时，折叠为一个请求，以最大的声音为准
                let {
                    id: currentId,
                    volume: currentVolume
                } = AudioMgr.pendingArr[i];
                if (id === currentId) {
                    if (volume > currentVolume) {
                        AudioMgr.pendingArr[i].volume = volume;
                        return;
                    }
                }
            }
            AudioMgr.pendingArr.push({
                id,
                volume
            });
        }
    }
    // 加载并播放音效
    startSound(id: number, volume: number): void { }
    static update(): void {
        this.pendingArr.forEach(({
            id,
            volume
        }) => {
            this.instance.startSound(id, volume);
        });
        this.pendingArr = [];
    }
}