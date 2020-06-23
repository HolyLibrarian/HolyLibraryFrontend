export default interface Collection {
    collectionId: string;
    isbn: string;
    author: string;
    name: string;
    publisher: string;
    location: string;
    price: string;
}

export const CollectionDefaultValue: Collection = {
    collectionId: '',
    isbn: '',
    author: '',
    name: '',
    publisher: '',
    location: '',
    price: ''
}