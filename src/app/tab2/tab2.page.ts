import { Component } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class LogPage {
  selectedLevel: number | null = null;
  currentTime: Date = new Date();
  sleepinessNotes: string = '';
  
  // Add variables to store selected times
  bedtime: string = new Date().toISOString();
  waketime: string = new Date().toISOString();
  sleepinessTime: string = '';
  lastLoggedSleep?: OvernightSleepData;

  constructor(private sleepService: SleepService) {
    // Update time every minute
    setInterval(() => {
      this.currentTime = new Date();
    }, 60000);
  }

  selectLevel(level: number) {
    this.selectedLevel = level;
  }

  async logSleep() {
    const sleepData = new OvernightSleepData(
      new Date(this.bedtime), // sleepStart
      new Date(this.waketime) // sleepEnd
    );
    
    await this.sleepService.logOvernightData(sleepData);
    this.lastLoggedSleep = sleepData;
  }

  logSleepiness() {
    console.log('Selected Level:', this.selectedLevel);
    console.log('Sleepiness Time:', this.sleepinessTime);
    if (this.selectedLevel && this.sleepinessTime) {
      const sleepinessData = new StanfordSleepinessData(
        this.selectedLevel,
        new Date(this.sleepinessTime)
      );
      this.sleepService.logSleepinessData(sleepinessData);
      console.log('Sleepiness logged:', sleepinessData); // Debug log
      
      // Clear form
      this.selectedLevel = null;
      this.sleepinessTime = '';
      this.sleepinessNotes = '';
    }
  }
}