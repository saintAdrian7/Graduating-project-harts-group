import { Stack,TextField } from "@mui/material"

export const MuiLoginForm = () => {
    return(
        <Stack direction="column" spacing={3} width="40%">
            <TextField label="email" variant="outlined" size="small" color="primary" type="email" required/>
            <TextField label="password" variant="outlined" size="small" color="primary" type="password" required/>
       </Stack>
    )
}

