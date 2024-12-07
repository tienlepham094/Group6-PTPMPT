import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

interface CardInfoProps {
  title: string;
  icon: React.ReactNode; // Type for icon as a JSX element
  description: string;
}

const CardInfo: React.FC<CardInfoProps> = ({ title, icon, description }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#f8f4ef",
        borderRadius: 3,
        width: 155,
        padding: 2,
        textAlign: "center",
        height: 110,
      }}
    >
      <CardContent
        sx={{
          width: "100%",
          padding: 0,
          paddingBottom: 0,
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 1,
          }}
        >
          {icon}
        </Box>
        <Typography
          fontSize={"10px"}
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 1 }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardInfo;
