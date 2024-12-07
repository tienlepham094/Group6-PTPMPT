import SearchIcon from "@mui/icons-material/Search";
import { styled, Paper, IconButton, InputBase } from "@mui/material";

const StyledPaper = styled(Paper)({
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: "30px",
  height: "70%",
  padding: "2px 4px",
  backgroundColor: "white",
});

const StyledInputBase = styled(InputBase)({
  marginLeft: 8,
  flex: 1,
  fontFamily: "'Jaro', sans-serif", // Ensures the Jaro font is applied
});

const SearchField = () => {
  return (
    <StyledPaper as="form">
      <IconButton
        type="button"
        sx={{ p: "10px", color: "#555555" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <StyledInputBase placeholder="Search for something spicy ..." />
    </StyledPaper>
  );
};

export default SearchField;
