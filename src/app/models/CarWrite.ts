export class CarWrite {
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
     constructor(init?: Partial<CarWrite>){
        Object.assign(this, init);
    }
}
