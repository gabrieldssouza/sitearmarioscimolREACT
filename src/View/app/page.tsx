'use client'

import LoginForm from '../components/login-form'
import React from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <LoginForm />
    </main>
  )
}

