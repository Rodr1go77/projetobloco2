import TextField from "./TextField"; 
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ placeholder = "Busque o seu time favorito...", ...rest }) => {
  return (
    <TextField
      placeholder={placeholder}
      variant="outlined"
      size="small"
      {...rest} 
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon/>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
