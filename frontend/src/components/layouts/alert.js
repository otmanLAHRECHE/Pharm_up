
import React,{useState} from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function Alt(props){

    const [open, setOpen] = useState(true)



    
    return(
        <Snackbar open={open} autoHideDuration={4000} onClose={props.onClose} anchorOrigin={{ vertical:'top', horizontal:'center' }}>
            <Alert onClose={props.onClose} severity={props.type} sx={{ width: '100%' }}>
                 {props.message}
            </Alert>    
        </Snackbar>
    )

}