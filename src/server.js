import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { logger } from './middleware/logger.js';
import notesRoutes from './routes/notesRoutes.js';
import { errors } from 'celebrate';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use(logger);

app.use(notesRoutes);
// обробка 404
app.use(notFoundHandler);
// обробка помилок від celebrate (валідація)
app.use(errors());
// глобальна обробка інших помилок
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
