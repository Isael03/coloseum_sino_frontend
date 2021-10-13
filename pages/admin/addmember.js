import Dashboard from "../../shared/layouts/Dashboard/Dashboard";
import Head from "next/head";

//materialui
import Typography from "@mui/material/Typography";
import {
  Paper,
  TextField,
  Grid,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button
} from "@mui/material";
import { Save } from "@mui/icons-material";


import { useEffect, useState } from "react";

const AddMember = () => {
  //const [jobs, setJobs] = useState([]);
  const [formDataMember, setFormDataMember] = useState({
    name: '',
    job: '',
    patk: 0,
    matk: 0,
    pdef: 0,
    mdef: 0,
    jobs: ["Breaker",
      "Gunner",
      "Crusher",
      "Paladin",
      "Sorcerer",
      "Cleric",
      "Minstrel",
      "Mage",
      "MinSorc",
      "SorcMin"],
    secondarySpecs: []
  });

  const [specs, setSpecs] = useState([
    { check: false, id: 'chkBreaker', job: 'Breaker' },
    { check: false, id: 'chkGunner', job: 'Gunner' },
    { check: false, id: 'chkCrusher', job: 'Crusher' },
    { check: false, id: 'chkPaladin', job: 'Paladin' },
    { check: false, id: 'chkSorcerer', job: 'Sorcerer' },
    { check: false, id: 'chkCleric', job: 'Cleric' },
    { check: false, id: 'chkMinstrel', job: 'Minstrel' },
    { check: false, id: 'chkMage', job: 'Mage' },
    { check: false, id: 'chkMinSorc', job: 'MinSorc' },
    { check: false, id: 'chkSorcMin', job: 'SorcMin' },


  ]);



  function handleOnSubmit(event) {
    event.preventDefault();
    console.log(formDataMember);
  }

  function handleChange(event) {
    setFormDataMember({
      ...formDataMember,
      [event.target.name]: event.target.value
    })
  }

  return (
    <>
      <Head>
        <title>Agregar miembro</title>
      </Head>
      <AddMemberContainer
        setFormDataMember={setFormDataMember}
        formDataMember={formDataMember}
        handleOnSubmit={handleOnSubmit}
        handleChange={handleChange}
        specs={specs}
        setSpecs={setSpecs}
      />
    </>
  );
};

const AddMemberContainer = (props) => {
  const { handleOnSubmit, formDataMember, handleChange, setFormDataMember, specs, setSpecs } = props
  const { jobs } = formDataMember


  return (
    <>
      <Dashboard>
        <Typography variant="h4" className="cmb-3">
          Agregar nuevo miembro
        </Typography>

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleOnSubmit}

        >
          <Paper >
            <Grid container spacing={1} className='cp-2'>
              <Grid item xs={12} md={4}>
                <Typography variant="h5" className="cmy-1 cml-1">
                  General
                </Typography>
                <TextField
                  label="Nombre"
                  variant="standard"
                  size="small"
                  margin="dense"
                  sx={{ m: 1, minWidth: 100 }}
                  name='name'
                  value={formDataMember.name}
                  onChange={handleChange}
                />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 205 }}>
                  <InputLabel id="demo-simple-select-label">
                    Especialidad
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Especialidad"
                    value={formDataMember.job}
                    onChange={handleChange}
                    name='job'

                  >
                    <MenuItem value="">Ninguno</MenuItem>
                    {jobs.map((job, key) => (
                      <MenuItem value={job} key={job}>
                        {job}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>


              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h5" className="cmy-1 cml-1">
                  Puntos
                </Typography>
                <TextField
                  label="Ataque físico"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  defaultValue="0"
                  name='patk'
                  onChange={handleChange}
                />
                <TextField
                  label="Ataque mágico"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  defaultValue="0"
                  name='matk'
                  onChange={handleChange}
                />
                <TextField
                  label="Defensa física"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  defaultValue="0"
                  name='pdef'
                  onChange={handleChange}
                />
                <TextField
                  label="Defensa mágica"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  defaultValue="0"
                  name='mdef'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h5" className="cmy-1 cml-1">
                  Especialidades
                </Typography>
                <FormGroup>
                  <Grid item xs={12} md={12}>{CustomCheckbox(specs, setSpecs, setFormDataMember, formDataMember)}</Grid>
                </FormGroup>
              </Grid>
            </Grid>
            <div className="center-block">
              <Button variant="contained" endIcon={<Save />} type='submit' className='cmy-4'>
                Guardar
              </Button>
            </div>
          </Paper>
        </Box>
      </Dashboard>
    </>
  );
};


function CustomCheckbox(specs, setSpecs, setFormDataMember, formDataMember) {

  const onSeleccion = (e) => {
    let { name, value } = e.target;
    let allSpecs = [...specs];
    let index = allSpecs.findIndex(el => el.id == name)
    allSpecs[index].check = !allSpecs[index].check;

    setSpecs([...allSpecs])
    let secondarySpecs = specs.filter(el => el.check).map(el => el.job)

    //Actualizar estado global
    setFormDataMember({ ...formDataMember, secondarySpecs: secondarySpecs })
  }


  return (
    specs.map(({ job, check, id }) => <FormControlLabel
      control={<Checkbox id={id} name={`chk${job}`} />}
      label={job}
      key={job}
      checked={check}
      onChange={(e) => onSeleccion(e)}
      value={job}
      defaultChecked={false}
    />))
}

export default AddMember;
