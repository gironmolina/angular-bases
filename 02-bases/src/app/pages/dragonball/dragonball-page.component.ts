// import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  // imports: [ NgClass ],
  templateUrl: './dragonball-page.component.html'
})
export class DragonballPageComponent {
  public name = signal('');
  public power = signal(0);

  public characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9001 },
    // { id: 2, name: 'Vegeta', power: 8000 },
    // { id: 3, name: 'Piccolo', power: 3000 },
    // { id: 4, name: 'Yamcha', power: 500 },
  ]);

  powerClasses = computed(()=> {
    return {
      'text-danger': true,
    }
  })

  public addCharacter():void {
    if (!this.name() || !this.power || this.power() <= 0){
      return;
    }

    const newCharacter:Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power()
    }

    this.characters.update((list) => [...list, newCharacter]);
    this.resetField();
  }

  private resetField():void {
    this.name.set('');
    this.power.set(0);
  }
}
