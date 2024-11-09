'use client'
import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Spacer } from "@nextui-org/react";
import TextField from '@mui/material/TextField';
import useRooms from '@/app/hooks/useRooms';
import ParametrizedAlert from '@/app/components/ParametrizedAlert';

const RoomModal = ({ fetchRooms, isOpen, onClose, onOpen, onOpenChange, room, setRoom }) => {
    const { addRoom, updateRoom, deleteRoom } = useRooms();
    const [name, setName] = useState('')
    const [alertConfig, setAlertConfig] = useState({ open: false, type: "success", message: "" });

    const handleSubmit = async () => {
        if (name === '') {
            setAlertConfig({
                open: true,
                type: "error",
                message: "Por favor preencha o nome."
            });
            return;

        } else {
            try {
                if (room) {
                    await updateRoom(room.id, { name: name });
                    setAlertConfig({
                        open: true,
                        type: "success",
                        message: "Sala atualizada com sucesso!"
                    });

                } else {
                    await addRoom({ name: name });
                    setAlertConfig({
                        open: true,
                        type: "success",
                        message: "Sala adicionada com sucesso!"
                    });
                }

                fetchRooms();
                onClose();
                setName('')

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
            await deleteRoom(room.id);
            setAlertConfig({
                open: true,
                type: "success",
                message: "Sala excluída com sucesso!"
            });

            fetchRooms();
            onClose();

        } catch (error) {
            setAlertConfig({
                open: true,
                type: "error",
                message: "Ocorreu um erro ao excluir a sala. Tente novamente."
            });
        }
    };

    useEffect(() => {
        setName(room ? room.name : '');
    }, [room]);

    return (
        <>
            <Button
                color="primary"
                onClick={() => {
                    setRoom(null);
                    onOpen();
                }}
                id='add-button'
            >
                Adicionar sala
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
                            <ModalHeader className="flex flex-col gap-1">{room ? 'Atualizar' : 'Adicionar'} sala</ModalHeader>

                            <ModalBody>
                                <TextField
                                    label="Nome da sala"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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

                                {room ?
                                    <Button color="danger" onPress={handleDelete}>
                                        Excluir
                                    </Button>
                                    : <></>
                                }

                                <Button color="primary" onPress={handleSubmit}>
                                    {room ? 'Atualizar' : 'Adicionar'}
                                </Button>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default RoomModal;
