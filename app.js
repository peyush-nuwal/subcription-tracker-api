import express from 'express'


const app = express();
const port = 3000

app.get("/", (req ,res) => {
     res.send("samosa subcription API working!")
})


app.listen(port, () => {
     console.log(`server is live on the  http://localhost:${port} `)
})

export default app