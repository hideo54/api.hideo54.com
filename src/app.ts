import Fastify from 'fastify';
import dotenv from 'dotenv';
dotenv.config();

const app = Fastify();
app.get('/', async (request, reply) => {
    reply.send({
        message: 'Sorry, this fox is LoveLive! only.',
    });
});

app.listen({
    port: Number(process.env.PORT) || 8080,
});
