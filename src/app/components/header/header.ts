import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MusicPlayer } from "../music-player/music-player";

@Component({
  selector: 'app-header',
  imports: [MusicPlayer],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  
}
