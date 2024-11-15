import { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import { toast } from 'sonner';

// eslint-disable-next-line react/prop-types
const AddContactModal = ({ isOpen, onClose, refetchContacts }) => {
    // local state's for managing form sdata
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [jobTitle, setJobTitle] = useState('');

    // create new contact
    const handleSubmit = async () => {
        // fomatting the data according to the api 
        const contactData = {
            firstName,
            lastName,
            email,
            phone,
            company,
            jobTitle,
        };

        try {
            // Add new contact
            await axios.post('http://localhost:3000/create', contactData);
            toast.success('Event has been created')
            onClose(); // Close the modal after submission
            refetchContacts()
            resetForm(); // Reset the form fields
        } catch (error) {
            console.error('Error saving contact:', error);
            toast.error('Failed to save contact');
        }
    };

    // reset form fields 
    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setCompany('');
        setJobTitle('');
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 1,
                }}
            >
                <TextField
                    fullWidth
                    label="First Name"
                    margin="dense"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Last Name"
                    margin="dense"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Email"
                    margin="dense"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Phone"
                    margin="dense"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Company"
                    margin="dense"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Job Title"
                    margin="dense"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                    <Button onClick={onClose} sx={{ marginRight: 1 }}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddContactModal;
