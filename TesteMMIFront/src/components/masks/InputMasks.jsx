import { Input } from '@chakra-ui/react'
import { useState } from 'react'

  

export function InputCNPJ( {values, setValues, ...props} ) {
    const [cnpjMask, setCnpjMask] = useState('');
    function handleChange(e) {
      const cnpj = e.target.value.replace(/[^\d]/g, '').slice(0, 14);
      const formattedCNPJ = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
      setValues((prevValue) => ({
        ...prevValue,
        [e.target.name]: formattedCNPJ,
      }));
      setCnpjMask(formattedCNPJ)
    }
  
    return (
      <Input
      {...props}
        onChange={handleChange}
        value={cnpjMask}
      />
    );
  }

  export function InputCPF( {values, setValues, ...props} ) {
    const [cpfMask, setCPfMask] = useState('');

    const handleChange = (e) => {
      const cpf = e.target.value.replace(/[^\d]/g, '').slice(0, 11);
      const formattedCPF = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
      setValues((prevValue) => ({
        ...prevValue,
        [e.target.name]: formattedCPF,
      }));
      setCPfMask(formattedCPF);
    }
  
    return (
      <Input
      {...props}
        onChange={handleChange}
        value = {cpfMask}
      />
    );
  }

 /* 
  export  function InputCurrency( {values, setValues, ...props} ) {
    const [currMask, setCurrMask] = useState();
  
    function handleChange(e) {
      let currencyValue = e.target.value;
      const reg = /^\d+(\.\d{0,2})?$/;
      if (!reg.test(currencyValue)) {
        return;
      }
  
      currencyValue = parseFloat(currencyValue).toFixed(2);
        setValues((prevValue) => ({
          ...prevValue,
          [e.target.name]: currencyValue,
        }));
        setCurrMask(currencyValue)
    }
  
    return (
      <Input
      {...props}
        onChange={handleChange}
        value={currMask}
      />
    );
  }
 */

  export function InputPhone( {values, setValues, edit, phoneEdit, ...props} ) {

    const [phoneMask, setPhoneMask] = useState(phoneEdit);
    

    function handleChange(e) {
      const phone = e.target.value.replace(/[^\d]/g, '').slice(0, 11);
      const formattedPhone = phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      setValues((prevValue) => ({
        ...prevValue,
        [e.target.name]: formattedPhone,
      }));
      setPhoneMask(formattedPhone)
    }
  
      return (
        <Input
        {...props}
          onChange={handleChange}
          value={phoneMask}
        />
      );
  }
  