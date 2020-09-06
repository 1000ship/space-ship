import GhostBGM from '../Resource/BGM/ghost.mp3'

var bgm = null;

const BGMPlayer = {
  isPlaying: () => bgm !== null,
  play: () => {
    try {
      if (bgm) bgm.pause();
    } catch {}
    bgm = new Audio();
    bgm.loop = true;
    bgm.src = GhostBGM;
    bgm.play();
  },
  pause: () => {
    if( bgm ) bgm.pause();
  },
};

export default BGMPlayer;
