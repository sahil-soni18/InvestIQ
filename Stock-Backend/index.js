import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import pg from "pg";
import bcrypt from "bcrypt";
import sendMail from "./mailer.js";
import schedule from 'node-schedule';

const saltRounds = 10;
dotenv.config();

const app = express();
const port = process.env.REACT_SERVER_PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new pg.Client({
    host: "localhost",
    user: "postgres",
    database: process.env.REACT_DATABASE,
    password: process.env.REACT_DATABASE_PASSWORD,
    port: 5432
});

client.connect();

const checkAndSendAlerts = async () => {
    try {
        const result = await client.query("SELECT * FROM alertuser");
        const alerts = result.rows;

        alerts.forEach(async (alert) => {
            const { stock, price, username, mail } = alert;

            try {
                const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock}.BSE&interval=5min&apikey=${process.env.REACT_API_KEY}`);
                console.log(`response.data: ${JSON.stringify(response.data)}`)
                const timeSeries = response.data["Time Series (5min)"];
                const currentPrice = timeSeries && Object.values(timeSeries)[0]["4. close"];

                console.log(`Current price of ${stock}: ${currentPrice}`);

                if (currentPrice && parseFloat(currentPrice) >= price) {
                    const subject = `Stock Alert: ${stock}`;
                    const text = `Hi ${username}, The stock price of ${stock} has reached your target price of ${price}. Current price: ${currentPrice}`;

                    await sendMail(mail, subject, text);
                    console.log(`Alert email sent to ${mail}`);
                }
            } catch (error) {
                console.error(`Error fetching stock data or sending email: ${error.message}`);
            }
        });
    } catch (error) {
        console.error(`Error querying alerts: ${error.message}`);
    }
};

// Schedule the alert check to run every 5 minutes
schedule.scheduleJob('*/5 * * * *', checkAndSendAlerts);

const checkRecord = async (email, password) => {
    try {
        const result = await client.query("SELECT user_password FROM users WHERE email = $1", [email]);
        if (result.rows.length === 0) {
            return false; // No user found with that email
        }
        const hashedUserPassword = result.rows[0].user_password;
        return await bcrypt.compare(password, hashedUserPassword);
    } catch (error) {
        console.error('Error checking record:', error);
        throw error;
    }
};

app.post('/users/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (await checkRecord(email, password)) {
            res.status(200).send({ message: 'Login successful', loggedIn: true, email: email });
        } else {
            res.status(401).send({ message: 'Invalid credentials', loggedIn: false });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

app.post("/users/signup", async (req, res) => {
    const { username, email, user_password } = req.body;

    try {
        const emailExists = await client.query("SELECT email FROM users WHERE email = $1", [email]);
        if (emailExists.rows.length > 0) {
            return res.status(400).send({ message: 'Email already exists' });
        }

        const hash = await bcrypt.hash(user_password, saltRounds);
        await client.query("INSERT INTO users (username, email, user_password) VALUES ($1, $2, $3)", [username, email, hash]);
        res.status(201).send({ message: 'User registered successfully' });

    } catch (error) {
        if (error.code === '23505') {
            res.status(400).send({ message: 'Username already exists' });
        } else {
            console.error('Error during signup:', error);
            res.status(500).send({ message: 'Internal server error' });
        }
    }
});

app.post("/setAlert", async (req, res) => {
    const { price, stock, email } = req.body;

    try {
        await client.query("INSERT INTO alertuser (username, price, stock, mail) VALUES ($1, $2, $3, $4)", [email, price, stock, email]);
        res.status(200).send({ message: 'Alert set successfully' });
    } catch (error) {
        console.error('Error setting alert:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
