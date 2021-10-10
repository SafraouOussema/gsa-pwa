export class SignUpInfo {
    name: string;
    username: string;
    email: string;
    role: string[];
    password: string;
    address: string;

    constructor(name: string, username: string, email: string, password: string,role:  string[], address: string) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role= role ;
        this.address = address;
    }
}
