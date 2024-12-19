require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require("nodemailer");
const bodyparser = require('body-parser');
const crypto = require("crypto");
const app = express();
app.use(cors({
    origin: 'http://localhost:3000'  // Allow only the frontend origin
}));
const mongoose = require('mongoose');
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

//Main function
const mongoconn = async () => {
    try {
        const mongoconnect = await mongoose.connect("mongodb+srv://Kishore:Kishore%40333@riceshop.8kpns.mongodb.net/riceShopDB?retryWrites=true&w=majority&appName=riceShop")

        console.log("mongo connected");
    }
    catch (e) {
        console.error(e);
    }

    mongoose.set('debug', true);

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));

    const userCollection = db.collection("userdetails");

    // const productSchema= new mongoose.Schema({
    //         id:String,
    //         imgl:String,
    //         name:String,
    //         quantity:Number,
    //         price:Number,
    //         description:String,
    //         nutrient:Array,
    // })

    // const userLoginSchema = new mongoose.Schema({
    //     name:String,
    //     email:String,
    //     password:String,
    //     contact:String,
    //     address:String,
    //     country:String,
    //     cart:Array
    // })
    // const userProductModel = mongoose.model("DataSet1",productSchema);
    // const userLoginModel= mongoose.model("userDetails",userLoginSchema);

    app.post('/sendOtp', (req, res) => {
        const { email } = req.body;
        // Generate a 6-digit OTP
        if (!email) {
            return res.status(400).json({ err: 'Email is required' });
        }
        const otp = crypto.randomInt(100000, 999999);
        console.log(`email: ${email} otp: ${otp}`)
        const Transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        const mailOption = {
            from: process.env.EMAIL_USER,
            to: `${email}`,
            subject: "Your OTP Code",
            text: `Your OTP code is ${otp}`,
        }
        Transporter.sendMail(mailOption, (err, info) => {
            if (err) {
                console.error('Error sending OTP:', err);  // Log the error for debugging
                return res.status(500).json({ err: "Failed to send OTP" });
            }
            // Optionally, you can store the OTP in a database or session
            res.status(200).json({ message: "OTP sent successfully", otp });
            // otp is shown here for demo; don't return it in production
        })

    })

    app.get('/sendOtp', async (req, res) => {
        res.send(req.body);
    })
    app.put('/:email', async (req, res) => {
        try {
            const email = decodeURIComponent(req.params.email);

            // Find the user by email and e cart field
            const updatedUser = await userCollection.findOneAndUpdate(
                { email: email },
                { $set: { cart: req.body.cart } },
                { new: true } // Return the updated document
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            console.log(updatedUser);
            res.json("update");
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    })
    app.delete('/:email', async (req, res) => {
        try {
            const email = decodeURIComponent(req.params.email);
            let id = req.body.id;
            let cartArray = req.body.newArray;
            console.log('cartArr: ', cartArray);
            // let newarr = cartArray.filter((e) => {
            //     return e !== id;
            // })
            // console.log('newArr: ', newarr);
            const updatedUser = await userCollection.findOneAndUpdate(
                { email: email },
                { $set: { cart: cartArray } },
                { new: true } // Return the updated document
            );
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            console.log("user founded");
        }
        catch (e) {
            console.log('deletion error', e);
        }
    })








    app.post('/', async (req, res) => {

        const userLoginFormat = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            contact: req.body.contact,
            address: req.body.address,
            country: req.body.country,
            cart: req.body.cart
        }
        try {


            const result1 = await userCollection.insertOne(userLoginFormat);

        }
        catch (e) {
            console.error('error in saving data', e);
        }
    })

    app.get('/', async (req, res) => {
        try {
            const users = await db.collection("dataset1").find({}).toArray();
            const userLogins = await db.collection("userdetails").find({}).toArray();
            res.json({
                users: users,
                userLogins: userLogins
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving data');
        }
    })
    //end of mongo connection
}
mongoconn();

app.listen(8000, () => {
    console.log("The App is running");
})
