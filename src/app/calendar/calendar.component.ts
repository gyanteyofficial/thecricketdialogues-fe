import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Fixture {
  date: number;
  month: number;
  year: number;
  team1: string;
  flag1: string;
  team2: string;
  flag2: string;
  format: string;
  venue: string;
  time: string;
  status: 'Upcoming' | 'Live' | 'Result';
  result?: string;
}

@Component({
  selector: 'app-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  currentYear = 2026;
  currentMonth = 4; // 0-indexed, so 4 = May
  selectedDay: number | null = null;

  monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  fixtures: Fixture[] = [
    { date:3, month:4, year:2026, team1:'India', flag1:'🇮🇳', team2:'Australia', flag2:'🇦🇺', format:'T20I', venue:'Wankhede, Mumbai', time:'19:00 IST', status:'Result', result:'India won by 6 wickets' },
    { date:5, month:4, year:2026, team1:'England', flag1:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', team2:'South Africa', flag2:'🇿🇦', format:'ODI', venue:'The Oval, London', time:'14:00 BST', status:'Live' },
    { date:5, month:4, year:2026, team1:'Pakistan', flag1:'🇵🇰', team2:'New Zealand', flag2:'🇳🇿', format:'Test', venue:'Gaddafi Stadium, Lahore', time:'10:00 PKT', status:'Live' },
    { date:8, month:4, year:2026, team1:'India', flag1:'🇮🇳', team2:'Australia', flag2:'🇦🇺', format:'T20I', venue:'Chinnaswamy, Bangalore', time:'19:00 IST', status:'Upcoming' },
    { date:10, month:4, year:2026, team1:'West Indies', flag1:'🏝️', team2:'Bangladesh', flag2:'🇧🇩', format:'T20I', venue:'Kensington Oval, Barbados', time:'15:00 AST', status:'Upcoming' },
    { date:12, month:4, year:2026, team1:'CSK', flag1:'🟡', team2:'MI', flag2:'🔵', format:'IPL 2025', venue:'Chepauk, Chennai', time:'19:30 IST', status:'Upcoming' },
    { date:14, month:4, year:2026, team1:'Sri Lanka', flag1:'🇱🇰', team2:'Afghanistan', flag2:'🇦🇫', format:'ODI', venue:'R. Premadasa, Colombo', time:'14:30 IST', status:'Upcoming' },
    { date:15, month:4, year:2026, team1:'RCB', flag1:'🔴', team2:'KKR', flag2:'🟣', format:'IPL 2025', venue:'Chinnaswamy, Bangalore', time:'19:30 IST', status:'Upcoming' },
    { date:18, month:4, year:2026, team1:'Australia', flag1:'🇦🇺', team2:'England', flag2:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', format:'Test', venue:'MCG, Melbourne', time:'10:30 AEST', status:'Upcoming' },
    { date:20, month:4, year:2026, team1:'India', flag1:'🇮🇳', team2:'South Africa', flag2:'🇿🇦', format:'ODI', venue:'Eden Gardens, Kolkata', time:'14:00 IST', status:'Upcoming' },
    { date:22, month:4, year:2026, team1:'DC', flag1:'🔵', team2:'PBKS', flag2:'🔴', format:'IPL 2025', venue:'Arun Jaitley, Delhi', time:'19:30 IST', status:'Upcoming' },
    { date:25, month:4, year:2026, team1:'Pakistan', flag1:'🇵🇰', team2:'West Indies', flag2:'🏝️', format:'T20I', venue:'Karachi NSK', time:'20:00 PKT', status:'Upcoming' },
    { date:28, month:4, year:2026, team1:'New Zealand', flag1:'🇳🇿', team2:'Sri Lanka', flag2:'🇱🇰', format:'ODI', venue:'Basin Reserve, Wellington', time:'11:00 NZST', status:'Upcoming' },
    { date:30, month:4, year:2026, team1:'MI', flag1:'🔵', team2:'GT', flag2:'🔵', format:'IPL 2025', venue:'Wankhede, Mumbai', time:'19:30 IST', status:'Upcoming' },
    // June fixtures
    { date:2, month:5, year:2026, team1:'India', flag1:'🇮🇳', team2:'England', flag2:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', format:'Test', venue:'Headingley, Leeds', time:'11:00 BST', status:'Upcoming' },
    { date:5, month:5, year:2026, team1:'Australia', flag1:'🇦🇺', team2:'Pakistan', flag2:'🇵🇰', format:'ODI', venue:'SCG, Sydney', time:'14:00 AEST', status:'Upcoming' },
    { date:10, month:5, year:2026, team1:'South Africa', flag1:'🇿🇦', team2:'Bangladesh', flag2:'🇧🇩', format:'T20I', venue:'Newlands, Cape Town', time:'18:00 SAST', status:'Upcoming' },
  ];

  calendarDays: (number | null)[] = [];

  ngOnInit() {
    this.buildCalendar();
  }

  buildCalendar() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    this.calendarDays = [];
    for (let i = 0; i < firstDay; i++) this.calendarDays.push(null);
    for (let d = 1; d <= daysInMonth; d++) this.calendarDays.push(d);
    this.selectedDay = null;
  }

  prevMonth() {
    if (this.currentMonth === 0) { this.currentMonth = 11; this.currentYear--; }
    else this.currentMonth--;
    this.buildCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) { this.currentMonth = 0; this.currentYear++; }
    else this.currentMonth++;
    this.buildCalendar();
  }

  selectDay(day: number | null) {
    if (day === null) return;
    this.selectedDay = day;
  }

  hasFixture(day: number | null): boolean {
    if (!day) return false;
    return this.fixtures.some(f => f.date === day && f.month === this.currentMonth && f.year === this.currentYear);
  }

  hasLive(day: number | null): boolean {
    if (!day) return false;
    return this.fixtures.some(f => f.date === day && f.month === this.currentMonth && f.year === this.currentYear && f.status === 'Live');
  }

  isToday(day: number | null): boolean {
    if (!day) return false;
    const now = new Date();
    return day === now.getDate() && this.currentMonth === now.getMonth() && this.currentYear === now.getFullYear();
  }

  get selectedFixtures(): Fixture[] {
    if (!this.selectedDay) return this.fixtures.filter(f => f.month === this.currentMonth && f.year === this.currentYear);
    return this.fixtures.filter(f => f.date === this.selectedDay && f.month === this.currentMonth && f.year === this.currentYear);
  }

  get monthLabel(): string {
    return `${this.monthNames[this.currentMonth]} ${this.currentYear}`;
  }

  formatBadgeCls(format: string): string {
    if (format === 'Test') return 'badge-purple';
    if (format === 'ODI') return 'badge-blue';
    if (format.includes('IPL')) return 'badge-orange';
    return 'badge-green';
  }

  statusCls(status: string): string {
    if (status === 'Live') return 'status-live';
    if (status === 'Upcoming') return 'status-upcoming';
    return 'status-done';
  }
}
