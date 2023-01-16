import { Input } from '@chakra-ui/react'
import { useState } from 'react'

  

export function InputCNPJ( {values, setValues, ...props} ) {
    const [value, setValue] = useState();
    function handleChange(e) {
      const cnpj = e.target.value.replace(/[^\d]/g, '').slice(0, 14);
      const formattedCNPJ = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
      setValues((prevValue) => ({
        ...prevValue,
        [e.target.name]: formattedCNPJ,
      }));
      setValue(formattedCNPJ)
    }
  
    return (
      <Input
      {...props}
        onChange={handleChange}
        value={value}
      />
    );
  }

  export function InputCPF( {values, setValues, ...props} ) {
    const [value, setValue] = useState();

    const handleChange = (e) => {
      const cpf = e.target.value.replace(/[^\d]/g, '').slice(0, 11);
      const formattedCPF = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
      setValues((prevValue) => ({
        ...prevValue,
        [e.target.name]: formattedCPF,
      }));
      setValue(formattedCPF);
    }
  
    return (
      <Input
      {...props}
        onChange={handleChange}
        value = {value}
      />
    );
  }

 /* 
  export  function InputCurrency( {values, setValues, ...props} ) {
    const [value, setValue] = useState();
  
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
        setValue(currencyValue)
    }
  
    return (
      <Input
      {...props}
        onChange={handleChange}
        value={value}
      />
    );
  }
 */

  export function InputPhone( {values, setValues, ...props} ) {
    const [value, setValue] = useState();
  
    function handleChange(e) {
      const phone = e.target.value.replace(/[^\d]/g, '').slice(0, 11);
      const formattedPhone = phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      setValues((prevValue) => ({
        ...prevValue,
        [e.target.name]: formattedPhone,
      }));
      setValue(formattedPhone)
    }
  
    return (
      <Input
      {...props}
        onChange={handleChange}
        value={value}
      />
    );
  }
  