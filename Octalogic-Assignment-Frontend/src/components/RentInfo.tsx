import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";

const features = [
  "Choose from a wide range of vehicles",
  "Book instantly without phone calls",
  "Transparent pricing with no hidden charges",
  "Flexible pickup and drop locations",
  "24/7 customer support",
  "Fully insured and serviced vehicles",
];

const RentInfo = () => {
  return (
    <Box maxWidth={400}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Rent a Vehicle
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Create your booking and explore a flexible, affordable, and reliable way
        to get around.
      </Typography>
      <List>
        {features.map((feature, idx) => (
          <ListItem key={idx} disableGutters>
            <ListItemIcon sx={{ minWidth: 32, color: "green" }}>
              <FaCheckCircle />
            </ListItemIcon>
            <ListItemText
              primary={feature}
              primaryTypographyProps={{ color: "textPrimary" }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RentInfo;
