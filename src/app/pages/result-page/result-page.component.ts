import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result-page',
  standalone: true,
  imports: [],
  templateUrl: './result-page.component.html',
  styleUrl: './result-page.component.css'
})
export class ResultPageComponent implements OnInit {
  recorde:number = 0

  constructor( private rounds: ActivatedRoute, private route: Router ){}

  ngOnInit(): void {
    this.rounds.queryParams.subscribe(p => {
      this.recorde = p['rounds']
    })

    this.playAudioLose()
  }

  playAgain() {
    this.route.navigate(['game'])
  }

  backToMenu() {
    this.route.navigate(['menu'])
  }

  playAudioLose() {
    const audio = new Audio('audios/lose.mp3')
    audio.play()
  }
}
