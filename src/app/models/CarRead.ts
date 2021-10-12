import { ReservationRead } from "./ReservationRead";
export class CarRead {
     id: number;
     name: string;
     gearShift: string;
     door: number;
     seat: number;
     bluetooth: boolean;
     mp: boolean;
     navigationSystem: boolean;
     parkingSensors: boolean;
     centralLocking: boolean;
     airConditioner: boolean;
     photo: string;
     pricePerDay: number;
     reservations: Array<ReservationRead>;
     constructor(init?: Partial<CarRead>){
        Object.assign(this, init);
    }
}
