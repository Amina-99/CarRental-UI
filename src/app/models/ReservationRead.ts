export class ReservationRead {
    id: number;
    startDate: Date;
    endDate: Date;
    customerName: string;
    constructor(init?: Partial<ReservationRead>){
        Object.assign(this, init);
}
}