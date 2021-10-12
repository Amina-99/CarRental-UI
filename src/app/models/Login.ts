export class Login {
    username: string;
    password: string;
    constructor(init?: Partial<Login>){
        Object.assign(this, init);
    }
}
