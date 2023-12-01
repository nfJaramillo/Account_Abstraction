import { useEffect, useState, useContext } from "react";
import { checkSelledNFT } from "../utils/interact.js";
import { Box, Grid, CardActionArea, Card, CardMedia, CardContent, Typography, Stack } from '@mui/material';
import { AppContext } from '../App.js';
import { isConnected } from "../utils/web3auth.js";


const MyNfts = () => {
    const [data, setData] = useState([]);
    var contextData = useContext(AppContext);


    useEffect(() => {

        const onCheckPressed = async () => {
         

            if (await isConnected()) {
                let response = await checkSelledNFT();

                if (response && contextData && response.success === false) {
                    if (contextData) {
                        contextData.severity(response.severity)
                        contextData.text(response.status);
                        contextData.show(true)
                    }
                }
                else {
                    if (response) {
                        const temp = await JSON.parse(response.status);
                        setData(temp['ownedNfts'])
                    }
                }
            }
            else {
                if (contextData) {
                    console.log(await isConnected())
                    contextData.severity("warning")
                    contextData.text("Conecta tu billeteta");
                    contextData.show(true)
                }
            }


        };

        onCheckPressed()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getLocalDateTime = (date: any) => {
        return (date.getDate() + '/' +
            (date.getMonth() + 1) + '/' +
            date.getFullYear() + ' ' +
            date.getHours() + ':' +
            (date.getMinutes() < 10 ? '0' : '') + date.getMinutes())
    }

    return (
        <Grid container justifyContent="center" maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', bgcolor: '#cfe8fc', minHeight: '80vh', borderRadius: 1, mt: 3, background: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)' }}>
            <Stack spacing={2} minWidth="90vw" justifyContent="center" alignItems="center">
                <Typography sx={{ mt: 3, typography: { xs: 'h5', sm: 'h5', md: 'h3', lg: 'h3' } }}>Mis Nfts</Typography>
                <Box display="flex" alignItems="center">
                    <Grid container rowSpacing={1} maxWidth="xl" justifyContent="center" columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {data?.map((nft) => (
                            <Grid item key={nft['tokenId']}>
                                <Card sx={{ maxWidth: 225, height: '100%' }}>
                                    <CardActionArea>
                                        <CardMedia

                                            component="img"
                                            image={nft['image']['cachedUrl']}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {nft['title']}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" align="justify">
                                                {nft['description']}
                                            </Typography>
                                            <br></br>
                                            <Typography display='inline' fontWeight='bold'>Fecha: </Typography>
                                            <Typography display='inline' variant="body2" color="text.secondary" align="justify">
                                                {getLocalDateTime(new Date(nft['raw']['metadata']['date']))}
                                            </Typography>
                                            <br />
                                            <Typography display='inline' fontWeight='bold'>Precio: </Typography>
                                            <Typography display='inline' variant="body2" color="text.secondary" align="justify">
                                                {nft['raw']['metadata']['price'] / 10 ** 18 + ' eth'}
                                            </Typography>
                                            <br />
                                            <Typography display='inline' fontWeight='bold'>Cantidad: </Typography>
                                            <Typography display='inline' variant="body2" color="text.secondary" align="justify">
                                                {nft['balance']}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Stack>
        </Grid>
    )
}


export default MyNfts

