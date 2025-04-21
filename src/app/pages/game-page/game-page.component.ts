import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css'
})
export class GamePageComponent implements OnInit, AfterViewInit {
  numberCount:number = 2
  round:number = 1
  lifesNumber:number = 3
  textButton:string = 'COMEÇAR!'
  infoButton:string = ''
  isShowingSequence:boolean = true
  colors:string[] = []
  userClicks:string[]  = []
  musicIsActive:boolean = false

  @ViewChild('blueBtn') blueBtn!: ElementRef;
  @ViewChild('yellowBtn') yellowBtn!: ElementRef;
  @ViewChild('redBtn') redBtn!: ElementRef;
  @ViewChild('greenBtn') greenBtn!: ElementRef;
  @ViewChild('orangeBtn') orangeBtn!: ElementRef;
  @ViewChild('life1') life1!: ElementRef;
  @ViewChild('life2') life2!: ElementRef;
  @ViewChild('life3') life3!: ElementRef;

  lifes:ElementRef[] = []

  constructor(
    private musicIsActivate: ActivatedRoute,
    private route: Router
  ){}
  
  ngOnInit(): void {
    this.musicIsActivate.queryParams.subscribe(p => {
      this.musicIsActive = p['audioIsActive'] === 'false'
    })
    console.log(this.musicIsActive);
    
    for (let i = 0; i < this.numberCount; i++) {
      this.colors.push(this.changeRandowColor());
    }
  }

  ngAfterViewInit(): void {
    this.lifes = [this.life1, this.life2, this.life3]
  }

  startGame() {
    if(this.round === 1){
      this.showSequence()
      this.textButton = 'Round ' + String(this.round)
    }else {
      return
    }
  }

  async showSequence() {
    this.isShowingSequence = true
    this.infoButton = 'Espere a sequência'
    for (const cor of this.colors) {
      const btn = this.getButtonElement(cor);
      if (btn) {
        btn.nativeElement.classList.add('active');
        this.colorClick()
        await this.delay(500); // tempo aceso
        btn.nativeElement.classList.remove('active');
        await this.delay(300); // pausa entre as cores
      }
    }

    this.isShowingSequence = false
    this.infoButton = 'Sua vez'
  }

  clickColor(cor:string) {
    if(this.isShowingSequence) return
    this.colorClick()
    this.userClicks.push(cor)
    const indexAtual = this.userClicks.length - 1

    if(cor !== this.colors[indexAtual]) {
      this.error()
      this.lifesNumber--
      for (let life of this.lifes) {
        if(life){
        if (!life.nativeElement.classList.contains('lost')) {
          life.nativeElement.classList.add('lost');
          break; 
        }
      }
      }      
      if(this.lifesNumber <= 0) {
        this.route.navigate(['result'], {queryParams: {
          rounds: this.round
        }})
      }else {
        this.userClicks = []
        return
      }
    }

    if(this.userClicks.length === this.colors.length) {
      this.correct()
      this.nextRound()
    }
  }

  nextRound() {
    this.userClicks = []
    this.colors.push(this.changeRandowColor())
    setTimeout(() => {
      this.showSequence()
    }, 2000)
    this.round++
    this.textButton = 'Round ' + String(this.round)
  }

  getButtonElement(cor: string): ElementRef | null {
    switch (cor) {
      case 'blue': return this.blueBtn;
      case 'yellow': return this.yellowBtn;
      case 'red': return this.redBtn;
      case 'green': return this.greenBtn;
      case 'orange': return this.orangeBtn;
      default: return null;
    }
  }

  changeRandowColor(): string {
    const num = Math.floor(Math.random() * 5) + 1;
    switch (num) {
      case 1: return 'blue';
      case 2: return 'yellow';
      case 3: return 'red';
      case 4: return 'green';
      case 5: return 'orange';
      default: return '';
    }
  }
  
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  colorClick() {
    const som = new Audio('audios/color-click.mp3')
    som.play()
  }

  error() {
    const som = new Audio('audios/error.mp3')
    som.play()
  }

  correct() {
    const som = new Audio('audios/correct.mp3')
    som.play()
  }
}
