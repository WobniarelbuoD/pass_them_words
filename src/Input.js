import React, { useEffect, useState } from "react";
import InputUnstyled from "@mui/base/InputUnstyled";
import { styled } from "@mui/system";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, ListItem, ListItemText, Paper, Typography,} from "@mui/material";
//variables outside
const blue = {100: "#DAECFF", 200: "#80BFFF", 400: "#3399FF", 600: "#0072E5",};
const grey = { 50: "#F3F6F9", 100: "#E7EBF0", 200: "#E0E3E7", 300: "#CDD2D7", 400: "#B2BAC2", 500: "#A0AAB4", 600: "#6F7E8C", 700: "#3E5060",800: "#2D3843",900: "#1A2027",};

const StyledInputElement = styled("input")(
  ({ theme }) => `
  width: 250px;
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
  //variables inside
    const [password,passwordUpdate] = useState("No Password Generated Yet")
    const [input,inputUpdate] = useState(10)
    const [passwords,passwordsUpdate] = useState(JSON.parse(localStorage.getItem('content')) === null ? [] : JSON.parse(localStorage.getItem('content')))
    const [form1,form1Update] = useState(true)
    const [form2,form2Update] = useState(true)
    const [form3,form3Update] = useState(false)
    const [form4,form4Update] = useState(false)

    const min = 1;
    const max = 50;

    useEffect(()=>{ localStorage.setItem('content', JSON.stringify(passwords)) }, [passwords])
    
    //functions
      const handleChange = e => {
        const value = Math.max(min, Math.min(max, Number(e)));
        inputUpdate(value);
      };

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
            passwords.pop()
        }
        passwordsUpdate([sum,...passwords])
    }
    passwordUpdate(sum)
    }

    const reset = () =>{
      passwordsUpdate([])
      inputUpdate(10)
      form1Update(true)
      form2Update(true)
      form3Update(false)
      form4Update(false)
      passwordUpdate("")
    }


//html / jsx
  return (
    <Box sx={{color:"white"}}>
    <Typography sx={{mb:10,fontSize:{lg:"4rem", md:"3rem",sm:"2rem",xs:"1.3rem"}}} variant="h4">Supa Password Žėnėrator</Typography>
    <Box sx={{display:"flex",justifyContent:"space-between",alignItems:{xl:"baseline",lg:"baseline",md:"baseline",sm:"baseline"}, flexDirection:{xl:"row",lg:"row",md:"column",sm:"column",xs:"column"}, mt:10,}}>
      <Box sx={{width:"40vw",display:"flex"}}>

        <form onSubmit={(event) => generator(event)}>
        <Typography sx={{mb:3,fontSize:{lg:"3rem", md:"2.5rem",sm:"2rem",xs:"1.3rem"}}} variant="h4">Žėnėrator</Typography>
          <InputUnstyled sx={{width:"250px"}} onChange={(e) => handleChange(e.target.value)} value={input} type="number" components={{ Input: StyledInputElement }}{...props}ref={ref}/>
          <FormGroup>
            <FormControlLabel onChange={(e) => form1Update(e.target.checked)} control={<Checkbox checked={form1} />} label="Mažosios raidės"/>
            <FormControlLabel onChange={(e) => form2Update(e.target.checked)} control={<Checkbox checked={form2} />}label="Didžiosios raidės" />
            <FormControlLabel onChange={(e) => form3Update(e.target.checked)} control={<Checkbox checked={form3} />} label="Skaičiai" />
            <FormControlLabel onChange={(e) => form4Update(e.target.checked)} control={<Checkbox checked={form4} />} label="Simboliai" />
          </FormGroup>
          <Button type="submit" variant="contained" sx={{color:"white",mr:2}}>Generate</Button>
          <Button onClick={() => reset()} variant="contained" sx={{color:"white"}}>Reset</Button>
        </form>
      </Box>
      <Box>
      <Typography sx={{fontSize:{lg:"3rem", md:"2.5rem",sm:"2rem",xs:"1rem"},pt:5}} variant="h3">New Password</Typography>
      <Paper sx={{width:{xl:"500px", lg:"500px", md:"500px", sm:"400px", xs:"250px", },fontSize:{xl:"2.5rem",lg:"2.5rem",md:"2.5rem",sm:"2rem",xs:"1.5rem"},wordWrap:"break-word"}}>
        <div>{password}</div>
      </Paper>
        <Typography sx={{mt:10, fontSize:{lg:"3rem", md:"2.5rem",sm:"2rem",xs:"1.3rem"}}} variant="h4">Password History</Typography>
      <Paper sx={{width:{xl:"500px", lg:"500px", md:"500px", sm:"400px", xs:"250px", },minHeight:"50px",fontSize:{xl:"2.5rem",lg:"2.5rem",md:"2.5rem",sm:"2rem",xs:"1.5rem"}}}>
      {passwords.map((item,index) => {
          return (
            <ListItem key={index}>
              <ListItemText style={{wordBreak:"break-word"}} primary={item}></ListItemText>
            </ListItem>
          );
        })}
      </Paper>
      </Box>
    </Box>
    </Box>
  );
});
//export duhh
export default function Input() {
  return <CustomInput aria-label="Demo input" placeholder="Password Length" />;
}
