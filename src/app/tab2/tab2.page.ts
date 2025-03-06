import { Component } from '@angular/core';

@Component({
  selector: 'app-log',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class LogPage {
  selectedLevel: number | null = null;
  currentTime: Date = new Date();
  sleepinessNotes: string = '';

  constructor() {
    // Update time every minute
    setInterval(() => {
      this.currentTime = new Date();
    }, 60000);
  }

  selectLevel(level: number) {
    this.selectedLevel = level;
  }
}
