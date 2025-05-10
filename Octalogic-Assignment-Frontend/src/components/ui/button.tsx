import React, { ButtonHTMLAttributes } from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

type Variant = "default" | "outline" | "ghost";

type ButtonProps = MuiButtonProps & {
  variantType?: Variant;
};

export const Button = ({
  variantType = "default",
  children,
  sx,
  ...props
}: ButtonProps) => {
  const getVariantProps = () => {
    switch (variantType) {
      case "outline":
        return {
          variant: "outlined" as const,
          sx: {
            borderColor: "primary.main",
            color: "primary.main",
            "&:hover": {
              backgroundColor: "primary.50",
              borderColor: "primary.main",
            },
            ...sx,
          },
        };
      case "ghost":
        return {
          variant: "text" as const,
          sx: {
            color: "text.primary",
            "&:hover": {
              backgroundColor: "grey.100",
            },
            ...sx,
          },
        };
      case "default":
      default:
        return {
          variant: "contained" as const,
          color: "primary" as const,
          sx: {
            ...sx,
          },
        };
    }
  };

  const variantProps = getVariantProps();

  return (
    <MuiButton
      fullWidth
      size="large"
      sx={{
        px: 4,
        py: 2,
        borderRadius: 4,
        fontWeight: 600,
        fontSize: "1rem",
        textTransform: "none",
        transition: "all 0.15s ease",
        ...variantProps.sx,
      }}
      {...props}
      variant={variantProps.variant}
      color={variantProps.color}
    >
      {children}
    </MuiButton>
  );
};
