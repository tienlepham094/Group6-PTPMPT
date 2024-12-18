import React from "react";
import { Typography, Box, Stack, Divider } from "@mui/material";
import "./About.css";

export const About = () => {
  return (
    <Box className="about-container">
      <Typography variant="h3" className="about-title">
        Nhóm 6
      </Typography>
      <Typography variant="h5" className="about-subtitle">
        Thành viên
      </Typography>
      {/* <Divider className="about-divider" /> */}
      <Stack spacing={2} alignItems="center" className="about-members">
        <Typography variant="body1">Trần Phạm Thành Long</Typography>
        <Typography variant="body1">Nguyễn Duy Thái</Typography>
        <Typography variant="body1">Nguyễn Xuân Sơn</Typography>
        <Typography variant="body1">Lê Phạm Thủy Tiên</Typography>
      </Stack>
    </Box>
  );
};
