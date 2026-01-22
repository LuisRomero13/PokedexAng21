import { Component, input, computed, output } from '@angular/core';
import { Resultado } from '../../interfaces/pokeapi';
import { TitleCasePipe } from '@angular/common';
@Component({
  imports: [TitleCasePipe],
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
})
export class PokemonCard{
  seleccionado = input<boolean>(false);
  // fullData? = input<Pokemon>();
  dataPoke = input<Resultado>();
  
  id = computed(() => {
    const pokemon = this.dataPoke();
    if (pokemon && pokemon.url) {
      return pokemon.url.substring(34, pokemon.url.length - 1);
    }
    return '0';
  });
  // output del id cuando se clickea la tarjeta
  clickeado = output<string>();

  onCardClick() {
    this.clickeado.emit(this.id());
  }


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
