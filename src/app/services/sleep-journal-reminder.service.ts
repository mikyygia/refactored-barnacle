import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root',
})
export class SleepJournalReminderService {
  constructor() {}

  // Request permission to use notifications
  async requestPermissions() {
    try {
      const permission = await LocalNotifications.requestPermissions();
      
      if (permission.display === 'granted') {
        console.log('Notification permission granted!');
      } else {
        console.log('Notification permission denied!');
      }
    } catch (error) {
      console.error('Something went wrong', error);
    }
  }

  // Schedule a reminder notification
  async scheduleReminder(reminderTime: Date) {
    try {
      // Notification should only happen when permissions are granted
      const permission = await LocalNotifications.requestPermissions();
      
      if (permission.display !== 'granted') {
        console.error('Notification permission not granted');
        return;
      }

      const notification = await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Sleep Log Reminder!',
            body: 'Log your sleeping data!',
            id: 1,
            schedule: { at: reminderTime },
            sound: 'beep.wav',
            actionTypeId: '',
            extra: null,
          },
        ],
      });

      console.log('Sleep scheduled:', notification);
    } catch (error) {
      console.error('Something went wrong.');
    }
  }
}
