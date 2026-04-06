import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());

app.get('/', (req, res)=> {
    res.json({message: 'Hello World' });
})

app.get('/details', (req, res) =>{
    res.json({name: 'Saksham', age: 20, profession: 'Software Engineer' });
})

app.listen(4000);