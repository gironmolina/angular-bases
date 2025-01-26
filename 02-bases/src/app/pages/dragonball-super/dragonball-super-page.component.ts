import { Component, inject, signal } from '@angular/core';
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";
import { CharacterAddComponent } from '../../components/dragonball/character-add/character-add/character-add.component';
import { Character } from '../../interfaces/character.interface';
import { DragonballService } from '../../services/dragonball.service';

@Component({
  selector: 'dragonball-super',
  templateUrl: './dragonball-super-page.component.html',
  imports: [
    CharacterListComponent,
    CharacterAddComponent
  ]
})
export class DragonballSuperPageComponent {
  public dragonballService = inject(DragonballService);
}
