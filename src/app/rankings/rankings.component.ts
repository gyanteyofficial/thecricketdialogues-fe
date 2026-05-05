import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface RankingEntry {
  rank: number;
  prev: number;
  name: string;
  country: string;
  flag: string;
  team: string;
  rating: number;
}

type Format = 'Test' | 'ODI' | 'T20I';
type Category = 'Batting' | 'Bowling' | 'All-rounders';

@Component({
  selector: 'app-rankings',
  imports: [CommonModule],
  templateUrl: './rankings.component.html',
  styleUrl: './rankings.component.css'
})
export class RankingsComponent {
  activeCategory: Category = 'Batting';
  activeFormat: Format = 'Test';
  categories: Category[] = ['Batting', 'Bowling', 'All-rounders'];
  formats: Format[] = ['Test', 'ODI', 'T20I'];

  data: Record<Category, Record<Format, RankingEntry[]>> = {
    Batting: {
      Test: [
        { rank:1, prev:1, name:'Joe Root', country:'England', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', team:'England', rating:889 },
        { rank:2, prev:3, name:'Marnus Labuschagne', country:'Australia', flag:'🇦🇺', team:'Australia', rating:871 },
        { rank:3, prev:2, name:'Steve Smith', country:'Australia', flag:'🇦🇺', team:'Australia', rating:865 },
        { rank:4, prev:4, name:'Kane Williamson', country:'New Zealand', flag:'🇳🇿', team:'New Zealand', rating:852 },
        { rank:5, prev:6, name:'Babar Azam', country:'Pakistan', flag:'🇵🇰', team:'Pakistan', rating:841 },
        { rank:6, prev:5, name:'Rishabh Pant', country:'India', flag:'🇮🇳', team:'India', rating:833 },
        { rank:7, prev:7, name:'David Warner', country:'Australia', flag:'🇦🇺', team:'Australia', rating:821 },
        { rank:8, prev:9, name:'Rohit Sharma', country:'India', flag:'🇮🇳', team:'India', rating:810 },
        { rank:9, prev:8, name:'Dimuth Karunaratne', country:'Sri Lanka', flag:'🇱🇰', team:'Sri Lanka', rating:798 },
        { rank:10, prev:10, name:'Ben Duckett', country:'England', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', team:'England', rating:787 },
      ],
      ODI: [
        { rank:1, prev:1, name:'Babar Azam', country:'Pakistan', flag:'🇵🇰', team:'Pakistan', rating:882 },
        { rank:2, prev:2, name:'Virat Kohli', country:'India', flag:'🇮🇳', team:'India', rating:870 },
        { rank:3, prev:4, name:'Shubman Gill', country:'India', flag:'🇮🇳', team:'India', rating:855 },
        { rank:4, prev:3, name:'Rohit Sharma', country:'India', flag:'🇮🇳', team:'India', rating:842 },
        { rank:5, prev:5, name:'Fakhar Zaman', country:'Pakistan', flag:'🇵🇰', team:'Pakistan', rating:831 },
        { rank:6, prev:7, name:'Quinton de Kock', country:'South Africa', flag:'🇿🇦', team:'South Africa', rating:822 },
        { rank:7, prev:6, name:'David Warner', country:'Australia', flag:'🇦🇺', team:'Australia', rating:815 },
        { rank:8, prev:8, name:'Devon Conway', country:'New Zealand', flag:'🇳🇿', team:'New Zealand', rating:808 },
        { rank:9, prev:10, name:'Jos Buttler', country:'England', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', team:'England', rating:799 },
        { rank:10, prev:9, name:'Pathum Nissanka', country:'Sri Lanka', flag:'🇱🇰', team:'Sri Lanka', rating:791 },
      ],
      T20I: [
        { rank:1, prev:2, name:'Suryakumar Yadav', country:'India', flag:'🇮🇳', team:'India', rating:915 },
        { rank:2, prev:1, name:'Mohammad Rizwan', country:'Pakistan', flag:'🇵🇰', team:'Pakistan', rating:897 },
        { rank:3, prev:3, name:'Babar Azam', country:'Pakistan', flag:'🇵🇰', team:'Pakistan', rating:878 },
        { rank:4, prev:5, name:'Virat Kohli', country:'India', flag:'🇮🇳', team:'India', rating:856 },
        { rank:5, prev:4, name:'Phil Salt', country:'England', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', team:'England', rating:843 },
        { rank:6, prev:6, name:'Rohit Sharma', country:'India', flag:'🇮🇳', team:'India', rating:830 },
        { rank:7, prev:8, name:'Travis Head', country:'Australia', flag:'🇦🇺', team:'Australia', rating:818 },
        { rank:8, prev:7, name:'Nicholas Pooran', country:'West Indies', flag:'🏝️', team:'West Indies', rating:809 },
        { rank:9, prev:9, name:'Glenn Phillips', country:'New Zealand', flag:'🇳🇿', team:'New Zealand', rating:797 },
        { rank:10, prev:11, name:'Heinrich Klaasen', country:'South Africa', flag:'🇿🇦', team:'South Africa', rating:785 },
      ]
    },
    Bowling: {
      Test: [
        { rank:1, prev:1, name:'Jasprit Bumrah', country:'India', flag:'🇮🇳', team:'India', rating:904 },
        { rank:2, prev:2, name:'Pat Cummins', country:'Australia', flag:'🇦🇺', team:'Australia', rating:886 },
        { rank:3, prev:4, name:'Kagiso Rabada', country:'South Africa', flag:'🇿🇦', team:'South Africa', rating:859 },
        { rank:4, prev:3, name:'Stuart Broad', country:'England', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', team:'England', rating:847 },
        { rank:5, prev:5, name:'Mohammed Shami', country:'India', flag:'🇮🇳', team:'India', rating:831 },
        { rank:6, prev:7, name:'Nathan Lyon', country:'Australia', flag:'🇦🇺', team:'Australia', rating:820 },
        { rank:7, prev:6, name:'Ravichandran Ashwin', country:'India', flag:'🇮🇳', team:'India', rating:812 },
        { rank:8, prev:8, name:'Tim Southee', country:'New Zealand', flag:'🇳🇿', team:'New Zealand', rating:800 },
        { rank:9, prev:10, name:'Josh Hazlewood', country:'Australia', flag:'🇦🇺', team:'Australia', rating:789 },
        { rank:10, prev:9, name:'Mark Wood', country:'England', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', team:'England', rating:778 },
      ],
      ODI: [
        { rank:1, prev:1, name:'Jasprit Bumrah', country:'India', flag:'🇮🇳', team:'India', rating:751 },
        { rank:2, prev:3, name:'Shaheen Afridi', country:'Pakistan', flag:'🇵🇰', team:'Pakistan', rating:738 },
        { rank:3, prev:2, name:'Trent Boult', country:'New Zealand', flag:'🇳🇿', team:'New Zealand', rating:725 },
        { rank:4, prev:4, name:'Mohammed Shami', country:'India', flag:'🇮🇳', team:'India', rating:718 },
        { rank:5, prev:6, name:'Kagiso Rabada', country:'South Africa', flag:'🇿🇦', team:'South Africa', rating:709 },
        { rank:6, prev:5, name:'Adil Rashid', country:'England', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', team:'England', rating:701 },
        { rank:7, prev:7, name:'Josh Hazlewood', country:'Australia', flag:'🇦🇺', team:'Australia', rating:694 },
        { rank:8, prev:9, name:'Mustafizur Rahman', country:'Bangladesh', flag:'🇧🇩', team:'Bangladesh', rating:685 },
        { rank:9, prev:8, name:'Lockie Ferguson', country:'New Zealand', flag:'🇳🇿', team:'New Zealand', rating:678 },
        { rank:10, prev:10, name:'Adam Zampa', country:'Australia', flag:'🇦🇺', team:'Australia', rating:671 },
      ],
      T20I: [
        { rank:1, prev:2, name:'Rashid Khan', country:'Afghanistan', flag:'🇦🇫', team:'Afghanistan', rating:828 },
        { rank:2, prev:1, name:'Jasprit Bumrah', country:'India', flag:'🇮🇳', team:'India', rating:812 },
        { rank:3, prev:3, name:'Adil Rashid', country:'England', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', team:'England', rating:795 },
        { rank:4, prev:5, name:'Shaheen Afridi', country:'Pakistan', flag:'🇵🇰', team:'Pakistan', rating:781 },
        { rank:5, prev:4, name:'Sam Curran', country:'England', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', team:'England', rating:769 },
        { rank:6, prev:6, name:'Wanindu Hasaranga', country:'Sri Lanka', flag:'🇱🇰', team:'Sri Lanka', rating:758 },
        { rank:7, prev:8, name:'Mark Wood', country:'England', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', team:'England', rating:744 },
        { rank:8, prev:7, name:'Josh Hazlewood', country:'Australia', flag:'🇦🇺', team:'Australia', rating:737 },
        { rank:9, prev:9, name:'Mujeeb ur Rahman', country:'Afghanistan', flag:'🇦🇫', team:'Afghanistan', rating:725 },
        { rank:10, prev:11, name:'Anrich Nortje', country:'South Africa', flag:'🇿🇦', team:'South Africa', rating:713 },
      ]
    },
    'All-rounders': {
      Test: [
        { rank:1, prev:1, name:'Ben Stokes', country:'England', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', team:'England', rating:459 },
        { rank:2, prev:2, name:'Ravindra Jadeja', country:'India', flag:'🇮🇳', team:'India', rating:437 },
        { rank:3, prev:3, name:'Ravichandran Ashwin', country:'India', flag:'🇮🇳', team:'India', rating:421 },
        { rank:4, prev:4, name:'Jason Holder', country:'West Indies', flag:'🏝️', team:'West Indies', rating:408 },
        { rank:5, prev:5, name:'Mitchell Santner', country:'New Zealand', flag:'🇳🇿', team:'New Zealand', rating:389 },
        { rank:6, prev:7, name:'Shakib Al Hasan', country:'Bangladesh', flag:'🇧🇩', team:'Bangladesh', rating:375 },
        { rank:7, prev:6, name:'Cameron Green', country:'Australia', flag:'🇦🇺', team:'Australia', rating:362 },
        { rank:8, prev:8, name:'Axar Patel', country:'India', flag:'🇮🇳', team:'India', rating:350 },
        { rank:9, prev:9, name:'Colin de Grandhomme', country:'New Zealand', flag:'🇳🇿', team:'New Zealand', rating:338 },
        { rank:10, prev:10, name:'Wiaan Mulder', country:'South Africa', flag:'🇿🇦', team:'South Africa', rating:325 },
      ],
      ODI: [
        { rank:1, prev:1, name:'Shakib Al Hasan', country:'Bangladesh', flag:'🇧🇩', team:'Bangladesh', rating:397 },
        { rank:2, prev:2, name:'Hardik Pandya', country:'India', flag:'🇮🇳', team:'India', rating:378 },
        { rank:3, prev:3, name:'Marcus Stoinis', country:'Australia', flag:'🇦🇺', team:'Australia', rating:360 },
        { rank:4, prev:5, name:'Mitchell Santner', country:'New Zealand', flag:'🇳🇿', team:'New Zealand', rating:345 },
        { rank:5, prev:4, name:'Ben Stokes', country:'England', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', team:'England', rating:338 },
        { rank:6, prev:6, name:'Axar Patel', country:'India', flag:'🇮🇳', team:'India', rating:325 },
        { rank:7, prev:7, name:'Sikandar Raza', country:'Zimbabwe', flag:'🇿🇼', team:'Zimbabwe', rating:312 },
        { rank:8, prev:8, name:'Faheem Ashraf', country:'Pakistan', flag:'🇵🇰', team:'Pakistan', rating:302 },
        { rank:9, prev:10, name:'Dhananjaya de Silva', country:'Sri Lanka', flag:'🇱🇰', team:'Sri Lanka', rating:289 },
        { rank:10, prev:9, name:'Thisara Perera', country:'Sri Lanka', flag:'🇱🇰', team:'Sri Lanka', rating:278 },
      ],
      T20I: [
        { rank:1, prev:1, name:'Hardik Pandya', country:'India', flag:'🇮🇳', team:'India', rating:382 },
        { rank:2, prev:2, name:'Shakib Al Hasan', country:'Bangladesh', flag:'🇧🇩', team:'Bangladesh', rating:364 },
        { rank:3, prev:4, name:'Sikandar Raza', country:'Zimbabwe', flag:'🇿🇼', team:'Zimbabwe', rating:348 },
        { rank:4, prev:3, name:'Sam Curran', country:'England', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', team:'England', rating:335 },
        { rank:5, prev:5, name:'Mitchell Santner', country:'New Zealand', flag:'🇳🇿', team:'New Zealand', rating:320 },
        { rank:6, prev:6, name:'Marcus Stoinis', country:'Australia', flag:'🇦🇺', team:'Australia', rating:309 },
        { rank:7, prev:8, name:'Gerhard Erasmus', country:'Namibia', flag:'🇳🇦', team:'Namibia', rating:295 },
        { rank:8, prev:7, name:'Liam Livingstone', country:'England', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', team:'England', rating:283 },
        { rank:9, prev:9, name:'Faheem Ashraf', country:'Pakistan', flag:'🇵🇰', team:'Pakistan', rating:271 },
        { rank:10, prev:11, name:'Ravindra Jadeja', country:'India', flag:'🇮🇳', team:'India', rating:259 },
      ]
    }
  };

  get currentRankings(): RankingEntry[] {
    return this.data[this.activeCategory][this.activeFormat];
  }

  getRankChange(entry: RankingEntry): { label: string; cls: string } {
    const diff = entry.prev - entry.rank;
    if (diff > 0) return { label: `▲${diff}`, cls: 'up' };
    if (diff < 0) return { label: `▼${Math.abs(diff)}`, cls: 'down' };
    return { label: '—', cls: 'same' };
  }

  getRankMedal(rank: number): string {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
  }

  getRatingColor(rating: number): string {
    if (rating >= 880) return '#ffc107';
    if (rating >= 820) return '#4fc3f7';
    if (rating >= 760) return '#81c784';
    return '#90a4ae';
  }
}
