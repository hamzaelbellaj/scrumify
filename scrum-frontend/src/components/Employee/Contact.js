import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import emailjs from 'emailjs-com';
import BackToDashboard from '../BackToDashboard';


const ContactForm = () => {
    const [employee, setEmployee] = useState(null);
    const [formData, setFormData] = useState({ subject: '', message: '', motif: '' });
    const employeeId = localStorage.getItem('employeeId');
    
    // Constante pour l'email du récepteur (manager)
    const managerEmail = 'arabpremiumsolutions@gmail.com'; // Remplacez par l'email réel

    useEffect(() => {
        const fetchEmployee = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`https://scrumify.engineer/api/employees/${employeeId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setEmployee(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données de l\'employé:', error);
            }
        };

        fetchEmployee();
    }, [employeeId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const sendEmail = (e) => {
        e.preventDefault();
        if (!employee) {
            console.error('Aucune information sur l\'employé disponible pour l\'envoi de l\'email.');
            return;
        }
        const emailData = {
            name: `${employee.firstName} ${employee.lastName}`,
            email: employee.email,
            subject: formData.subject,
            message: formData.message,
            motif: formData.motif,
            to_email: managerEmail // Ajouter l'email du manager
        };

        emailjs.send('service_7ph26ja', 'template_z92y7gt', emailData, 'd5mMxmLCZHG_FDkEK')
            .then((response) => {
                console.log('Email sent successfully!', response.status, response.text);
                setFormData({ subject: '', message: '', motif: '' }); // Clear the form after sending
            })
            .catch((err) => {
                console.error('Failed to send email. Error:', err);
            });
    };

    if (!employee) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Chargement...</Box>;

    return (
        <Container maxWidth="sm">
             <BackToDashboard />
            <Box sx={{ mt: 4, bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h4" color="text.primary" gutterBottom>
                    Contactez-nous
                </Typography>
                <form onSubmit={sendEmail}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Prénom"
                        defaultValue={employee?.firstName}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Nom"
                        defaultValue={employee?.lastName}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Objet"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        required
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Motif</InputLabel>
                        <Select
                            name="motif"
                            value={formData.motif}
                            label="Motif"
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="Relative à une tâche">Relative à une tâche</MenuItem>
                            <MenuItem value="Autre">Autre</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Envoyer
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default ContactForm;