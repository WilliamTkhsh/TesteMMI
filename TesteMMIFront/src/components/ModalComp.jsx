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
import { validateCNPJ, validateCPF, validateEmail } from "../scripts/validations.js"
import { InputCNPJ, InputCPF, InputPhone } from "./masks/InputMasks.jsx"


export const ModalComp = ({dados, setDados, isOpen, onClose, atualizarDados}) => {
    const [values, setValues] = useState({});

    const handleChangeValues = (e) => {
        setValues((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        if (!validateCNPJ(values.cnpj)) {
            alert("O CNPJ é inválido");
            return;
        }
        if (!validateCPF(values.cpf)) {
            alert("O CPF é inválido");
            return;
        }
        if (!validateEmail(values.email)) {
            alert("O Email é inválido");
            return;
        }
        let fixed_valor_emprestimo = parseFloat(values.valor_emprestimo).toFixed(2);
        let fixed_faturamento_anual = parseFloat(values.faturamento_anual).toFixed(2);

        let data = {
            cnpj: values.cnpj,
            valor_emprestimo: fixed_valor_emprestimo,
            faturamento_anual: fixed_faturamento_anual,
            endereco: values.endereco,
            nome: values.nome,
            cpf: values.cpf,
            telefone: values.telefone,
            email: values.email
        }
        fetch("http://127.0.0.1:5000/solicitacao/criar", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err))
        .then(() => atualizarDados());
        onClose();
    }


    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Criar Solicitação</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl display="flex" flexDir="column" gap={4}>
                        <Box>
                            <FormLabel>CNPJ</FormLabel>
                            <InputCNPJ 
                                values={values}
                                setValues={setValues}
                                type ="text"
                                name="cnpj"
                            />
                        </Box>
                        <Box>
                            <FormLabel>Valor do Empréstimo</FormLabel>
                            <Input
                                type ="text"
                                name="valor_emprestimo"
                                onChange={handleChangeValues}
                            />
                        </Box>
                        <Box>
                            <FormLabel>Faturamento Anual</FormLabel>
                            <Input
                                type ="text"
                                name="faturamento_anual"
                                onChange={handleChangeValues}
                            />
                        </Box>
                        <Box>
                            <FormLabel>Endereço do Solicitante</FormLabel>
                            <Input
                                type ="text"
                                name="endereco"
                                onChange={handleChangeValues}
                            />
                        </Box>
                        <Box>
                            <FormLabel>Nome do Solicitante</FormLabel>
                            <Input 
                                type ="text"
                                name="nome"
                                onChange={handleChangeValues}
                            />
                        </Box>
                        <Box>
                            <FormLabel>CPF do Solicitante</FormLabel>
                            <InputCPF
                                values={values}
                                setValues={setValues}
                                type ="text"
                                name="cpf"
                            />
                        </Box>
                        <Box>
                            <FormLabel>Telefone do Solicitante</FormLabel>
                            <InputPhone
                                values={values}
                                setValues={setValues}
                                edit={false}
                                phoneEdit=''               
                                type ="text"
                                name="telefone"
                            />
                        </Box>
                        <Box>
                            <FormLabel>Email do Solicitante</FormLabel>
                            <Input 
                                type ="text"
                                name="email"
                                onChange={handleChangeValues}
                            />
                        </Box>
                    </FormControl>
                </ModalBody>
                <ModalFooter justifyContent="start">
                    <Button colorScheme="green" mr={3} onClick={() => handleSubmit()}>
                        SALVAR
                    </Button>
                    <Button colorScheme="red" onClick={onClose}>
                        FECHAR
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}