import React, {useState, useEffect, useContext} from 'react';
import Card from '@mui/material/Card';
import {TextField,FormControl, CardContent,Typography,
        InputLabel,OutlinedInput, InputAdornment,IconButton,Button,Box,Select,MenuItem, Snackbar } from '@mui/material';
import {createTheme,ThemeProvider} from '@mui/material/styles';
import {Link} from 'react-router-dom';
import axios from 'axios'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import './index.css'
import { useNavigate } from 'react-router-dom';
import { userContext } from './App';

function LoginPage()
{
    // To redirect to user page
    const navigate = useNavigate();
    const [userId, userType, setUserType, setUserId] = useContext(userContext);

    // Loading Screen
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        textAlign: 'center'
      };

    // Theme for input bars
    const theme = createTheme({
        palette: {
          orange: {
            main: 'var(--orange)',
          },
        },
      });

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [user,setUser] = useState({
        userId:null,
        pasword:null,
        type:'Customer'
    }) ;

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    function handleChange(e)
    {
        if (e.target.name === "userId") 
        {
            
            if(e.target.value === "" || Number(e.target.value))
            {
                
                setUser(user => ({
                    ...user,
                    ['userId']:e.target.value
                  }));
            }
        }
        else
        {
            
            setUser(user => ({
                ...user,
                [e.target.name]:e.target.value
              }));
        }
    }

    async function login(e)
    {
        e.preventDefault();
        if(user.type=='Customer'&&!rationFormat.test(user.userId))
        {
            setAlertMessage("Invalid. Please enter a 10 digit ration card number.")
            setAlert(true);
        }
        else if(user.type=='Shopkeeper'&&!licenseFormat.test(user.userId))
        {
            setAlertMessage("Invalid. Please enter a 12 digit license number.")
            setAlert(true);
        }
        else
        {
            setLoading(true);
            const response = await axios.post(process.env.REACT_APP_USER_URL+"login/", JSON.stringify(user))       
            setLoading(false);
            if(response.data.status==200)
            {
                localStorage.clear();
                setUserId(response.data.userId)
                setUserType(user.type)
                localStorage.setItem('user-id', response.data.userId);
                localStorage.setItem('user-type', user.type);
                navigate('/',{replace:true});
            }
            else
            {
              setAlertMessage('Incorrect Password or '+(user.type=='Customer'?'Ration Card Number':'License Number')+' Entered')
              setAlert(true);
            }      
        }
    }    
        

    // Ration Card Format
    const rationFormat = new RegExp('^[0-9]{10}$')

    // License Number Format
    const licenseFormat = new RegExp('^[0-9]{12}$')

    return(
        <Box style={{backgroundColor:'var(--bgColor)', height:'100vh'}}>
        <div style={{textAlign:'center'}}>        
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" height="fit-content">
            <ThemeProvider theme={theme}>
            <Card sx={{ minWidth: 400 }}>
                <CardContent>
                    <Link to="/"><img src='eRation.png' height='150' alt="eRation_logo"/></Link>
                    <Typography sx={{ fontSize: 25 }} color="var(--orange)" gutterBottom>
                     Sign in                
                    </Typography>
                    <br/>  
                    <form id='loginForm' onSubmit={login}>
                    <FormControl sx={{ m: 1, width: '35ch' }}>
                      <InputLabel color="orange" id="user-type-select-label">Type</InputLabel>
                      <Select
                        color="orange"
                        labelId="user-type-select-label"
                        id="user-type-select"
                        value={user.type}
                        label="Type"
                        name="type"
                        onChange={handleChange}
                      >
                        <MenuItem value='Customer'>Customer</MenuItem>
                        <MenuItem value='Shopkeeper'>Shop Owner</MenuItem>
                      </Select>
                    </FormControl>
                    <br/>
                    <br/>
                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                       <TextField variant="outlined" color="orange" required name="userId" value={user.userId} onChange={handleChange} id="userId_input"                      
                            label={user.type=='Customer' ? 'Ration Card Number' : 'License Number'}
                        />
                    </FormControl>
                    <br/>    
                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                            <InputLabel color="orange" htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput color="orange" required name="password" value={user.pasword} onChange={handleChange} id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment=
                                {
                                    <InputAdornment position="end"> 
                                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>              
                    <br/>
                    <br/>
                    
                    <Button style={{backgroundColor:'var(--orange)'}} type="submit" variant="contained">Login</Button>
                    </form>                
                </CardContent>             
            </Card>
            </ThemeProvider>     
        </Box>
        </div>
        

        {/* Loading Popup */}
        <Modal open={loading} onClose={()=>{setLoading(false)}} aria-labelledby="loading-modal">
          <Box sx={style}>
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>
              Please wait
            </Typography>
          </Box>
        </Modal> 

        {/* Alert Popup */}
        <Snackbar open={alert} autoHideDuration={5000}>
            <Alert  sx={{width:'fit-content' }} variant="filled" severity="error" onClose={()=>{setAlert(false)}}>
                {alertMessage}
            </Alert>
        </Snackbar>

        </Box>


        

    )
}

export default LoginPage