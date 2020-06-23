export default interface Reader {
    userId: string;
    account: string;
    password: string;
    name: string;
    phoneNumber: string;
    email: string;
    maxBorrowNumber: string;
}

export const ReaderDefaultValue: Reader = {
    userId: '',
    password: '',
    account: '',
    name: '',
    phoneNumber: '',
    email: '',
    maxBorrowNumber: ''
}