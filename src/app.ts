import Fastify from 'fastify';
import dotenv from 'dotenv';
dotenv.config();

const app = Fastify();
app.get('/', async (request, reply) => {
    reply.send({
        message: 'Sorry, this fox is LoveLive! only.',
    });
});

app.register(import('./jp-local-gov'));

app.listen({
    host: '::',
    port: Number(process.env.PORT) || 8080,
});
