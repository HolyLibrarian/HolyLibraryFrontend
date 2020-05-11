export default interface RegisterForm {
    account?: string;
    password?: string;
    name?: string;
    email?: string;
    phone?: string;
}

export const RegisterFormDefaultValue: RegisterForm = {
    account:'',
    password:'',
    name:'',
    email:'',
    phone:'',
}