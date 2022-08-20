import { Box, Container, Divider, Stack } from "@mui/material";
import donor_1 from "Assets/img/Donors/box-light.svg";
import donor_2 from "Assets/img/Donors/eventbrite-light.svg";
import donor_3 from "Assets/img/Donors/nasdaq-light.svg";
import donor_4 from "Assets/img/Donors/netapp-light.svg";
import donor_5 from "Assets/img/Donors/volkswagen-light.svg";

const donors = [donor_1, donor_2, donor_3, donor_4, donor_5];

const Donors = () => {
  return (
    <Box sx={{ bgcolor: "primary.dark" }}>
      <Container sx={{ py: 5 }}>
        <Stack direction="row" justifyContent="center" flexWrap="wrap">
          {donors.map((donor, index) => (
            <Box sx={{ mx: 2 }}>
              <img key={index} src={donor} alt={donor} />
            </Box>
          ))}
        </Stack>
      </Container>
      <Divider light sx={{ borderColor: "rgba(256, 256, 256, 0.5)" }} />
    </Box>
  );
};

export default Donors;
