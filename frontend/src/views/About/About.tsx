import React, { useState } from "react";
import { Typography, Box, Stack, TextField, Button } from "@mui/material";
import "./About.css";
import axios from "axios"; // Add axios for API requests

export const About = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page reload

    try {
      setIsSubmitting(true);

      // Send form data to the email API
      const response = await axios.post(
        "https://your-api-endpoint.com/send-email",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }
      );

      console.log("Email sent successfully:", response.data);

      // Reset form fields
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      alert("Your message has been sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("There was an error sending your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Title */}
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          marginBottom: "10px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Support Form
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#666",
        }}
      >
        We’re here to help! Please fill out the form below.
      </Typography>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ width: "100%" }}>
          {/* Name Field */}
          <TextField
            id="name"
            label="Your Name"
            variant="outlined"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange}
            sx={{ backgroundColor: "#f9f9f9" }}
          />

          {/* Email Field */}
          <TextField
            id="email"
            label="Your Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
            sx={{ backgroundColor: "#f9f9f9" }}
          />

          {/* Message Field */}
          <TextField
            id="message"
            label="Message"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            required
            value={formData.message}
            onChange={handleChange}
            sx={{ backgroundColor: "#f9f9f9" }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={isSubmitting} // Disable button while submitting
            sx={{
              backgroundColor: "#4285f4",
              color: "white",
              "&:hover": {
                backgroundColor: "#357ae8",
              },
            }}
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
