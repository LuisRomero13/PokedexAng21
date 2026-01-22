import { Component, ElementRef, inject, OnInit, Signal, signal, ViewChild } from '@angular/core';
import { PokemonCard } from '../../components/pokemon-card/pokemon-card';
import { PokemonPicture } from '../../components/pokemon-picture/pokemon-picture';
import { PokemonService } from '../../services/pokemon.service';
import { Resultado } from '../../interfaces/pokeapi';
import { Pokemon } from '../../interfaces/pokemon';
import { tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Detail } from "../../components/detail/detail";

@Component({
  selector: 'app-home',
  imports: [PokemonCard, PokemonPicture, MatPaginatorModule, Detail],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  @ViewChild('tarjetas') tarjetasElement!: ElementRef;
  pokemonService = inject(PokemonService);
  listaPokemon = signal<Resultado[]>([]);
  pokemonSeleccionado = signal<Pokemon | undefined>(undefined);
  pokemonSeleccionadoId = signal<string>('');
  pageIndex: number = 0;
  pageSize: number = 10;
  totalPokemon: number = 1302;
  cargando: boolean = false;
  detalle: boolean = false;

  constructor() {
    this.cargarPokemon(this.pageIndex, this.pageSize);
  }

  cargarPokemon(pageIndex: number, pageSize: number) {
    this.cargando = true;
    const paginaServicio = pageIndex + 1;
    this.pokemonService
      .getByPage(paginaServicio, pageSize)
      .pipe(tap((data) => this.listaPokemon.set(data)))
      .subscribe(() => {
        this.cargando = false;
      });
  }

  onPaginationChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.cargarPokemon(event.pageIndex, event.pageSize);
  }

  tarjetaClickeada(id: string) {
    this.pokemonSeleccionadoId.set(id);
    this.pokemonService.getByIdObs(id).subscribe((data) => {
      this.pokemonSeleccionado.set(data);
    });
  }

  cambiarEstadoDetalle() {
    if (this.pokemonSeleccionado()) this.detalle = !this.detalle;
  }
}
