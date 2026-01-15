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
  pagina: number = 1;
  // listaPokemon: Signal<Resultado[] | undefined> = toSignal(this.pokemonService.getByPage(this.pagina));
  cargando: boolean = false;
  pokemonSeleccionado?: Pokemon;
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


  // async tarjetaClickeada(id: string) {
  //   if (this.pokemonSeleccionado && id === this.pokemonSeleccionado?.id.toString()) {
  //     return this.cambiarEstadoDetalle();
  //   }
  //   this.pokemonSeleccionado = await this.pokemonService.getById(id);
  // }

  // cambiarEstadoDetalle() {
  //   if (this.pokemonSeleccionado) this.detalle = !this.detalle;
  // }
}
