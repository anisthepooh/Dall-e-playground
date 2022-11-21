import { Button, TextField } from "@mui/material";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from '@mui/material';
import './App.css';
import { height } from "@mui/system";

function App() {
  const [prompt, setPrompt] = useState(""); 
  const [result, setResult] = useState(''); 
  const [apikey, setApiKey] = useState(''); 

  const key = "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"
  const configuration = new Configuration({
    apiKey: key,
  }); 


  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    const res = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "1024x1024", 
  });
  setResult(res.data.data[0].url)
  console.log("S")
  }
  
  let altText = "A image of" + prompt; 

  return (
    <div clasName="App">
      <div className="card">
        <h1>Meet Dall-e, your  new best AI friend 🤖</h1>
        {result.length > 0 ?<img alt={altText} src={result} className="generated-image" /> : <InfinitySpin width="20%" color="black"/>}
          <TextField sx={{textAlign: 'center'}} variant="outlined" label="Type something!" size="large" multiline fullWidth onChange={(e) => setPrompt(e.target.value)} /> 
        <Button variant="outlined" size="large"  onClick={generateImage}> Generate an Image </Button>
      </div>
      <SpeedDial 
      ariaLabel="Menu" 
      sx={{position: "absolute", bottom: "16px", right: "16px"}}
      icon={<SpeedDialIcon/>}
      

      />
    </div>
  );
}

export default App;
