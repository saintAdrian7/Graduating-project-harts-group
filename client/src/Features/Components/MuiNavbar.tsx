import { AppBar, Toolbar, Button, ButtonGroup, IconButton } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';

export const MuiNavbar = () => {
    return(
       <AppBar>
            <Toolbar className="top-nav-bar"> 
                
            <img src="https://tse4.mm.bing.net/th?id=OIG2.JQKfKP6cxFiMrZwI_m4J&pid=ImgGn" alt="logo" width="40px"/>
                <h1 className="header">EDU-Murphy</h1>
                <ButtonGroup aria-label="text button group">
                    <Button variant="text" className="login-button" size="small">Sign Up</Button>
                    <Button variant="text" className="login-button">Login</Button>
                    <IconButton>
                        <MenuIcon  className="icon"/>
                    </IconButton>
                   
                </ButtonGroup>
                

            </Toolbar>
       </AppBar>
    )
}

