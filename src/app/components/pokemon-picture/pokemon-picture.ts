import { Component, input } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon';

@Component({
  selector: 'app-pokemon-picture',
  imports: [],
  templateUrl: './pokemon-picture.html',
  styleUrl: './pokemon-picture.css',
})
export class PokemonPicture {
  // @Input() pokemon?: Pokemon;
  pokemon =input<Pokemon | undefined>();
}
