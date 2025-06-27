"use client";

import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Grid,
  Alert,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Неверный email или пароль");
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      setError("Произошла ошибка при входе");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={10} className="w-96 p-4">
      <Typography component="h1" variant="h5" className="text-center">
        Вход
      </Typography>
      
      {error && (
        <Alert severity="error" className="mt-2">
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate className="mt-2">
        <TextField
          placeholder="Почта"
          fullWidth
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
          disabled={loading}
        />
        <TextField
          placeholder="Пароль"
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
          {loading ? "Загрузка..." : "Войти"}
        </Button>
      </Box>
      
      <Grid container justifyContent="space-between" className="mt-4">
        <Grid>
          <Link href="/auth/forgot-password" className="text-blue-800 hover:underline text-sm">
            Забыли пароль?
          </Link>
        </Grid>
        <Grid>
          <Link href="/auth/register" className="text-blue-800 hover:underline text-sm">
            Нет аккаунта? Регистрация
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
}