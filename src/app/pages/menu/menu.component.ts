import { Component } from '@angular/core';
import { CreditosComponent } from '../../components/creditos/creditos.component';
import { Router } from '@angular/router'

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CreditosComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  creditosIsOpen:boolean = false
  configsOpen:boolean = false
  isAudioPlaying = true;

  constructor( private route: Router ){}

  toggleAudio(event: Event, audioPlayer: HTMLAudioElement): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    this.isAudioPlaying = isChecked;
    if (isChecked) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  }

  startGame() {
    this.route.navigate(['game'], {queryParams: {
      audioIsActive: this.isAudioPlaying
    }})
  }

  openCredits() {
    this.creditosIsOpen = true
  }

  onFecharCreditos() {
    this.creditosIsOpen = false;
  }

  openConfig() {
    this.configsOpen = this.configsOpen == false ? true : false
  }

  clickOption() {
    this.clickSound()
  }
  
  private clickSound() {
    const dice = new Audio('audios/sound_click.mp3')
    dice.play()
  }
}
