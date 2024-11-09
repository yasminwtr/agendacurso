"use client";
import { useEffect, useState, useMemo, useCallback } from 'react';
import PagesLayout from '@/app/components/PagesLayout';
import { Table, TableHeader, TableColumn, TableBody, TableRow, Spinner, Tooltip, TableCell, Input, Button, Pagination, useDisclosure } from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";
import ClassModal from '@/app/components/ClassModal';
import { TbEditCircle } from "react-icons/tb";
import useClasses from '@/app/hooks/useClasses';

function Turmas() {
    const columns = [{ uid: 'number', name: 'Número' }, { uid: 'name', name: 'Nome' }, { uid: 'collector', name: 'Coletor' }, { uid: 'participants', name: 'Participantes' },{ uid: 'actions', name: 'Ações' }];
    const { classes, fetchClasses, loading } = useClasses();
    const [filterValue, setFilterValue] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const hasSearchFilter = Boolean(filterValue);
    const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
    const [classIndividual, setClassIndividual] = useState(null);

    const filteredItems = useMemo(() => {
        let filteredClasses = [...classes];

        if (hasSearchFilter) {
            filteredClasses = filteredClasses.filter((item) =>
                item.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        return filteredClasses;
    }, [classes, filterValue]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const classNames = useMemo(
        () => ({
            th: ["px-10"],
            td: ["px-10", "pb-5"],
        }),
        [],
    );

    const renderCell = useCallback((classIndividual, columnKey) => {
        const cellValue = classIndividual[columnKey];

        switch (columnKey) {
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Tooltip content="Abrir registro">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => {
                                setClassIndividual(classIndividual);
                                onOpen();
                            }}>
                                <TbEditCircle size={21} />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onSearchChange = useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    useEffect(() => {
        if (!isOpen) setClassIndividual(null);
    }, [isOpen]);

    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
            </div>
        );
    }, [items.length, page, pages, hasSearchFilter]);

    return (
        <PagesLayout>
            <div className='table-title'>
                <h1>Turmas</h1>

                <div className='top-content-table-page'>
                    <Input
                        isClearable
                        className="w-full sm:max-w-[30%]"
                        placeholder="Pesquisar turma"
                        startContent={<IoIosSearch size={20} />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />

                    <ClassModal fetchClasses={fetchClasses} isOpen={isOpen} onClose={onClose} onOpen={onOpen} onOpenChange={onOpenChange} classIndividual={classIndividual} setClassIndividual={setClassIndividual} />
                </div>
            </div>

            <Table
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                shadow='none'
                classNames={classNames}
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "end" : "start"}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>

                <TableBody
                    emptyContent={"Nenhuma turma encontrada."}
                    items={items}
                    isLoading={loading ? true : false}
                    loadingContent={<Spinner />}
                >
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </PagesLayout>
    );
}

export default Turmas;
