import * as React from 'react';
import { useEffect } from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BancolombiaIcon from './/assets/logo.svg'
import { useNavigate } from 'react-router-dom';
import { NavLink as ReactNav } from 'react-router-dom'
import { initWeb3Auth, connectWeb3Auth, isConnected } from './utils/web3auth'




export function AppBarTop() {



    // Lo siguientes 3 ajustes se pueden editar
    // Paginas que se muestran en el menu
    const pages = ['NFT','MyNfts'];
    // Titulo que se muestra cuando el tamaño de pantalla es de un computador
    const titulo = 'POC ACCOUNT ABSTRACTION'
    // Titulo que se muestra cuando el tamaño de pantalla es de un celular
    const tituloResumido = 'POC AA'
    // Link base de la pagina que debe ser igual al estipulado en App.jsx
    const linkBase = 'PoC-AccountAbstraction/'

    const navigate = useNavigate();


    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [connected, setConnected] = React.useState(false);
    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(() => event.currentTarget);
    };


    const login = async () => {
        await connectWeb3Auth()
        setConnected(await isConnected())
    }

    const initializeWeb3Auth = async () => {
        await initWeb3Auth()
        setConnected(await isConnected())
    }


    const handleCloseNavMenu = (page: any) => {
        console.log(page)
        page = page.toLowerCase();
        page = page.replace(" ", "")
        navigate(linkBase + page);
        setAnchorElNav(null);
    };

    useEffect(() => {
        initializeWeb3Auth()
    }, []);

    return (
        <AppBar position="static" sx={{ borderRadius: 1 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box component="img" src={BancolombiaIcon} alt="Logo de Bancolombia" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, maxWidth: 40 }} />

                    <MenuItem onClick={() => handleCloseNavMenu("")} sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'white',
                                textDecoration: 'none',
                                '&:hover': { bgcolor: 'white', color: 'black' },
                                borderRadius: 1,
                            }}
                        >
                            {titulo}
                        </Typography>
                    </MenuItem>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', color:'white' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color='inherit'
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={() => handleCloseNavMenu("")}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)} autoFocus >
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        onClick={() => handleCloseNavMenu("")}
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'white',
                            textDecoration: 'none',
                        }}
                    >
                        {tituloResumido}
                    </Typography>
                    <Box sx={{ flexGrow: 1, textAlign: 'center', display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                component={ReactNav}
                                to={linkBase + page.replace(" ", "")}
                                key={page}
                                onClick={() => handleCloseNavMenu(page)}
                                sx={{ mr: 1, my: 2, color: 'white', active: 'true', display: 'block', '&:hover': { bgcolor: 'white', color: 'black' }, '&.active': { bgcolor: 'white', color: 'black' } }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                        <Button variant="contained" id="walletButton" onClick={() => login()} sx={{ backgroundColor: '#ffd204', color: '#000000' }}>

                            {connected === true ? (
                                "Conectado"
                            ) : (
                                "Login"
                            )}

                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                        <Button variant="contained" id="walletButton" onClick={() => login()} sx={{ backgroundColor: '#ffd204', color: '#000000' }}>
                            {connected === true ? (
                                "Conectado"
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar >
    )
}