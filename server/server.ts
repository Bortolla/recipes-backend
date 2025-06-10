import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import recipesRoute from './routes/recipesRoute';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/recipes', recipesRoute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
