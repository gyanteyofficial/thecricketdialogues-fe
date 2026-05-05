import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Question {
  q: string;
  options: string[];
  correct: number;
  category: string;
  fact?: string;
}

type GameState = 'start' | 'playing' | 'result';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit, OnDestroy {
  state: GameState = 'start';
  currentIndex = 0;
  score = 0;
  selected: number | null = null;
  answered = false;
  timeLeft = 15;
  private timer: ReturnType<typeof setInterval> | null = null;
  answers: { correct: boolean; selected: number; time: number }[] = [];
  timeUsed = 0;
  selectedCategory = 'All';
  categories = ['All', 'Records', 'IPL', 'Players', 'History', 'Formats'];

  allQuestions: Question[] = [
    { category:'Records', q:'Who holds the record for most international centuries?', options:['Ricky Ponting','Sachin Tendulkar','Virat Kohli','Brian Lara'], correct:1, fact:'Sachin Tendulkar scored 100 international centuries across Tests and ODIs.' },
    { category:'Records', q:'What is the highest individual score in Test cricket?', options:['365*','375','400*','501*'], correct:2, fact:'Brian Lara scored 400* against England in 2004 in Antigua.' },
    { category:'Records', q:'Who took the most wickets in Test cricket?', options:['Shane Warne','Muttiah Muralitharan','Anil Kumble','James Anderson'], correct:1, fact:'Murali retired with 800 Test wickets.' },
    { category:'Records', q:'Which team scored the highest total in ODI cricket?', options:['India','Australia','England','South Africa'], correct:2, fact:'England scored 498/4 against Netherlands in 2022.' },
    { category:'Records', q:'Who scored the fastest century in T20I cricket?', options:['Rohit Sharma','Chris Gayle','David Miller','Hazratullah Zazai'], correct:1, fact:'Chris Gayle hit a century in just 30 balls in the 2016 T20 World Cup.' },
    { category:'IPL', q:'Which team has won the most IPL titles?', options:['Mumbai Indians','Chennai Super Kings','Kolkata Knight Riders','Royal Challengers Bangalore'], correct:0, fact:'Mumbai Indians have won 5 IPL titles.' },
    { category:'IPL', q:'Who holds the record for most runs in a single IPL season?', options:['Virat Kohli','David Warner','Chris Gayle','Jos Buttler'], correct:0, fact:'Virat Kohli scored 973 runs in the 2016 IPL season.' },
    { category:'IPL', q:'Who is the all-time leading wicket-taker in IPL history?', options:['Lasith Malinga','Yuzvendra Chahal','Dwayne Bravo','Amit Mishra'], correct:0, fact:'Lasith Malinga took 170 wickets in IPL history.' },
    { category:'IPL', q:'Which player has hit the most sixes in IPL history?', options:['AB de Villiers','Chris Gayle','Rohit Sharma','MS Dhoni'], correct:1, fact:'Chris Gayle hit 357 sixes in IPL history.' },
    { category:'IPL', q:'Who captained Kolkata Knight Riders to their first IPL title in 2012?', options:['Sourav Ganguly','Gautam Gambhir','Shah Rukh Khan','Brendon McCullum'], correct:1, fact:'Gautam Gambhir led KKR to titles in 2012 and 2014.' },
    { category:'Players', q:'Which country does Rashid Khan represent?', options:['Pakistan','Bangladesh','Afghanistan','Nepal'], correct:2, fact:'Rashid Khan is considered one of the best T20 bowlers in the world.' },
    { category:'Players', q:'What is Virat Kohli\'s nickname?', options:['King','Run Machine','Chaser','Hitman'], correct:0, fact:'Virat Kohli is commonly called "King Kohli" by his fans.' },
    { category:'Players', q:'Who was the first player to score 10,000 runs in ODI cricket?', options:['Brian Lara','Sachin Tendulkar','Desmond Haynes','Javed Miandad'], correct:1, fact:'Sachin became the first player to achieve this milestone in 1999.' },
    { category:'Players', q:'Which Indian player is known as "The Wall"?', options:['Sourav Ganguly','VVS Laxman','Rahul Dravid','Anil Kumble'], correct:2, fact:'Rahul Dravid earned this nickname for his rock-solid defense.' },
    { category:'History', q:'In which year was the first Cricket World Cup held?', options:['1971','1975','1979','1983'], correct:1, fact:'The first ICC Cricket World Cup was held in England in 1975.' },
    { category:'History', q:'Which team won the inaugural T20 World Cup in 2007?', options:['Australia','Pakistan','India','Sri Lanka'], correct:2, fact:'India beat Pakistan in the final to win the first T20 World Cup.' },
    { category:'History', q:'Who was the first captain to win the ICC Cricket World Cup twice?', options:['Clive Lloyd','Imran Khan','Ricky Ponting','MS Dhoni'], correct:2, fact:'Ricky Ponting captained Australia to World Cup wins in 2003 and 2007.' },
    { category:'History', q:'In which country was Test cricket first played?', options:['England','Australia','India','South Africa'], correct:1, fact:'The first ever Test match was played at Melbourne Cricket Ground in 1877.' },
    { category:'Formats', q:'How many overs are there in a standard ODI match per side?', options:['40','45','50','55'], correct:2, fact:'ODIs consist of 50 overs per team, introduced in the 1970s.' },
    { category:'Formats', q:'What does "LBW" stand for in cricket?', options:['Left Behind Wicket','Leg Before Wicket','Long Ball Wide','Leg Ball Wicket'], correct:1, fact:'LBW stands for Leg Before Wicket — a common mode of dismissal.' },
    { category:'Formats', q:'How many players are on each cricket team?', options:['9','10','11','12'], correct:2, fact:'Each cricket team fields 11 players at a time.' },
    { category:'Formats', q:'What is the maximum number of overs a bowler can bowl in a T20 match?', options:['2','3','4','5'], correct:2, fact:'Each bowler is limited to 4 overs in a T20 match.' },
  ];

  activeQuestions: Question[] = [];

  ngOnInit() {}

  startQuiz() {
    this.activeQuestions = this.selectedCategory === 'All'
      ? this.shuffle([...this.allQuestions]).slice(0, 10)
      : this.shuffle(this.allQuestions.filter(q => q.category === this.selectedCategory)).slice(0, 10);
    if (this.activeQuestions.length < 3) {
      this.activeQuestions = this.shuffle([...this.allQuestions]).slice(0, 10);
    }
    this.currentIndex = 0;
    this.score = 0;
    this.answers = [];
    this.state = 'playing';
    this.startTimer();
  }

  private shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  get currentQuestion(): Question {
    return this.activeQuestions[this.currentIndex];
  }

  selectAnswer(idx: number) {
    if (this.answered) return;
    this.selected = idx;
    this.answered = true;
    this.timeUsed = 15 - this.timeLeft;
    clearInterval(this.timer!);
    if (idx === this.currentQuestion.correct) this.score++;
    this.answers.push({ correct: idx === this.currentQuestion.correct, selected: idx, time: this.timeUsed });
  }

  next() {
    if (this.currentIndex < this.activeQuestions.length - 1) {
      this.currentIndex++;
      this.selected = null;
      this.answered = false;
      this.startTimer();
    } else {
      this.state = 'result';
      clearInterval(this.timer!);
    }
  }

  private startTimer() {
    this.timeLeft = 15;
    clearInterval(this.timer!);
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(this.timer!);
        if (!this.answered) {
          this.answered = true;
          this.selected = -1;
          this.answers.push({ correct: false, selected: -1, time: 15 });
        }
      }
    }, 1000);
  }

  restart() {
    this.state = 'start';
    this.selected = null;
    this.answered = false;
    clearInterval(this.timer!);
  }

  get scoreLabel(): string {
    const pct = this.score / this.activeQuestions.length;
    if (pct === 1) return '🏆 Perfect Score!';
    if (pct >= 0.8) return '⭐ Excellent!';
    if (pct >= 0.6) return '👍 Good Job!';
    if (pct >= 0.4) return '🏏 Keep Practicing!';
    return '📚 Study More Cricket!';
  }

  get timerPct(): number { return (this.timeLeft / 15) * 100; }

  ngOnDestroy() { clearInterval(this.timer!); }
}
