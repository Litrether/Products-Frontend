import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export type NotificationType = 'success' | 'danger';

export interface Notification {
    type: NotificationType,
    text: string
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
    public notification$ = new Subject<Notification>();

    success(text: string) {
        this.notification$.next({ type: 'success', text })
    }

    danger(text: string) {
        this.notification$.next({ type: 'danger', text })
    }
}