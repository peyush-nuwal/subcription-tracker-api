import express from 'express'
import { PORT } from './config/env.js';



import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subcriptionRouter from './routes/subcription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';


const app = express();


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())


app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/subcriptions',subcriptionRouter)

app.use(errorMiddleware)


app.get("/", (req ,res) => {
     res.send("samosa subcription API working!")
})


app.listen(PORT,async () => {
    console.log(`server is live on the  http://localhost:${PORT} `)

  await connectToDatabase()
})

export default app