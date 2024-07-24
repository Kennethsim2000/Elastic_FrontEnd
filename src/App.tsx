import TextField from "@mui/material/TextField";
import "./styles/tailwind.css";
import Button from "@mui/material/Button";
import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const handleClick = () => {
    console.log(inputValue);
  };
  return (
    <div className="flex items-start justify-center w-full h-screen pt-16">
      <div className="w-4/5 max-w-md">
        <TextField
          id="standard-multiline-flexible"
          label="Enter your search here"
          variant="standard"
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button onClick={handleClick} variant="outlined">
          Search
        </Button>
      </div>
    </div>
  );
}

export default App;
