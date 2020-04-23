class ClassicsFileSystem {
    instance(): ClassicsFileSystem {
        // 惰性初始化
        if (!this._instance) {
            this._instance = new ClassicsFileSystem();
        }
        return this._instance;
    }
    private _instance: ClassicsFileSystem;
}

class FileSystem {
    static instance(): FileSystem {
        return this._instance;
    };
    static _instance: FileSystem = new FileSystem();
}