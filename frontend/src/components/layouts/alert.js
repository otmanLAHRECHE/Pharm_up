
export default function Alert(props){

    state = {
        open : true
    }

    const handleClose = () => {
        this.setState({open : false})

    }

    
    return(
        <Snackbar open={this.state.open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ top, center }}>
            <Alert onClose={handleClose} severity={props.type} sx={{ width: '100%' }}>
                 {props.message}
            </Alert>
        </Snackbar>
    )

}