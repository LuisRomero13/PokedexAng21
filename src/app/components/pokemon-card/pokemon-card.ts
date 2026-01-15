import { Component, input, computed } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Resultado } from '../../interfaces/pokeapi';
import { TitleCasePipe } from '@angular/common';
import { Pokemon } from '../../interfaces/pokemon';
@Component({
  selector: 'app-pokemon-card',
  imports: [TitleCasePipe],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
})
export class PokemonCard{

  

  dataPoke = input<Resultado>();
  id = computed(() => {
    const pokemon = this.dataPoke();
    if (pokemon && pokemon.url) {
      return pokemon.url.substring(34, pokemon.url.length - 1);
    }
    return '0';
  });
  seleccionado = input<boolean>(false);
  fullData? = input<Pokemon>();

  // extraerInfromacion(): void {
  //   if (this.dataPoke && this.dataPoke.url !== '') {
  //     this.id = this.dataPoke.url.substring(34, this.dataPoke.url.length - 1);
  //     return;
  //   }
    // if (this.fullData) {
    //   this.id = this.fullData.species.url.substring(42, this.fullData.species.url.length - 1);
    //   this.data = {
    //     name: this.fullData.species.name,
    //     url: '',
    //   };
    // }
  // }

}
