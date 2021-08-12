import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { IProduct } from "../interfaces/products-interfaces";

export type NotificationType = 'text' | 'product';

export interface Notification {
    type: NotificationType,
    text: string,
    product?: IProduct,
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
    public notification$ = new Subject<Notification>();

    textNotice(text: string) {
        this.notification$.next({ type: 'text', text })
    }

    productNotice(text: string, product: IProduct) {
        this.notification$.next({ type: 'product', text, product })
    }
}