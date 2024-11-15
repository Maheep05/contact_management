import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TablePagination } from '@mui/material';
import axios from 'axios';
import { toast } from 'sonner';

// eslint-disable-next-line react/prop-types
const ContactsTable = ({ data, refetchContacts }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/delete/${id}`);
            toast.success('Contact deleted successfully');
            refetchContacts();
        } catch (error) {
            toast.error('Error deleting contact');
            console.error(error);
        }
    };

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const tableHeaders = ["First Name", "Last Name", "Email", "Phone", "Company", "Job Title"]
    return (
        <>
            {data && data.length > 0 ? (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {tableHeaders.map((item, index) => (<TableCell key={index}>{item}</TableCell>))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((contact) => (
                                <TableRow key={contact._id}>
                                    <TableCell>{contact.firstName}</TableCell>
                                    <TableCell>{contact.lastName}</TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>{contact.phone}</TableCell>
                                    <TableCell>{contact.company}</TableCell>
                                    <TableCell>{contact.jobTitle}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary" onClick={() => handleDelete(contact._id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            ) : (
                <p>No Contacts</p>
            )}</>
    );
};

export default ContactsTable;
