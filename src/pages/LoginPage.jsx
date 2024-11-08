import React, { useEffect,useState } from 'react';
import { Box, Input, FormGroup, FormControl, InputAdornment, Button, IconButton} from '@mui/material'; 
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import logo from '../assets/logo.png';  
import { useLogin } from '../hooks/useLogin';
import { useLogout } from '../hooks/useLogout'; 
import { useAuthContext } from '../hooks/useAuthContext';
import { Navigate } from 'react-router-dom';

const LoginPage = () => { 
    const { user } = useAuthContext();
    const [email,setEmail] = useState(''); 
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });
    const password = values.password;
    const {login, error, isLoading} = useLogin({email,password})

    
    const handleSubmit = async(e) => { 
        e.preventDefault(); 
        await login(email,values.password);  
    }  
    const handleShowPassword = () => {
        setValues({
            ...values,
            showPassword : !values.showPassword,
        });
    };

    const handleMouseDownPasswd = (e) => {
        e.preventDefault();
    };

    const handlePasswdChange = (prop) => (event) => { 
        setValues({
            ...values,
            [prop]:event.target.value,
        });
    }
    
    // const { logout } = useLogout();
    // const handleLogoutClick = () => {
    //     logout();
    // }

    return (
        <div className='font-body bg-[#363740] h-full w-full flex items-center justify-center'>
           <div className='login-card md:w-[380px] w-[70%] md:h-[582px] h-auto p-[32px] flex flex-col gap-2 items-center justify-center bg-white rounded-md relative over'>
           <img className='logo' src={logo}></img>
           <span className='font-[500] text-[19px] text-[#A4A6B3]'>React Dashboard App</span>
            
            <Box 
                component="form" 
                onSubmit={handleSubmit}>
            <FormGroup style={{width:'100%'}}  >
               <FormControl>
                    <div className='email-label text-[#9FA2B4] text-[12px] font-[700]'>EMAIL</div>
                    <Input 
                        onChange={(e) => setEmail(e.target.value)}
                        disableUnderline = {true} 
                        style={{height:'42px',marginBottom:'15px',borderRadius:'8px',border:'1px solid #F0F1F7',background:'#FCFDFE',fontFamily:'Mulish',paddingLeft:'16px',fontWeight:400,fontSize:'14px',lineHeight:'20px',letterSpacing:'0.3px'}} 
                        id="email" 
                        value={email}
                        placeholder='Email address'/>
                </FormControl> 
                <FormControl>
                    <div className='password-label text-[#9FA2B4] text-[12px] font-[700]'>PASSWORD</div>
                    <Input disableUnderline = {true}  
                     type={
                             values.showPassword
                                 ? "text"
                                 : "password"
                     }
                     onChange={handlePasswdChange("password")}
                     value={values.password}
                     endAdornment={
                         <InputAdornment position="end">
                             <IconButton
                                 onClick={
                                    handleShowPassword
                                 }
                                 onMouseDown={
                                    handleMouseDownPasswd
                                 }
                             >
                                 {values.showPassword ? (
                                     <VisibilityIcon />
                                 ) : (
                                     <VisibilityOffIcon />
                                 )}
                             </IconButton>
                         </InputAdornment>
                     }
                     style={{height:'42px',borderRadius:'8px',border:'1px solid #F0F1F7',background:'#FCFDFE',fontFamily:'Mulish',paddingLeft:'16px',fontWeight:400,fontSize:'14px',lineHeight:'20px',letterSpacing:'0.3px'}} 
                     id="password" 
                     placeholder='Password'/>
                </FormControl>  
                <Button 
                disabled = { isLoading }
                type='submit'
                style={{boxShadow: '0px 4px 12px 0px #3751FF3D',textTransform:'capitalize',height:'48px',marginTop:'20px',background:'#3751FF',borderRadius:'8px',color:'white',fontWeight:'500',fontSize:'14px',lineHeight:'20px',letterSpacing:'0.2px',textAlign:'center'}}>
                    Log In
                </Button>
                <p className='text-[#9FA2B4]'>! For test purposes you can click Log In without any user information to go ahead !</p>
                {error && <div className='text-red error'>{error}</div>}
                <div className='font-[400] text-[14px] w-full h-[42px] flex gap-2 items-center justify-center mt-5'>
                <span className='text-[#9FA2B4]'>Don't have an account? </span>
                <span className='text-[#3751FF]'>Sign up</span>
                </div>
            </FormGroup> 
            </Box>
           {/* <button className='logout' onClick={handleLogoutClick}>LOGOUT</button> */}
           </div>
           {user && <Navigate to='/overview' replace={true} />} 

        </div>

    );
}

export default LoginPage;
