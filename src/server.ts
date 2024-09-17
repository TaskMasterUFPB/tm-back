import { app } from './app'

const port = Number(process.env.PORT) || 3000

app.listen({
    port: 3000,
    host: '0.0.0.0'
}).then(() => {
    console.log(`Server listening on port ${port}`)
})