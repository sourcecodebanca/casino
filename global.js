var Audio = {
    init: function() {
        this._soundIdList = {};
        this._backgroundMusicId = -1;
        this._recordingIdList = {};
        this._curMusic = this._mutingMusic = this._mutingSound = null;
        this._curEffectVolume = this._curMusicVolume = 1;
        this._muteWhenRecording = !1;
        cc.sys.isNative && jsb.AudioEngine.lazyInit()
    },
    isMutingSound: function() {
        return this._mutingSound || "1" == userGameData.getItem("muting_sound")
    },
    setMutingSound: function(b) {
        this._mutingSound = b;
        userGameData.setItem("muting_sound", b)
    },
    isMutingMusic: function() {
        return this._mutingMusic ||
            "1" == userGameData.getItem("muting_music")
    },
    setMutingMusic: function(b) {
        this._mutingMusic = b;
        userGameData.setItem("muting_music", b ? "1" : "0");
        null != this._curMusic && (b ? this.stopMusic() : 0 < this._curMusic.length && (b = this._curMusic, this._curMusic = null, this.playMusic(b)))
    },
    playMusic: function(b, d) {
        if (null == this._curMusic || null == b || this._curMusic != b) this._curMusic = b, this.stopMusic(), this.isMutingMusic() || (d = d || !0, cc.sys.isNative ? this._backgroundMusicId = jsb.AudioEngine.play2d(b, d) : cc.audioEngine.playMusic(b, d))
    },
    stopMusic: function() {
        cc.sys.isNative ? (-1 < this._backgroundMusicId && jsb.AudioEngine.stop(this._backgroundMusicId), this._backgroundMusicId = -1) : cc.audioEngine.stopMusic()
    },
    pauseMusic: function() {
        cc.sys.isNative ? -1 < this._backgroundMusicId && jsb.AudioEngine.pause(this._backgroundMusicId) : cc.audioEngine.pauseMusic()
    },
    resumeMusic: function() {
        cc.sys.isNative ? -1 < this._backgroundMusicId && jsb.AudioEngine.resume(this._backgroundMusicId) : cc.audioEngine.resumeMusic()
    },
    rewindMusic: function() {},
    isMusicPlaying: function() {
        if (cc.sys.isNative) {
            if (-1 <
                this._backgroundMusicId && 2 == jsb.AudioEngine.getState(this._backgroundMusicId)) return !0
        } else return cc.audioEngine.isMusicPlaying();
        return !1
    },
    playEffect: function(b, d) {
        if (!this.isMutingSound()) {
            d = d || !1;
            var e;
            e = cc.sys.isNative ? jsb.AudioEngine.play2d(b, d) : cc.audioEngine.playEffect(b, d); - 1 != e && this._soundIdList && this._soundIdList[b] != e && (this._soundIdList[b] = e)
        }
    },
    stopEffect: function(b) {
        this._soundIdList[b] && (cc.sys.isNative ? jsb.AudioEngine.stop(this._soundIdList[b]) : cc.audioEngine.stopEffect(this._soundIdList[b]))
    },
    unloadEffect: function(b) {
        cc.sys.isNative ? jsb.AudioEngine.uncache(b) : cc.audioEngine.unloadEffect("")
    },
    addMusicVolume: function() {
        this._curMusicVolume += 0.1;
        1 < this._curMusicVolume && (this._curMusicVolume = 1);
        this.setMusicVolume(this._curMusicVolume)
    },
    subMusicVolume: function() {
        this._curMusicVolume -= 0.1;
        0 > this._curMusicVolume && (this._curMusicVolume = 0);
        this.setMusicVolume(this._curMusicVolume)
    },
    setMusicVolume: function(b) {
        this._curMusicVolume = b; - 1 < this._backgroundMusicId && (cc.sys.isNative ? jsb.AudioEngine.setVolume(this._backgroundMusicId,
            this._curMusicVolume) : cc.audioEngine.setMusicVolume(b))
    },
    addEffectsVolume: function() {
        this._curEffectVolume += 0.1;
        1 < this._curEffectVolume && (this._curEffectVolume = 1);
        this.setEffectVolume(this._curEffectVolume)
    },
    subEffectsVolume: function() {
        this._curEffectVolume -= 0.1;
        0 > this._curEffectVolume && (this._curEffectVolume = 0);
        this.setEffectVolume(this._curEffectVolume)
    },
    setEffectVolume: function(b) {
        this._curEffectVolume = b;
        for (var d in this._soundIdList) cc.sys.isNative ? jsb.AudioEngine.setVolume(this._soundIdList[d],
            this._curEffectVolume) : cc.audioEngine.setEffectsVolume(this._soundIdList[d], this._curEffectVolume)
    },
    pauseEffect: function(b) {
        this._soundIdList[b] && (cc.sys.isNative ? jsb.AudioEngine.stop(this._soundIdList[b]) : cc.audioEngine.stopEffect(this._soundIdList[b]))
    },
    resumeEffect: function(b) {
        this._soundIdList[b] && (cc.sys.isNative ? jsb.AudioEngine.resume(this._soundIdList[b]) : cc.audioEngine.resume(this._soundIdList[b]))
    },
    pauseAllEffects: function() {
        for (var b in this._soundIdList)
            if (cc.sys.isNative) jsb.AudioEngine.pause(this._soundIdList[b]);
            else {
                cc.audioEngine.pauseAllEffects();
                break
            }
    },
    resumeAllEffects: function() {
        for (var b in this._soundIdList)
            if (cc.sys.isNative) jsb.AudioEngine.resume(this._soundIdList[b]);
            else {
                cc.audioEngine.resume(this._soundIdList[b]);
                break
            }
    },
    stopAllEffects: function() {
        for (var b in this._soundIdList)
            if (cc.sys.isNative) jsb.AudioEngine.stop(this._soundIdList[b]);
            else {
                cc.audioEngine.stopAllEffects();
                break
            }
    },
    setMaxEffectsInstance: function(b) {},
    cleanUp: function() {
        this.stopAllEffects();
        this.stopMusic();
        for (var b in this._soundIdList) delete this._soundIdList[b];
        this._soundIdList = null
    }
};