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

  scheduleReminder() {
    const reminderTime = new Date(new Date().getTime() + 5 * 1000); // 5 seconds from now
    this.reminderTime = reminderTime.toString(); // Convert to string for display purposes

    this.sleepReminderService.scheduleReminder(reminderTime);

    // Feedback
    alert(`Reminder scheduled for: ${this.reminderTime}`);
  }
}
