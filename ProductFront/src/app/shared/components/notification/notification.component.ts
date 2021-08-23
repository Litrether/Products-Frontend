import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Notification, NotificationService } from 'src/app/core/services/notification-service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  @Input() delay = 15000;
  public notices: Notification[] = [];
  public text: string;
  public type = "success";
  aSub: Subscription;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.aSub = this.notificationService.notification$.subscribe((notice: Notification) => {
      this.notices.push(notice);
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.notices.splice(this.notices.indexOf(notice), 1);
      }, this.delay)

    })

  }

  ngOnDestroy(): void {
    if (this.aSub)
      this.aSub.unsubscribe();
  }
}
