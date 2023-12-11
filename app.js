require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const cors = require('cors');

const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');

// swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

// routers
const authRouter = require('./routes/auth');
const boardRouter = require('./routes/board');
const listRouter = require('./routes/list');
const cardRouter = require('./routes/card');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>TaskPro API</h1><a href="/api-docs">Documentation</a>');
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// routes
app.use('/api/taskPro/users', authRouter);
app.use('/api/taskPro/boards', authenticateUser, boardRouter);
app.use('/api/taskPro/lists', authenticateUser, listRouter);
app.use('/api/taskPro/cards', authenticateUser, cardRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
