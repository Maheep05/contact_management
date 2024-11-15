import { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import ContactsTable from '../components/ContactsTable';
import AddContactModal from '../components/AddContactModal';
import axios from 'axios';


const ContactPage = () => {
    // local state for handling the  modal
    const [isModalOpen, setModalOpen] = useState(false);
    // local state for handling the fetched contacts
    const [contacts, setContacts] = useState([]);

    // async function to fetch conatacts 
    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/all');
            setContacts(response.data.contacts);
        } catch (error) {
            console.error('Error fetching contacts', error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    // Open the modal
    const handleModalOpen = () => {
        setModalOpen(true);
    };

    // Close the modal
    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: "flex-end", alignItems: 'center', marginBottom: 2 }}>
                <Button variant="contained" color="primary" onClick={handleModalOpen}>
                    New Contact
                </Button>
            </Box>

            <ContactsTable data={contacts} refreshContacts={fetchContacts} />

            {isModalOpen && (
                <AddContactModal isOpen={isModalOpen} onClose={handleModalClose} refetchContacts={fetchContacts} />
            )}
        </Box>
    );
};

export default ContactPage;
