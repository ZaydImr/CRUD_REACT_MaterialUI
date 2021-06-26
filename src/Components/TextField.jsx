import React, { useState } from 'react'
import {ErrorMessage,useField} from 'formik'
import TextField from '@material-ui/core/TextField'
import { useEffect } from 'react';

const InputField = ({label,disabled,...props}) => {
      const [field,meta] = useField(props);
      const [tst,setTst] = useState(false);
      const [dis,setDis] = useState(false); 

      useEffect(()=>{
            if(meta.error===undefined)
                        setTst(false);
            else if(meta.touched)
                        setTst(true);
            if(disabled)
                  setDis(true);
      })
      
      return (
            <>
            <TextField
                  disabled={dis}
                  variant='outlined'
                  margin='normal'
                  label={label}
                  fullWidth
                  autoComplete='off'
                  {...field}
                  {...props}
                  helperText={<ErrorMessage name={field.name}/>}
                  error={tst}
                  />
                  </>
      )
}

export default InputField
