export default interface BorrowRecord {
    userId: string;
    collectionId:string;
}

export const BorrowRecordDefaultValue: BorrowRecord = {
    userId:'',
    collectionId:''
}