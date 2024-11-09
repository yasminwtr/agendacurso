import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { IoIosClose } from "react-icons/io";

const ParametrizedAlert = ({ open, type = "success", message, duration = 5000, close }) => {
    const [showAlert, setShowAlert] = useState(open);

    useEffect(() => {
        if (open) {
            setShowAlert(true);
            const timer = setTimeout(() => {
                setShowAlert(false);
                close && close(); 
            }, duration);

            return () => clearTimeout(timer); 
        }
    }, [open, duration, close]);

    const handleClose = () => {
        setShowAlert(false);
        close && close(); 
    };

    return (
        <Collapse in={showAlert} style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
            <Alert
                severity={type}
                action={
                    <IconButton aria-label="close" color="inherit" size="small" onClick={handleClose}>
                        <IoIosClose size={20} />
                    </IconButton>
                }
            >
                {message}
            </Alert>
        </Collapse>
    );
};

export default ParametrizedAlert;
