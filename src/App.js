import { Container } from '@mui/material';
import './App.css';
import Input from './Input';

function App() {
  return (
    <div  className="App">
    <div style={{background:"linear-gradient(to right, rgb(242, 112, 156), rgb(255, 148, 114))",minWidth: "100vw",minHeight: "100vh",position: "fixed",zIndex: -5,left:0,top:0}}></div>
    <Container>
      <Input></Input>
    </Container>
    </div>
  );
}

export default App;
