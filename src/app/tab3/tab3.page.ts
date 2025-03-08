import { Component, OnInit } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { SleepData } from '../data/sleep-data';

@Component({
  selector: 'app-history',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class HistoryPage implements OnInit {
  allSleepData: SleepData[] = [];
  sleepRecords: OvernightSleepData[] = [];
  sleepinessData: StanfordSleepinessData[] = [];

  constructor(private sleepService: SleepService) {
    this.allSleepData = this.sleepService.getAllSleepData();
    console.log('History Data:', this.allSleepData); // Debug log
  }

  isSleepData(data: SleepData): boolean {
    return data instanceof OvernightSleepData;
  }

  isSleepinessData(data: SleepData): boolean {
    return data instanceof StanfordSleepinessData;
  }

  ngOnInit() {
    this.sleepService.getSleepRecords().subscribe((records) => {
      this.sleepRecords = records;
    });

    this.sleepService.getSleepinessRecords().subscribe((records) => {
      this.sleepinessData = records;
    });
  }
}