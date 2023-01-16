import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Box,
    Input,
    Button
  } from '@chakra-ui/react'
import { useState } from 'react'
import { validateEmail } from "../scripts/validations.js"
import { InputPhone } from "./masks/InputMasks.jsx"

export const ModalEdit = ({dadoEdit, setDadoEdit, isOpenEdit, onCloseEdit, atualizarDados}) => {

    const [values, setValues] = useState({
        id: dadoEdit.id,
        valor_emprestimo: dadoEdit.valor_emprestimo,
        faturamento_anual: dadoEdit.faturamento_anual,
        endereco: dadoEdit.endereco,
        telefone: dadoEdit.telefone,
        email: dadoEdit.email
    });

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }));
    };

    const handleSubmit = () => {
        if (!validateEmail(values.email)) {
            alert("O Email é inválido");
            return;
        }
        let data = {
            valor_emprestimo: values.valor_emprestimo,
            faturamento_anual: values.faturamento_anual,
            endereco: values.endereco,
            telefone: values.telefone,
            email: values.email
        }
        fetch("http://127.0.0.1:5000/solicitacao/editar/" + dadoEdit.id, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err))
        .then(() => atualizarDados())

        onCloseEdit();
    }


    return (
        <>
        <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Editar Solicitação</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl display="flex" flexDir="column" gap={4}>
                        <Box>
                            <FormLabel>Valor do Empréstimo</FormLabel>
                            <Input
                                type ="number"
                                name="valor_emprestimo"
                                defaultValue={dadoEdit.valor_emprestimo}
                            />
                        </Box>
                        <Box>
                            <FormLabel>Faturamento Anual</FormLabel>
                            <Input 
                                type ="number"
                                name="faturamento_anual"
                                defaultValue={dadoEdit.faturamento_anual}
                            />
                        </Box>
                        <Box>
                            <FormLabel>Endereço do Solicitante</FormLabel>
                            <Input
                                type ="text"
                                name="endereco"
                                defaultValue={dadoEdit.endereco}
                                onChange={handleChangeValues}
                            />
                        </Box>
                        <Box>
                            <FormLabel>Telefone do Solicitante</FormLabel>
                            <InputPhone
                                values={values}
                                setValues={setValues}
                                type ="text"
                                name="telefone"
                                defaultValue={dadoEdit.telefone}
                            />
                        </Box>
                        <Box>
                            <FormLabel>Email do Solicitante</FormLabel>
                            <Input
                                type ="text"
                                name="email"
                                defaultValue={dadoEdit.email}
                                onChange={handleChangeValues}
                            />
                        </Box>
                    </FormControl>
                </ModalBody>
                <ModalFooter justifyContent="start">
                    <Button colorScheme="green" mr={3} onClick={() => handleSubmit()}>
                        SALVAR
                    </Button>
                    <Button colorScheme="red" onClick={onCloseEdit}>
                        FECHAR
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}