import { IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FieldErrors, useForm } from "react-hook-form";
type Props = { showSearchField?: boolean };

const HeaderSearch = ({ showSearchField }: Props) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      searchText: "",
    },
    mode: "onSubmit",
  });

  const onSuccess = (values: any) => {
    console.log(values);
  };

  const onError = (errors: FieldErrors<{ searchText: string }>) => {
    console.log(errors);
  };

  return (
    <Paper
      component="form"
      sx={{
        display: { xs: "block", md: "flex" },
        position: { xs: "absolute", md: "relative" },
        top: { xs: "5rem", md: "initial" },
        left: { xs: 0, md: "initial" },
        width: { xs: "100%", md: "initial" },
        visibility: {
          xs: showSearchField ? "visible" : "hidden",
          md: "initial",
        },
        opacity: {
          xs: showSearchField ? 1 : 0,
          md: 1,
        },
        transition: "all 0.4s",
        mr: { md: 3 },
      }}
      onSubmit={handleSubmit(onSuccess, onError)}
    >
      <TextField
        id="searchText"
        label="Tìm kiếm"
        size="small"
        color="secondary"
        sx={{
          width: { xs: "100%", md: "max-content" },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton sx={{ mr: "-10px" }} type="submit">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...register("searchText")}
      />
    </Paper>
  );
};

export default HeaderSearch;
