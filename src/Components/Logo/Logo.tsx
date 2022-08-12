import styled from "@emotion/styled";
import { Box } from "@mui/material";
import LogoImg from "Assets/img/Logo/LogoImg.png";
type Props = {};

const ImageLogo = styled.img`
  width: 7rem;
`;
const StyledLogo = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Logo = (props: Props) => {
  return (
    <StyledLogo>
      <ImageLogo
        // src="https://i.pinimg.com/564x/b3/7a/5a/b37a5a8a62db73381b9f2909bdb6545e.jpg"
        src={LogoImg}
        alt={LogoImg}
      />
    </StyledLogo>
  );
};

export default Logo;
