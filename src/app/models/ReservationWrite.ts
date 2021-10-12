export class ReservationWrite {
    startDate: Date;
    endDate: Date;
    customerName: string;
    carId: number;
    constructor(init?: Partial<ReservationWrite>){
        Object.assign(this, init);
    }
}
