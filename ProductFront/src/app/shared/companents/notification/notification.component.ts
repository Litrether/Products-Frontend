import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification-service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  @Input() delay = 5000;
  public text: string;
  public type = "success";
  aSub: Subscription;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.aSub = this.notificationService.notification$.subscribe(notice => {
      this.text = notice.text;
      this.type = notice.type;
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.text = '';
      }, this.delay)
    })
  }

  ngOnDestroy(): void {
    if (this.aSub)
      this.aSub.unsubscribe();
  }
}
