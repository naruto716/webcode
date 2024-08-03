import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Paper} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import agent from "../../app/api/agent.ts";
import {toast} from "react-toastify";

export default function Register() {
    const navigate = useNavigate();
    const {register, handleSubmit, setError, formState: {isSubmitting, errors, isValid}} = useForm({
        mode: 'onChange'
    });

    function handleApiErrors(errors: any) {
        if (errors) {
            console.log(errors);
            errors.forEach((error: any) => {
                if (error.includes('Password')) {
                    setError('password', {message: error})
                } else if (error.includes('Email')) {
                    setError('email', {message: error})
                } else if (error.includes('Username')) {
                    setError('username', {message: error})
                }
            })
        }
    }

    const validatePassword = (password: string) => {
        const errors = [];
        if (password.length < 6) {
            errors.push("Password must be at least 6 characters long.");
        }
        if (!/[a-z]/.test(password)) {
            errors.push("Password must contain at least one lowercase letter.");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push("Password must contain at least one uppercase letter.");
        }
        if (!/\d/.test(password)) {
            errors.push("Password must contain at least one digit.");
        }
        return errors.length > 0 ? errors.join(" ") : true;
    };

    return (
        <Container component={Paper} maxWidth="sm"
                   sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4}}>
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box component="form"
                 onSubmit={handleSubmit(data => agent.Account.register(data).then(() => {
                     toast.success('Registration successful - You can now log in');
                     navigate('/login');
                 }).catch(error => handleApiErrors(error)))}
                 noValidate sx={{mt: 1}}>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Email"
                    autoComplete="email"
                    autoFocus
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: 'Not a valid email address'
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors?.email?.message as string}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Username"
                    autoComplete="username"
                    {...register('username', {required: 'Username is required'})}
                    error={!!errors.username}
                    helperText={errors?.username?.message as string}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    {...register('password', {
                        required: 'Password is required',
                        validate: validatePassword
                    })}
                    error={!!errors.password}
                    helperText={errors?.password?.message as string}
                />

                <LoadingButton
                    loading={isSubmitting}
                    disabled={!isValid}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Register
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to="/login">
                            {"Already have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}