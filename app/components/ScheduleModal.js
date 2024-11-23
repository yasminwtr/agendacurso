'use client'
import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Spacer } from "@nextui-org/react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { ptBR } from '@mui/x-date-pickers/locales';
import useEvents from '@/app/hooks/useEvents';
import useClasses from '@/app/hooks/useClasses';
import useRooms from '@/app/hooks/useRooms';
import useCourseTypes from '@/app/hooks/useCourseTypes';
import ParametrizedAlert from '@/app/components/ParametrizedAlert';

const defaultEventValues = {
    title: '',
    start: dayjs(),
    end: dayjs(),
    classId: 'None',
    roomId: 'None',
    courseTypeId: 'None',
};

const ScheduleModal = ({ fetchEvents, isOpen, onClose, onOpen, onOpenChange, event }) => {
    const { classes } = useClasses();
    const { courseTypes } = useCourseTypes();
    const { rooms } = useRooms();
    const { addEvent, updateEvent, deleteEvent } = useEvents();
    const [eventValues, setEventValues] = useState(defaultEventValues);
    const [alertConfig, setAlertConfig] = useState({ open: false, type: "success", message: "" });

    useEffect(() => {
        setEventValues(event ? {
            title: event.title,
            start: dayjs(event.start).add(3, 'hour'),
            end: dayjs(event.end).add(3, 'hour'),
            classId: event.classId,
            roomId: event.roomId,
            courseTypeId: event.courseTypeId,
        } : defaultEventValues);
    }, [event]);

    const handleSubmit = async () => {
        const { title, start, end, classId, roomId, courseTypeId } = eventValues;

        if (!title || classId === 'None' || roomId === 'None' || courseTypeId === 'None') {
            setAlertConfig({
                open: true,
                type: "error",
                message: "Por favor preencha todos os campos."
            });
            return;

        } else {
            const eventData = {
                title,
                start: dayjs(start).subtract(3, 'hour').format(),
                end: dayjs(end).subtract(3, 'hour').format(),
                classId: parseInt(classId),
                roomId: parseInt(roomId),
                courseTypeId: parseInt(courseTypeId),
            };

            try {
                if (event) {
                    await updateEvent(event.id, eventData);
                    setAlertConfig({
                        open: true,
                        type: "success",
                        message: "Curso atualizado com sucesso!"
                    });

                } else {
                    await addEvent(eventData);
                    setAlertConfig({
                        open: true,
                        type: "success",
                        message: "Curso adicionado com sucesso!"
                    });
                }

                fetchEvents();
                setEventValues(defaultEventValues)
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
            await deleteEvent(event.id);
            setAlertConfig({
                open: true,
                type: "success",
                message: "Curso excluído com sucesso!"
            });

            fetchEvents();
            setEventValues(defaultEventValues)
            onClose();

        } catch (error) {
            setAlertConfig({
                open: true,
                type: "error",
                message: "Ocorreu um erro ao excluir o curso. Tente novamente."
            });
        }
    };

    const handleInputChange = (field) => (value) => {
        setEventValues(prevValues => ({
            ...prevValues,
            [field]: value,
        }));

        if (field === 'courseTypeId' && value === 1) {
            setEventValues(prevValues => ({
                ...prevValues,
                roomId: 1,
            }));
        }
    };

    return (
        <>
            <Button onPress={onOpen} id='agendar-button'>Agendar</Button>

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
                            <ModalHeader className="flex flex-col gap-1">{event ? 'Atualizar' : 'Agendar'} curso</ModalHeader>

                            <ModalBody>
                                <TextField
                                    label="Título da aula"
                                    value={eventValues.title}
                                    onChange={(e) => handleInputChange('title')(e.target.value)}
                                    variant="outlined"
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                />

                                <Spacer />

                                <div className="flex flex-wrap md:flex-nowrap gap-4">
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                        adapterLocale="pt-br"
                                        localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
                                    >
                                        <DemoContainer components={['DateTimeField']}>
                                            <DateTimeField
                                                label="Data e hora inicial"
                                                views={['year', 'month', 'day', 'hours', 'minutes']}
                                                value={eventValues.start}
                                                onChange={handleInputChange('start')}
                                                slotProps={{ textField: { InputLabelProps: { shrink: true } } }}
                                                sx={{ minWidth: '224px !important' }}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>

                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                        adapterLocale="pt-br"
                                        localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
                                    >
                                        <DemoContainer components={['DateTimeField']}>
                                            <DateTimeField
                                                label="Data e hora final"
                                                views={['year', 'month', 'day', 'hours', 'minutes']}
                                                value={eventValues.end}
                                                onChange={handleInputChange('end')}
                                                slotProps={{ textField: { InputLabelProps: { shrink: true } } }}
                                                sx={{ minWidth: '224px !important' }}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>

                                <Spacer />

                                <FormControl>
                                    <InputLabel id="couseType-label">Tipo de curso</InputLabel>
                                    <Select
                                        labelId="couseType-label"
                                        label="Tipo de curso"
                                        value={eventValues.courseTypeId}
                                        onChange={(e) => handleInputChange('courseTypeId')(e.target.value)}
                                        defaultValue={"None"}
                                        MenuProps={{
                                            disablePortal: true,
                                        }}
                                    >
                                        <MenuItem value="None"> <span style={{ color: "#A2A2A2" }}>Selecione o tipo de curso</span></MenuItem>
                                        {courseTypes.map(type => (
                                            <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <Spacer />

                                <FormControl disabled={eventValues.courseTypeId === 1 ? true : false}>
                                    <InputLabel id="room-label">Sala</InputLabel>
                                    <Select
                                        labelId="room-label"
                                        label="Sala"
                                        value={eventValues.roomId}
                                        onChange={(e) => handleInputChange('roomId')(e.target.value)}
                                        defaultValue={"None"}
                                        MenuProps={{
                                            disablePortal: true,
                                        }}
                                    >
                                        <MenuItem value="None"> <span style={{ color: "#A2A2A2" }}>Selecione a sala</span></MenuItem>
                                        {rooms.map(room => (
                                            <MenuItem key={room.id} value={room.id}>{room.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <Spacer />

                                <FormControl>
                                    <InputLabel id="class-label">Turma</InputLabel>
                                    <Select
                                        labelId="class-label"
                                        label="Turma"
                                        value={eventValues.classId}
                                        onChange={(e) => handleInputChange('classId')(e.target.value)}
                                        defaultValue={"None"}
                                        MenuProps={{
                                            disablePortal: true,
                                        }}
                                    >
                                        <MenuItem value="None"> <span style={{ color: "#A2A2A2" }}>Selecione a turma</span></MenuItem>
                                        {classes.map(classe => (
                                            <MenuItem key={classe.id} value={classe.id}>Turma {classe.number} - {classe.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <Spacer />
                            </ModalBody>

                            <ModalFooter>
                                <Button color="default" variant="light" onPress={onClose}>
                                    Fechar
                                </Button>

                                {event ?
                                    <Button color="danger" onPress={handleDelete}>
                                        Excluir
                                    </Button>
                                    : <></>
                                }

                                <Button color="primary" onPress={handleSubmit}>
                                    {event ? 'Atualizar' : 'Agendar'}
                                </Button>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ScheduleModal;
