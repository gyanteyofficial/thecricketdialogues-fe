import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-did-you-know',
  imports: [CommonModule],
  templateUrl: './did-you-know.component.html',
  styleUrl: './did-you-know.component.css'
})
export class DidYouKnowComponent implements OnInit, OnDestroy {
  private timer: ReturnType<typeof setInterval> | null = null;
  currentIndex = 0;
  visible = true;

  facts = [
    { icon:'🏏', text:'Sachin Tendulkar scored 100 international centuries — a record no one else has come close to matching.' },
    { icon:'🏆', text:'The Ashes is one of cricket\'s oldest rivalries, dating back to 1882 between England and Australia.' },
    { icon:'🌍', text:'Cricket is the second most popular sport in the world with over 2.5 billion fans globally.' },
    { icon:'⚾', text:'Muttiah Muralitharan took 800 Test wickets — a world record that has stood since 2010.' },
    { icon:'🏅', text:'The first ICC Cricket World Cup was held in 1975 and was won by the West Indies.' },
    { icon:'📊', text:'Brian Lara holds the record for the highest individual Test score — 400 not out against England in 2004.' },
    { icon:'🔥', text:'Jasprit Bumrah is the only fast bowler to take a five-wicket haul in all major Test-playing nations.' },
    { icon:'🎯', text:'Don Bradman\'s Test batting average of 99.94 is considered the greatest statistical achievement in any sport.' },
    { icon:'🏟️', text:'The Melbourne Cricket Ground (MCG) is the largest cricket stadium in the world, holding over 100,000 fans.' },
    { icon:'⭐', text:'Yuvraj Singh hit 6 sixes in 6 balls off Stuart Broad during the 2007 T20 World Cup.' },
    { icon:'🇮🇳', text:'India vs Pakistan is the most-watched cricket rivalry, drawing billions of viewers worldwide.' },
    { icon:'📅', text:'A Test match can last up to 5 days — the only major team sport with such a long playing duration.' },
    { icon:'🏏', text:'Chris Gayle scored the fastest T20 International century in just 30 balls during the 2016 World T20.' },
    { icon:'🌟', text:'MS Dhoni is the only captain to win all three ICC trophies: World Cup, Champions Trophy and T20 World Cup.' },
    { icon:'💥', text:'The fastest recorded delivery in cricket was bowled by Shoaib Akhtar at 161.3 km/h (100.2 mph).' },
    { icon:'📖', text:'Cricket was first mentioned in historical records in 1598, in a legal case in Guildford, England.' },
    { icon:'🏆', text:'Mumbai Indians hold the record for most IPL titles, having won the tournament 5 times.' },
    { icon:'🎖️', text:'Virat Kohli holds the record for most ODI centuries by an Indian player, surpassing Sachin Tendulkar.' },
    { icon:'🌏', text:'The first-ever international cricket match was played in 1844 between USA and Canada — not England and Australia!' },
    { icon:'⚡', text:'Rohit Sharma is the only batsman to score three double centuries in ODI cricket.' },
  ];

  get current() { return this.facts[this.currentIndex]; }

  ngOnInit() {
    this.timer = setInterval(() => this.cycle(), 6000);
  }

  private cycle() {
    this.visible = false;
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.facts.length;
      this.visible = true;
    }, 300);
  }

  prev() {
    this.resetTimer();
    this.visible = false;
    setTimeout(() => {
      this.currentIndex = (this.currentIndex - 1 + this.facts.length) % this.facts.length;
      this.visible = true;
    }, 200);
  }

  next() {
    this.resetTimer();
    this.cycle();
  }

  private resetTimer() {
    clearInterval(this.timer!);
    this.timer = setInterval(() => this.cycle(), 6000);
  }

  ngOnDestroy() { clearInterval(this.timer!); }
}
