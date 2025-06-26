"use client";

import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Grid,
  Alert,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { createUser } from "@/lib/actions";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await createUser(email, password, name);
      
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 2000);
      }
    } catch (error: any) {
      setError(error.message || "Произошла ошибка при регистрации");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Paper elevation={10} className="w-96 p-4">
        <Alert severity="success">
          Регистрация успешна! Перенаправляем на страницу входа...
        </Alert>
      </Paper>
    );
  }

  return (
    <Paper elevation={10} className="w-96 p-4">
      <Typography component="h1" variant="h5" className="text-center">
        Sign Up
      </Typography>
      
      {error && (
        <Alert severity="error" className="mt-2">
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate className="mt-2">
        <TextField
          placeholder="Enter your name"
          fullWidth
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4"
          disabled={loading}
        />
        <TextField
          placeholder="Enter email"
          fullWidth
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
          disabled={loading}
        />
        <TextField
          placeholder="Enter password"
          fullWidth
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
          disabled={loading}
        />
        
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth 
          className="mt-2"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
      </Box>
      
      <Grid container justifyContent="center" className="mt-4">
        <Grid>
          <Link href="/auth/login">
            Already have an account? Sign In
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
}