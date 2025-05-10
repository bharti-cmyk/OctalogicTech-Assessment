import React from "react";
import RentInfo from "../components/RentInfo";
import BookingForm from "../components/BookingForm";
import { Toaster } from "react-hot-toast";
import { Box, Paper, Stack, useMediaQuery, useTheme } from "@mui/material";

const BookingPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        p: 2,
      }}
    >
      <Stack
        direction={isSmallScreen ? "column" : "row"}
        spacing={4}
        sx={{ width: "100%" }}
      >
        {/* Left Side: Rent Info */}
        <Paper
          sx={{
            flex: 1,
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: "#f8f9fa",
          }}
        >
          <RentInfo />
        </Paper>

        {/* Right Side: Booking Form */}
        <Paper
          sx={{
            flex: 1,
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: "#ffffff",
          }}
        >
          <BookingForm />
        </Paper>
      </Stack>

      {/* Toast notifications */}
      <Toaster />
    </Box>
  );
};

export default BookingPage;
