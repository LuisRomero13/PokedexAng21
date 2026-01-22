import { Component, effect, inject, input, signal } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {
  pokemon = input<Pokemon | undefined>();
  pokemonService = inject(PokemonService);
  description = signal<string | null>(null);
  gen = signal<string | null>(null)

  constructor() {
    effect(() => {
      const poke = this.pokemon();
      if (poke == null) return;
      this.cargarDescripcion(poke);
      this.cargarGen(poke)
    });
  }
  cargarGen(poke: Pokemon) {
    this.pokemonService.getGenObs(poke.id || 0).subscribe((gen) => {
      this.gen.set(gen);
    });;
  }
  cargarDescripcion(poke: Pokemon) {
    this.pokemonService.getDescripcionObs(poke.id || 0).subscribe((desc) => {
      this.description.set(desc);
    });
  }
}
