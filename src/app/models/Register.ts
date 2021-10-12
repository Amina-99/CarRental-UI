export class Register {
    username: string;
    password: string;
    constructor(init?: Partial<Register>){
        Object.assign(this, init);
    }
}
