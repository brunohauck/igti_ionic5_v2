export class User{

    constructor(
        public _id: string,
        public name: string,
        public username: string,
        public email: string,
        public phone: string,
        public password: string,
        public img_url: string ){}
}