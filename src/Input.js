import React, { useEffect, useState } from "react";
import InputUnstyled from "@mui/base/InputUnstyled";
import { styled } from "@mui/system";
import { Box, Checkbox, FormControlLabel, FormGroup, ListItem, ListItemText, Paper, Typography,} from "@mui/material";

const blue = {100: "#DAECFF", 200: "#80BFFF", 400: "#3399FF", 600: "#0072E5",};

const grey = { 50: "#F3F6F9", 100: "#E7EBF0", 200: "#E0E3E7", 300: "#CDD2D7", 400: "#B2BAC2", 500: "#A0AAB4", 600: "#6F7E8C", 700: "#3E5060",800: "#2D3843",900: "#1A2027",};

const StyledInputElement = styled("input")(
  ({ theme }) => `
  width: 320px;
  font-size: 0.875rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
  border-radius: 8px;
  padding: 12px 12px;

  &:hover {background: ${theme.palette.mode === "dark" ? "" : grey[100]};
    border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};}
&:focus {outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[100]};}`);



const CustomInput = React.forwardRef(function CustomInput(props, ref) {
    const [password,passwordUpdate] = useState("No Password Generated Yet")
    const [input,inputUpdate] = useState(10)
    const [passwords,passwordsUpdate] = useState(JSON.parse(localStorage.getItem('content')) === null ? [] : JSON.parse(localStorage.getItem('content')))
    const [form1,form1Update] = useState(true)
    const [form2,form2Update] = useState(true)
    const [form3,form3Update] = useState(false)
    const [form4,form4Update] = useState(false)

    useEffect(()=>{ localStorage.setItem('content', JSON.stringify(passwords)) }, [passwords])

    const formCheck1 = () =>{
        if(form1){
            form1Update(false)
        }
        else{
            form1Update(true)
        }
    }
    const formCheck2 = () =>{
        if(form2){
            form2Update(false)
        }
        else{
            form2Update(true)
        }
    }
    const formCheck3 = () =>{
        if(form3){
            form3Update(false)
        }
        else{
            form3Update(true)
        }
    }
    const formCheck4 = () =>{
        if(form4){
            form4Update(false)
        }
        else{
            form4Update(true)
        }
    }

    const generator = (event) =>{
        event.preventDefault();
        const lower="abcdefghijklmnopqrstuvwxyz"
        const upper="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const numb="0123456789"
        const symb="!@#$%^&*()_+-*/."
        let fullString = ""

        if(form1)fullString += lower
        if(form2)fullString += upper
        if(form3)fullString += numb
        if(form4)fullString += symb

        let sum = ""
        if(fullString.length === 0){
            sum = "No input detected"
        }
        else{
        for(let x=0; x < input;x++){
           sum += fullString[Math.floor(Math.random() * fullString.length)]
        }
        if(passwords.length > 9){
            passwords.splice(0,1)
        }
        passwordsUpdate([...passwords,sum])
    }
    passwordUpdate(sum)
    }


  return (
    <Box sx={{color:"white"}}>
    <Typography sx={{mb:10}} variant="h2">Supa Password Žėnėrator</Typography>
    <Box sx={{display:"flex",justifyContent:"space-between",flexDirection:"row", mt:10,}}>
      <Box sx={{width:"40vw",display:"flex"}}>

        <form onSubmit={(event) => generator(event)}>
        <Typography sx={{mb:3}} variant="h4">Password Žėnėrator</Typography>
          <InputUnstyled onChange={(e) => inputUpdate(e.target.value)} value={input} type="number" components={{ Input: StyledInputElement }}{...props}ref={ref}/>
          <FormGroup>
            <FormControlLabel onChange={() => formCheck1()} control={<Checkbox defaultChecked />} label="Mažosios raidės"/>
            <FormControlLabel onChange={() => formCheck2()} control={<Checkbox defaultChecked />}label="Didžiosios raidės" />
            <FormControlLabel onChange={() => formCheck3()} control={<Checkbox />} label="Skaičiai" />
            <FormControlLabel onChange={() => formCheck4()} control={<Checkbox />} label="Simboliai" />
          </FormGroup>
        </form>
      </Box>
      <Box>
      <Typography variant="h3">New Password</Typography>
      <Paper sx={{width:"500px",fontSize:"2.5rem",wordWrap:"break-word"}}>
        <div>{password}</div>
      </Paper>
        <Typography sx={{mt:10}} variant="h4">Password History</Typography>
      <Paper sx={{minWidth:"500px",minHeight:"50px",fontSize:"2.5rem"}}>
      {passwords.map((item,index) => {
          return (
            <ListItem key={index}>
              <ListItemText primary={item}></ListItemText>
            </ListItem>
          );
        })}
      </Paper>
      </Box>
    </Box>
    </Box>
  );
});

export default function Input() {
  return <CustomInput aria-label="Demo input" placeholder="Password Length" />;
}
