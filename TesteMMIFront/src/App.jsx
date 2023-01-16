import { EditIcon, DeleteIcon } from "@chakra-ui/icons"
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import { useState, useEffect } from "react";
import { ModalComp } from "./components/ModalComp.jsx";
import { ModalEdit } from "./components/ModalEdit.jsx";

function App() {
  const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure(); //Modal de criar
  const [dados, setDados] = useState([{}])
  const { isOpen: isOpenEdit , onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure(); //Modal de editar
  const [dadoEdit, setDadoEdit] = useState()

  useEffect(()=>{
    atualizarDados()
  },[])

  const atualizarDados = () => {
    fetch("http://127.0.0.1:5000/solicitacao/listar", {
      method: "GET",
    }) 
    .then(response => response.json())
    .then((data) => setDados(data))  
  }

  const handleRemove = (id) => {
    fetch("http://127.0.0.1:5000/solicitacao/deletar/" + id, {
      method: "DELETE",
    })
    .then(response => console.log(response))
    .catch(err => console.log(err))
    .then(() => atualizarDados())
  }

  return (
    <>
    <Flex
    h="100vh"
    align="center"
    justify="center"
    fontSize="20px"
    fontFamily="poppins"
    >
      <Box maxW={1500} w="100%" h="100vh" py={10} px={2}>
        <Button colorScheme="orange" onClick={() => onOpen()}>
          NOVA SOLICITAÇÃO
        </Button>

        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
            <Tr>
              <Th fontSize="20px">
                CNPJ
              </Th>
              <Th fontSize="20px">
                Valor de empréstimo solicitado
              </Th>
              <Th fontSize="20px">
                Faturamento anual da empresa
              </Th>
              <Th fontSize="20px">
                Data da Solicitação
              </Th>
            </Tr>
            </Thead>
            <Tbody>
              {dados.map((dado,index)=>(
                <Tr key={index}>
                  <Td>{dado.cnpj}</Td>
                  <Td>R$ {dado.valor_emprestimo?.replace(".",",")}</Td>
                  <Td>R$ {dado.faturamento_anual?.replace(".",",")}</Td>
                  <Td>{dado.data_criada}</Td>
                  <Td p={0}>
                  <Button colorScheme="orange" onClick={() => [onOpenEdit(), setDadoEdit(dado)]}>
                    <EditIcon
                      fontSize={20}
                    />
                  </Button>
                  </Td>
                  <Td p={0}>
                  <Button colorScheme="red" onClick={() => handleRemove(dado.id)}>
                    <DeleteIcon 
                      fontSize={20}
                    />
                  </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalComp
          dados={dados}
          setDados={setDados}
          isOpen={isOpen}
          onClose={onClose}
          atualizarDados={atualizarDados}
        />
      )}
      {isOpenEdit && (
        <ModalEdit
          dadoEdit={dadoEdit}
          setDadoEdit={setDadoEdit}
          isOpenEdit={isOpenEdit}
          onCloseEdit={onCloseEdit}
          atualizarDados={atualizarDados}
        />
      )}
    </Flex>
    </>
  )
}

export default App
