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

export const ModalComp = ({dados, setDados, isOpen, onClose}) => {
    const [values, setValues] = useState();

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }));
    };

    const handleSubmit = () => {
        let data = {
            cnpj: values.cnpj,
            valor_emprestimo: values.valor_emprestimo,
            faturamento_anual: values.faturamento_anual,
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
        .catch(err => console.log(err));

        const dados_atualizados = dados;
        setDados(dados_atualizados);
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
                            <Input 
                                type ="text"
                                name="cnpj"
                                onChange={handleChangeValues}
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
                            <Input 
                                type ="text"
                                name="cpf"
                                onChange={handleChangeValues}
                            />
                        </Box>
                        <Box>
                            <FormLabel>Telefone do Solicitante</FormLabel>
                            <Input 
                                type ="text"
                                name="telefone"
                                onChange={handleChangeValues}
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