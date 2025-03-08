import { Component } from '@angular/core';
import { SleepJournalReminderService } from '../services/sleep-journal-reminder.service';

@Component({
  selector: 'app-insight',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: false
})
export class InsightPage {

  reminderTime: string = '';

  constructor(private sleepReminderService: SleepJournalReminderService) {}

  schedule_reminder() {
    const reminderTime = new Date(new Date().getTime() + 5 * 1000); 
    this.reminderTime = reminderTime.toString();

    this.sleepReminderService.scheduleReminder(reminderTime);

    // Feedback
    alert(`Reminder scheduled for: ${this.reminderTime}`);
  }
}
