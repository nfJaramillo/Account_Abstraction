import { Typography, Grid, Box, Button, Dialog, CircularProgress } from "@mui/material"

import { useContext, useState } from "react"
import { AppContext } from '../App.jsx';
import { getNFT } from "../utils/interact.js";

const Nft = () => {
    const contextData = useContext(AppContext);
    const address = ""
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getCertification = async () => {
        handleClickOpen()

        let response = await getNFT()
        if (contextData) {
            contextData.severity(response.severity);
            contextData.text(response.status);
            contextData.show(true);
        }
        handleClose()

    }

    return (
        <div>
            <Grid container direction={{ xs: 'column', md: 'row' }} alignItems={'center'} justifyContent={'center'} maxWidth="xl" sx={{ bgcolor: '#cfe8fc', minHeight: '80vh', borderRadius: 1, mt: 3, background: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)' }}>
                <Grid item xs={6} >
                    <Typography textAlign={{ xs: 'center', md: 'left' }} sx={{ mt: { xs: 3, md: 3 }, ml: { xs: 0, md: 3 }, typography: { xs: 'h4', md: 'h3' } }}>Reclama aquí tu NFT</Typography>
                    <Typography textAlign={{ xs: 'center', md: 'left' }} variant="h5" sx={{ mt: { xs: 3, md: 3 }, ml: { xs: 0, md: 3 } }}>Da clic en el botón y completa la transacción.</Typography>
                </Grid>
                <Grid item xs={6} container alignItems={'center'} justifyContent={'center'} sx={{ mt: { xs: 5, md: 0 } }} >
                    <Box textAlign='center'>
                        <Button variant="contained" disabled={address != undefined ? false : true} onClick={() => getCertification()} sx={{ backgroundColor: '#ffd204', color: '#000000', '&:hover': { bgcolor: '#b29303' }, width: { xs: '60vw', md: '30vw' }, height: { xs: '20vh', md: '20vh' } }}>
                            <Typography textAlign='center' sx={{ typography: { xs: 'h4', md: 'h3' } }}>Reclamar NFT</Typography>
                        </Button>
                    </Box>
                </Grid>


            </Grid>
            <Dialog open={open} onClose={handleClose} fullScreen>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0)!important',

                }}>
                    <CircularProgress />
                </Box>
            </Dialog>
        </div>
    )
}

export default Nft

