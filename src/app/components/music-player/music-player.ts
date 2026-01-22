import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-music-player',
  imports: [],
  templateUrl: './music-player.html',
  styleUrl: './music-player.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicPlayer {

}
