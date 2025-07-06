export default class Instrument {

    static TYPE_BG_LOOP = 1;
    static TYPE_STANDARD = 2;
    
    constructor(name, sampleMap, type) {

        //basic properties for all types
        this.name = name;

        //object with keys and samples
        this.sampleMap = sampleMap;   

        //types are listed above
        this.type = type;

        //audio buffers (object with note buffer pairs)
        this.buffers = null;
        
        //other attributes are set directly from parent class
        this.notes = null;
        this.loopLength = null;
        this.loopTotal = null;
        this.timingRange = null;
        this.velocityRange = null;
        this.skipChance = null;
        this.noteChance = null;
        this.attack = null;
        this.release = null;
        this.fxLevel = null;
        this.db = null;
    }

    updateBuffers(newBuffers) {
        //object with note buffer pairs
        this.buffers = newBuffers;
    }
}