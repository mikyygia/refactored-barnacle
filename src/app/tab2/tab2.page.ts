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
  selected_level: number | null = null;
  current_time: Date = new Date();
  sleepiness_notes: string = '';

  bedtime: string = new Date().toISOString();
  waketime: string = new Date().toISOString();

  sleepiness_time: string = new Date().toISOString();
  lastLoggedSleep?: OvernightSleepData;

  constructor(private sleepService: SleepService) { setInterval(() => {this.current_time = new Date();}, 60000); }

  select_level(level: number) { this.selected_level = level; }

  async log_sleep() {
    const sleepData = new OvernightSleepData(
      new Date(this.bedtime),
      new Date(this.waketime)
    );

    await this.sleepService.logOvernightData(sleepData);
    this.lastLoggedSleep = sleepData;
  }

  async log_sleepiness() {
    if (this.selected_level && this.sleepiness_time) {
      const sleepinessData = new StanfordSleepinessData(this.selected_level, new Date(this.sleepiness_time), this.sleepiness_notes);

      await this.sleepService.logSleepinessData(sleepinessData);

      this.selected_level = null;
      this.sleepiness_time = new Date().toISOString();
      this.sleepiness_notes = '';
    }
  }
}
