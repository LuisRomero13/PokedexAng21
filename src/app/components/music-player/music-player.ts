import { Component } from '@angular/core';
@Component({
  selector: 'app-music-player',
  imports: [],
  templateUrl: './music-player.html',
  styles: [
    `
      .play-button {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        padding: 10px;
      }
    `,
  ],
})
export class MusicPlayer {
  isPlaying = false;
  audioSrc = 'assets/music/PokTCGOST2020.mp3';

  togglePlay() {
    const audio = document.querySelector('audio') as HTMLAudioElement;

    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    this.isPlaying = !this.isPlaying;
  }

  onAudioEnded() {
    this.isPlaying = false;
  }
}
