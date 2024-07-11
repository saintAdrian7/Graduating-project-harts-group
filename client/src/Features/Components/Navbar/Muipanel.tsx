import { Stack, IconButton } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import QuizIcon from '@mui/icons-material/Quiz';
import PersonIcon from '@mui/icons-material/Person';
export const MuiPanel = () => {
    return(
       <Stack direction="column" paddingBlock={7} className="panel">
        <div className="panel">
           <IconButton className="layer-icon">
                <HomeIcon className="icon"/>
                <SearchIcon className="icon"/>
                <QuizIcon className="icon"/>
                <PersonIcon className="icon"/>
                
           </IconButton>
        </div>
       </Stack>
    )
}