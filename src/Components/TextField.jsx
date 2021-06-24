import React, { useState } from 'react'
import {ErrorMessage,useField} from 'formik'
import TextField from '@material-ui/core/TextField'
import { useEffect } from 'react';

const InputField = ({label,...props}) => {
      const [field,meta] = useField(props);
      const [tst,setTst] = useState(false);

      useEffect(()=>{
            //console.log(field,meta);
                  if(meta.touched)
                        setTst(true);
                  else if(meta.error===undefined)
                        setTst(false);
      })
      
      return (
            <>
            <TextField
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
