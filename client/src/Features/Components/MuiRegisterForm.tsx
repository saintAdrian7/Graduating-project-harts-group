import { Stack,TextField } from "@mui/material"

export const MuiRegisterForm = () => {
    return(
        <Stack direction="column" spacing={3} width="40%">
            <TextField label="FirstName" variant="outlined" color="primary" type="text" placeholder="Adrian"/>
            <TextField label="LastName" variant="outlined" color="primary" type="text" placeholder="Kimani"/>
            <TextField label="email" variant="outlined" size="small" color="primary" type="email" required/>
            <TextField label="password" variant="outlined" size="small" color="primary" type="password" required/>
       </Stack>
    )
}