import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import TPTL from './img/TPTL.jpg';
import NDT from './img/NDT.jpg';
import LPTT from './img/LPTT.jpg';
import NXS from './img/NXS.jpg';
import "./Spam.css";

// Cập nhật đường dẫn ảnh và link Facebook của từng thành viên
const teamMembers = [
  {
    name: "Trần Phạm Thành Long",
    role: "Founder & Creative Director",
    image: TPTL,
    facebook: "https://www.facebook.com/pelongngoan",
  },
  {
    name: "Nguyễn Duy Thái",
    role: "Advisor",
    image: NDT,
    facebook: "https://www.facebook.com/dtngx.nevershuy",
  },
  {
    name: "Lê Phạm Thủy Tiên",
    role: "Industry Partner",
    image: LPTT,
    facebook: "https://www.facebook.com/tienlepham094",
  },
  {
    name: "Nguyễn Xuân Sơn",
    role: "Alumnus",
    image: NXS,
    facebook: "https://www.facebook.com/profile.php?id=100038382530584",
  },
];
const Spam = () => {
    return<>
    <Box className="about-container">
    <Typography variant="h3" className="about-title">
      Nhóm 6
    </Typography>
    <Grid container spacing={4} justifyContent="center">
      {teamMembers.map((member, index) => (
        <Grid item key={index} xs={12} sm={6} md={3}>
          <Card className="team-card">
            <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="team-avatar-link">
              <div className="team-avatar-wrapper">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-avatar"
                />
              </div>
            </a>
            <CardContent>
              <Typography variant="h6" className="team-name">
                {member.name}
              </Typography>
              <Typography variant="body2" className="team-role">
                {member.role}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
    </>;
  };
  
  export default Spam;
  