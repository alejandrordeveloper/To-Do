const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const { PAGE_URL } = require('../config')

//ENDPOINT
usersRouter.post('/', async (req, res) =>{
    console.log(req.body);
    
    const {name, email, password} = req.body;
    
    //VALIDACION A NIVEL DE BACKEND
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Todos los espacios son requeridos' });
    }
    //VERFICIACION SI EL CORREO SE VERIFICO ANTES
    const userExist = await User.findOne({ email });
    if (userExist) {
        return res.status(400).json({ error: 'El email ya se encuentra en uso' })
    }

    //ENCRYPTACION DE LA CONTRASE;A
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    console.log(passwordHash);

    //REGISTRO DE BASE DE DATOS
    const newUser = new User({
        name, 
        email,
        passwordHash,
});

    const savedUser = await newUser.save();
    console.log(savedUser);

    //TRABAJAR CON LOS  WEB TOKEN
    const token = jwt.sign({ id: savedUser.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '10m'
});

    //NODEMAILER
    const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
  secure: false, // true for 465, false for other ports
    auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    },
});

//Wrap in an async IIFE so we can use await.
(async () => {
try {
    const info = await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: savedUser.email, // list of receivers
    subject: "Verificacion de usuario", // Subject line
    html: `<a href="${PAGE_URL}/verify/${savedUser.id}/${token}">Verificar correo</a>`, // html body
});

    return res.status(201).json('Usuario creado. Por favor verifica tu correo')

    console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
    console.error("Error while sending mail", err);
}
})();

});

usersRouter.patch('/:id/:token', async (req, res) => {
    try {
        const token = req.params.token;
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const id = decodedToken.id;
        await User.findByIdAndUpdate(id, { verified: true });
        return res.sendStatus(200);
    } catch (error) {
        // Encontrar el email del usuario por ID
        const id = req.params.id;
        const { email } = await User.findById(id);

        // Sign a new token if the previous has expired
        const token = jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '10m'
});

    //NODEMAILER-ENVIAR EL EMAIL
    const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
  secure: false, // true for 465, false for other ports
    auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    },
});

//Wrap in an async IIFE so we can use await.

    await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: email, // list of receivers
    subject: "Verificacion de usuario", // Subject line
    html: `<a href="${PAGE_URL}/verify/${id}/${token}">Verificar correo</a>`, // html body
});
        return res.status(400).json({ error: 'El link ya expiró. Se ha enviado un nuevo lin de verificació a su correo' });
    }
});


module.exports = usersRouter;