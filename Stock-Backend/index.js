import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors"
import pg from "pg";
import bcrypt from "bcrypt";

const saltRounds = 10;
const bcryptKey = "This-is-Key"




dotenv.config();

const app = express();
const port = process.env.REACT_SERVER_PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new pg.Client({
    "host": "localhost",
    "user": "postgres",
    "database": process.env.REACT_DATABASE,
    "password": process.env.REACT_DATABASE_PASSWORD,
    "port": 5432
})

client.connect()


const checkRecord = async (...args) => {
    if (args.length > 1) {
        try {
            const result = await client.query("SELECT user_password FROM users WHERE email = $1", [args[0]]);
            if (result.rows.length === 0) {
                return false; // No user found with that email
            }
            const hashedUserPassword = result.rows[0].user_password;

            console.log(`Going to compare ${args[0]} against ${hashedUserPassword}`);

            const match = await bcrypt.compare(args[1], hashedUserPassword);
            if (match === false) {
                console.error('Passwords do not match.');
                return false;
            }
            return match;
        } catch (error) {
            console.error('Error checking record:', error);
            throw error;
        }
    } else {
        return new Promise((resolve, reject) => {
            client.query("SELECT * FROM users WHERE email = $1", [args[0]], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows.length > 0);
                }
            });
        });
    }
};


app.use(express.json());

let data3 = [];

app.get("/", (req, res) => {
    const requests = [
        axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=TSLA&interval=1min&apikey=${process.env.REACT_API_KEY}`),
        axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=NVDA&interval=1min&apikey=${process.env.REACT_API_KEY}`),
        axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=GOOGL&interval=1min&apikey=${process.env.REACT_API_KEY}`)
    ];

    Promise.all(requests)
        .then(responses => {
            data3 = responses.map(response => response.data["Time Series (1min)"]);
            res.send(data3);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error fetching data");
        });
});

app.get("/stock/:name", (req, res) => {
    const name = req.params.name;
    console.log(name);
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${name}&interval=1min&apikey=${process.env.REACT_API_KEY}`)
        .then(response => {
            res.send(response.data["Time Series (5min)"]);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error fetching stock data");
        });
});

app.post('/users/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Received Login email:', email);
    console.log('Received Login password:', password);
    
    // You can add your authentication logic here
    if (await checkRecord(email, password)) {
        res.status(200).send({ message: 'Login successful' });
    } else {
        res.status(401).send({ message: 'Invalid credentials' });
    }
});


app.post("/users/signup", async (req, res) => {

    if (await checkRecord(req.body.email)) {
        return res.status(400).send({ message: 'Email already exists' });
    }

    const { username, email, user_password } = req.body;
    console.log(`User ${username}`)
    console.log('Received email:', email);
    console.log('Received password:', user_password);

    await bcrypt.hash(user_password, saltRounds, async function(err, hash) {
        console.log(`Hash: ${hash}`);
        const response =  await client.query("INSERT INTO users (username, email, user_password) VALUES ($1, $2, $3)",  [username, email, hash]);

        console.log(response);
        return response;

    })

});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
