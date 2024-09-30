import { Injectable } from '@angular/core';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  id: number = 1;

  constructor() { }

  async send(title: string, body: string) {
    let options: ScheduleOptions = {
      notifications: [
        {
          id: this.id,
          title: title,
          body: body,
          smallIcon: 'res://drawable/icono',
          largeIcon: 'res://drawable/icono',

        }
      ]
    }
    this.id++;
    try {
      await LocalNotifications.schedule(options);
    } catch (e) {
      console.log(e);
    }
  }
}
