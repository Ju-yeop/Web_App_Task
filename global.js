var textx = 717;
var texts = 40;
var stage = 1;

var nSteps = 15;
var nTracks = 6;
var kit;
var cellWidth, cellHeight;
var beats = 0;
var cells = [];
var currentStep = 0;
var playButton;
var judge = "false";
var drum_judge = "false";
var instrument_img = [];
var illu_img = [];
var drum_effect = ['false','false','false','false','false','false'];
var drum_pos = [[735, 196], [835, 192], [616, 138], [652, 239], [565, 88], [914, 115], [923, 259]];
//-7   -18
var memory_index = 0;
var memory = [[],[],[]];
var beat_text_arr = [1, 2, 3];
var drumNames = ["tom", "hihat", "snare", "kick", "cymbal", "floortom"];
kit = new Tone.Players(
    {"tom" : "./data/tom.mp3",
	"hihat" : "./data/hi-hat.wav",
    "snare" : "./data/snare.mp3",
    "kick" : "./data/kick.mp3",
    "cymbal" : "./data/Crash-Cymbal.wav",
    "floortom" : "./data/Floor-Tom.wav"
    });

kit.toMaster();
Tone.Transport.bpm.value = 167;
Tone.Transport.scheduleRepeat(onBeat, "15n");
scrollbar_arr = [];

function onBeat(time){
    console.log(masterV.getPos());
    kit.volume.value = int(map(masterV.getPos(), 218, 539, -15, 10));
    if(masterV.getPos() < 220){
        kit.volume.value = -50;
    }
    for(var track=0; track<nTracks; track++){
        if(cells[track][currentStep] == 1){
            var drum = kit.get(drumNames[track]);
            // console.log(v1.getPos());
            drum_effect[track] = 'true';
            drum.volume.value = int(map(scrollbar_arr[track].getPos()-1226, 0, 150, -10, 10));
            if(drum.volume.value < - 8.999){
                drum.volume.value = -50;
            }
            //console.log(drum);
            drum.start(time);
        } else{
            drum_effect[track] = 'false';
        }
    }
    beats++;
    currentStep = (beats) % nSteps;
    // console.log(beats, currentStep);
}
