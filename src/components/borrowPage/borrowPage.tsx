import React, { useState } from 'react'
import { Container } from '@material-ui/core';
import BorrowRecord, { BorrowRecordDefaultValue } from '../../interface/BorrowRecord'

interface BorrowPageProps {
    isDisplay?: boolean;
    borrowRecord?: BorrowRecord;
    onSubmit: (borrowRecord: BorrowRecord) => void;
}

const BorrowPage: React.FC<BorrowPageProps> = (props) => {
    const [borrowRecord, setBorrowRecord] = useState(BorrowRecordDefaultValue);

    return (
        <Container component="main" maxWidth="xs" style={props.isDisplay ? {} : { display: 'none' }}>
     
        </Container>
    );
}

export default BorrowPage;