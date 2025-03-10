import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

const loadFromLocalStorage = (): Character[] => {
  const characters = localStorage.getItem('character ');
  return characters ? JSON.parse(characters) : [];
}


@Injectable({providedIn: 'root'})
export class DragonballService {
  public characters = signal<Character[]>(loadFromLocalStorage());

  saveToLocalStorage = effect(() => {
    localStorage.setItem('character', JSON.stringify(this.characters()))
  });

  addCharacter(character: Character){
    this.characters.update(list => [...list, character]);
  }
}
