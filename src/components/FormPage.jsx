import React, {useState} from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"
import FormGroup from "@mui/material/FormControl"
import Radio from "@mui/material/Radio"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Rating from "@mui/material/Rating"
import Checkbox from "@mui/material/Checkbox"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"


function FormPage() {
    // Objeto data que contiene atributos para cada valor recogido en la encuesta
    const [data, setData] = useState({
        name: '', // Todos empiezan vacíos
        surname: '',
        age: '',
        gender: '',
        favAnimal: '',
        userRating: 0, // La puntuación de usuario empieza en 0
        terms: false // Para que aparezca el checkbox desmarcado
    })

    // Controlar la apertura y cierre del diálogo
    const [open, setOpen] = useState(false)

    // Controlar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault()
        setOpen(true) // Abre el diálogo
        console.log(data) // Imprime en consola los datos del usuario
    }

    // Reestablece los valores del formulario (los vacía)
    const handleClear = () => {
        setData({
            ...data,
            name: '',
            surname: '',
            age: '',
            gender: '',
            favAnimal: '',
            userRating: 0,
            terms: false
        })
    }

    // Cada handle controla el campo específico
    const handleChangeName = (e) => {
        setData({
            ...data,
            name: e.target.value // Obtiene el valor de la variable en cuestión
        })
    }

    const handleChangeSurname = (e) => {
        setData({
            ...data,
            surname: e.target.value
        })
    }

    const handleChangeAge = (e) => {
        setData({
            ...data,
            age: e.target.value
        })
    }

    const handleChangeGender = (e) => {
        setData({
            ...data,
            gender: e.target.value
        })
    }

    const handleChangeFavAnimal = (e) => {
        setData({
            ...data,
            favAnimal: e.target.value
        })
    }

    const handleChangeUserRating = (e) => {
        setData({
            ...data,
            userRating: parseInt(e.target.value) // Convertimos el valor a entero, ya que Rating trabaja con un número
        })
    }

    const handleChangeTerms = (e) => {
        setData({
            ...data,
            terms: e.target.checked // Usamos .checked en vez de .value para obtener si está o no marcado (true/false)
        })
    }

    // Cambia el valor de open a false, para cerrar el diálogo
    const handleClose = () => {
        setOpen(false)
    };

    return (
        <Container>
            <Box
                component='form'
                onSubmit={handleSubmit} // Al enviar el formulario se ejecuta handleSubmit
            >
                <Grid container spacing={{xs: 1, sm: 2}}>
                    <Grid size={{xs: 12, sm: 6, md: 5}}> {/*Para que sea responsive*/}
                        <TextField
                            label='Name'
                            onChange={handleChangeName} // Ejecuta la función handleChangeName
                            value={data.name} // Su valor será el que tenga data en su atributo name
                            required // Campo obligatorio antes de ser enviado
                            fullWidth // Ocupa la totalidad del grid
                        />
                    </Grid>
                    <Grid size={{xs: 12, sm: 6, md: 5}}>
                        <TextField
                            label='Last Name'
                            onChange={handleChangeSurname}
                            value={data.surname}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{xs: 12, sm: 3, md: 2}}>
                        <TextField
                            label='Age'
                            type='number' // Hace que solo se puedan introducir números
                            onChange={handleChangeAge}
                            value={data.age}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{xs: 12, sm: 9, md: 5}} textAlign='center'>
                        <FormControl>
                            <FormLabel id="radioButtonsGroupLabel">Gender</FormLabel>
                            <RadioGroup
                                aria-labelledby="radioButtonsGroupLabel"
                                name="RadioButtonsGroup"
                                onChange={handleChangeGender}
                                value={data.gender}
                                row
                            >
                                {/*Cada uno de los botones radio junto al valor que pasarán si son seleccionados*/}
                                <FormControlLabel value="female" control={<Radio required/>} label="Female"/>
                                <FormControlLabel value="male" control={<Radio required/>} label="Male"/>
                                <FormControlLabel value="other" control={<Radio required/>} label="Other"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid size={{xs: 12, md: 7}}>
                        <FormControl fullWidth>
                            <InputLabel id="selectLabel" required>Select your favorite animal</InputLabel>
                            <Select
                                labelId="selectLabel"
                                id="select"
                                label="Select your favorite animal"
                                defaultValue="" //Para que no haya ningún campo seleccionado por defecto
                                onChange={handleChangeFavAnimal}
                                value={data.favAnimal}
                                required
                            >
                                {/*Cada item del select*/}
                                <MenuItem value="dog">Dog</MenuItem>
                                <MenuItem value="cat">Cat</MenuItem>
                                <MenuItem value="horse">Horse</MenuItem>
                                <MenuItem value="rabbit">Rabbit</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={12}>
                        <Divider/>
                    </Grid>
                    <Grid size={{xs: 5, sm: 3, md: 2}}>
                        <Typography>Rate this survey</Typography>
                    </Grid>
                    <Grid size={{xs: 7, sm: 9, md: 10}}>
                        <Rating
                            onChange={handleChangeUserRating}
                            value={data.userRating}
                            required
                        ></Rating>
                    </Grid>
                    <Grid size={12}>
                        <FormGroup>
                            <FormControlLabel
                                required
                                // El checkbox con el valor de data.terms (true o false)
                                control={<Checkbox onChange={handleChangeTerms} checked={data.terms}/>}
                                label="I have read and agree to the terms and conditions"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid size={6}>
                        <Button
                            fullWidth
                            type='submit'
                            variant='contained'
                            disabled={!data.terms} // Si el checkbox no está marcado (false), entonces el botón está deshabilitado (!false)
                        >Submit</Button>
                    </Grid>
                    <Grid size={6}>
                        <Button
                            fullWidth
                            variant='outlined'
                            color='error'
                            onClick={handleClear}
                        >Clear</Button>
                    </Grid>
                </Grid>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="dialogTitle"
                    aria-describedby="dialogDescription"
                >
                    <DialogTitle id="dialogTitle">
                        {"Confirmation"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="dialogDescription">
                            Are you sure that you want to send this survey?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>NO</Button>
                        <Button onClick={handleClose}>YES</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    )
}

export default FormPage