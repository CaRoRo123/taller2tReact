This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



#APuntes
UseState hook de estado local que re-renderiza un componente
"use Client"
import {useState} from "react;
function Contador({
    const [cout, setCount] = useState(0);
    return(
    <div>
    <p>conteo: {cout}</p>
    <button onClick={()=> setCount(cout+1)}>suma </button>
    </div>
})

#Para este tambien se pueden usar objetos, y asi quedas con hartas variables

interface SerieForm{
    title:String;
    genre: String;
}
function SerieFormComponent() {
    const [form, setForm] = useState<SerieForm>({
        title: "",
        genre: "",
        seasons: 1,
    });


#importamos {useState, useEffect} from "react"
#hacemos una interfaz (si hay tiempo) que tiene las variables y quiza una funcion
#Creamos el hook (funcion )
##Esta debe tener la constante [variable, setVariable] = setVariable("Termino Inicial")
##Funcion clave para los cambios onChange
<input 
    type="text"
    value={variable}
    onChange={(e)=>setVariable(e.target.value)}
    placeholder = "ponga variable"
/>

"use client";
import { useState } from "react";

interface LoginFormProps {
    onSubmit: (data: { email: string; password: string }) => void;
}

function LoginForm({ onSubmit }: LoginFormProps) {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = (): boolean => {
        const newErrors = { email: "", password: "" };
        if (!form.email.includes("@")) newErrors.email = "Email invalido";
        if (form.password.length < 6) newErrors.password = "Minimo 6 caracteres";
        setErrors(newErrors);
        return !newErrors.email && !newErrors.password;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(form);
            setForm({ email: "", password: "" });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" />
            {errors.email && <span>{errors.email}</span>}
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" />
            {errors.password && <span>{errors.password}</span>}
            <button type="submit">Iniciar sesion</button>
        </form>
    );
}

export default LoginForm;