import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SleepJournalReminderService {
  constructor(private platform: Platform) {}

  async scheduleReminder(reminderTime: Date) {
    const permission = await LocalNotifications.requestPermissions();

    if (permission.display === 'granted') {
      const notification = await LocalNotifications.schedule({
        notifications: [
          {
            title: "Sleep Reminder",
            body: "Set a reminder for your next sleep!",
            id: 1,
            schedule: { at: new Date(reminderTime.toISOString()) },
            actionTypeId: '',
            extra: null
          }
        ]
      });
      // console.log('Reminder scheduled', notification);
    } else {
      console.error('Permission not granted for notifications');
    }
  }
}
