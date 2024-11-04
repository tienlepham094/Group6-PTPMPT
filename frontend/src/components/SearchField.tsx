// components/SearchField.tsx
import SearchIcon from "@mui/icons-material/Search";
import "./SearchField.css";
import { Paper, IconButton, InputBase, Divider } from "@mui/material";

const SearchField = () => {
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for something spicy ...  "
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </Paper>
  );
};

export default SearchField;
