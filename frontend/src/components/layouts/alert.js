
import React,{useState} from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function Alt(props){

    const [open, setOpen] = useState(true)

    const handleClose = () => {
        setOpen(false)

    }

    console.log(open)

    
    return(
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:'center' }}>
            <Alert onClose={handleClose} severity={props.type} sx={{ width: '100%' }}>
                 {props.message}
            </Alert>
        </Snackbar>
    )

}