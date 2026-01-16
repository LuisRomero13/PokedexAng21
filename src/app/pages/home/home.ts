import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { PokemonCard } from '../../components/pokemon-card/pokemon-card';
import { PokemonPicture } from '../../components/pokemon-picture/pokemon-picture';
import { PokemonService } from '../../services/pokemon.service';
import { Resultado } from '../../interfaces/pokeapi';
import { Pokemon } from '../../interfaces/pokemon';
import { tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [PokemonCard, PokemonPicture],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  pokemonService = inject(PokemonService);
  listaPokemon = signal<Resultado[]>([]);
  pokemonSeleccionado = signal<Pokemon | undefined>(undefined);
  pokemonSeleccionadoId = signal<string>(''); // Agregamos esto para comparar instantáneamente
  pagina: number = 1;
  cargando: boolean = false;
  detalle: boolean = false;

  constructor() {
    this.cargando = true;
    this.pokemonService
      .getByPage(this.pagina)
      .pipe(tap((data) => this.listaPokemon.set([...this.listaPokemon(), ...data])))
      .subscribe();
    this.cargando = false;
    this.pagina++;
  }

  async tarjetaClickeada(id: string) {
    this.pokemonSeleccionadoId.set(id); // Actualizar instantáneamente
    this.pokemonService.getByIdObs(id).subscribe((data) => {
      this.pokemonSeleccionado.set(data);
    });
  }

  cambiarEstadoDetalle() {
    if (this.pokemonSeleccionado()) this.detalle = !this.detalle;
  }
}
