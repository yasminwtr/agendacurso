'use client'
import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Spacer } from "@nextui-org/react";
import TextField from '@mui/material/TextField';
import useUsers from '../hooks/useUsers';
import ParametrizedAlert from '@/app/components/ParametrizedAlert';

const defaultUserValues = {
    name: '',
    email: '',
    password: '',
};

const UserModal = ({ fetchUsers, isOpen, onClose, onOpen, onOpenChange, user, setUser }) => {
    const { addUser, updateUser, deleteUser } = useUsers();
    const [userValues, setUserValues] = useState(defaultUserValues);
    const [alertConfig, setAlertConfig] = useState({ open: false, type: "success", message: "" });

    useEffect(() => {
        setUserValues(user ? {
            name: user.name,
            email: user.email,
            password: user.password,
        } : defaultUserValues);
    }, [user]);

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async () => {
        const { name, email, password } = userValues;

        if (!name || !email || !password) {
            setAlertConfig({
                open: true,
                type: "error",
                message: "Por favor preencha todos os campos."
            });
            return;

        } else {
            if (!isEmailValid(email)) {
                setAlertConfig({
                    open: true,
                    type: "error",
                    message: "Por favor, insira um email válido."
                });
                return;
            }

            const userData = {
                name,
                email,
                password
            };

            try {
                if (user) {
                    await updateUser(user.id, userData);
                    setAlertConfig({
                        open: true,
                        type: "success",
                        message: "Usuário atualizado com sucesso!"
                    });

                } else {
                    await addUser(userData);
                    setAlertConfig({
                        open: true,
                        type: "success",
                        message: "Usuário adicionado com sucesso!"
                    });
                }

                fetchUsers();
                onClose();

            } catch (error) {
                setAlertConfig({
                    open: true,
                    type: "error",
                    message: "Ocorreu um erro. Tente novamente."
                });
            }
        }
    };

    const handleDelete = async () => {
        try {
            await deleteUser(user.id);
            setAlertConfig({
                open: true,
                type: "success",
                message: "Usuário excluído com sucesso!"
            });

            fetchUsers();
            onClose();

        } catch (error) {
            setAlertConfig({
                open: true,
                type: "error",
                message: "Ocorreu um erro ao excluir o usuário. Tente novamente."
            });
        }
    };

    const handleInputChange = (field) => (value) => {
        setUserValues(prevValues => ({
            ...prevValues,
            [field]: value,
        }));
    };

    return (
        <>
            <Button
                color="primary"
                onClick={() => {
                    setUser(null);
                    onOpen();
                }}
                id='add-button'
            >
                Adicionar usuário
            </Button>

            <ParametrizedAlert
                open={alertConfig.open}
                type={alertConfig.type}
                message={alertConfig.message}
                close={() => setAlertConfig({ ...alertConfig, open: false })}
            />

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='lg'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{user ? 'Atualizar' : 'Adicionar'} usuário</ModalHeader>

                            <ModalBody>
                                <TextField
                                    label="Nome"
                                    value={userValues.name}
                                    onChange={(e) => handleInputChange('name')(e.target.value)}
                                    variant="outlined"
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                />

                                <Spacer />

                                <TextField
                                    label="Email"
                                    value={userValues.email}
                                    onChange={(e) => handleInputChange('email')(e.target.value)}
                                    variant="outlined"
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                />

                                <Spacer />

                                <TextField
                                    label="Senha"
                                    type="password"
                                    value={userValues.password}
                                    onChange={(e) => handleInputChange('password')(e.target.value)}
                                    variant="outlined"
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                />

                                <Spacer />
                            </ModalBody>

                            <ModalFooter>
                                <Button color="default" variant="light" onPress={onClose}>
                                    Fechar
                                </Button>

                                {user ?
                                    <Button color="danger" onPress={handleDelete}>
                                        Excluir
                                    </Button>
                                    : <></>
                                }

                                <Button color="primary" onPress={handleSubmit}>
                                    {user ? 'Atualizar' : 'Adicionar'}
                                </Button>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default UserModal;
