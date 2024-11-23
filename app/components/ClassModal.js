'use client'
import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Spacer } from "@nextui-org/react";
import TextField from '@mui/material/TextField';
import useClasses from '../hooks/useClasses';
import ParametrizedAlert from '@/app/components/ParametrizedAlert';

const defaultClassValues = {
    name: '',
    number: '',
    collector: '',
    participants: ''
};

const ClassModal = ({ fetchClasses, isOpen, onClose, onOpen, onOpenChange, classIndividual, setClassIndividual }) => {
    const { addClass, updateClass, deleteClass } = useClasses();
    const [classValues, setClassValues] = useState(defaultClassValues);
    const [alertConfig, setAlertConfig] = useState({ open: false, type: "success", message: "" });

    useEffect(() => {
        setClassValues(classIndividual ? {
            name: classIndividual.name,
            number: classIndividual.number,
            collector: classIndividual.collector,
            participants: classIndividual.participants
        } : defaultClassValues);
    }, [classIndividual]);

    const handleSubmit = async () => {
        const { name, number, collector, participants } = classValues;

        if (!name || !number || !collector || !participants) {
            setAlertConfig({
                open: true,
                type: "error",
                message: "Por favor preencha todos os campos."
            });
            return;

        } else {
            const classData = {
                name,
                number,
                collector,
                participants: parseInt(participants)
            };

            try {
                if (classIndividual) {
                    await updateClass(classIndividual.id, classData);
                    setAlertConfig({
                        open: true,
                        type: "success",
                        message: "Turma atualizada com sucesso!"
                    });

                } else {
                    await addClass(classData);
                    setAlertConfig({
                        open: true,
                        type: "success",
                        message: "Turma adicionada com sucesso!"
                    });
                }

                fetchClasses();
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
            await deleteClass(classIndividual.id);
            setAlertConfig({
                open: true,
                type: "success",
                message: "Turma excluída com sucesso!"
            });

            fetchClasses();
            onClose();

        } catch (error) {
            setAlertConfig({
                open: true,
                type: "error",
                message: "Ocorreu um erro ao excluir a turma. Tente novamente."
            });
        }
    };

    const handleInputChange = (field) => (value) => {
        setClassValues(prevValues => ({
            ...prevValues,
            [field]: value,
        }));
    };

    return (
        <>
            <Button
                color="primary"
                onClick={() => {
                    setClassIndividual(null);
                    onOpen();
                }}
                id='add-button'
            >
                Adicionar turma
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
                            <ModalHeader className="flex flex-col gap-1">{classIndividual ? 'Atualizar' : 'Adicionar'} turma</ModalHeader>

                            <ModalBody>
                                <TextField
                                    label="Nome da turma"
                                    value={classValues.name}
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
                                    label="Número da turma"
                                    value={classValues.number}
                                    onChange={(e) => handleInputChange('number')(e.target.value)}
                                    variant="outlined"
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                />

                                <Spacer />

                                <TextField
                                    label="Coletor"
                                    value={classValues.collector}
                                    onChange={(e) => handleInputChange('collector')(e.target.value)}
                                    variant="outlined"
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                />

                                <Spacer />

                                <TextField
                                    label="Participantes"
                                    type='number'
                                    value={classValues.participants}
                                    onChange={(e) => handleInputChange('participants')(e.target.value)}
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

                                {classIndividual ?
                                    <Button color="danger" onPress={handleDelete}>
                                        Excluir
                                    </Button>
                                    : <></>
                                }

                                <Button color="primary" onPress={handleSubmit}>
                                    {classIndividual ? 'Atualizar' : 'Adicionar'}
                                </Button>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ClassModal;
