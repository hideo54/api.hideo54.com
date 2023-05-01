import * as functions from 'firebase-functions';
import Fastify from 'fastify';

const fastify = Fastify();

// https://www.fastify.io/docs/latest/Guides/Serverless/#add-custom-contenttypeparser-to-fastify-instance
fastify.addContentTypeParser('application/json', {}, (_, body, done) => {
    done(null, body);
});

fastify.get('/hello', (_, reply) => {
    reply.send({
        message: 'Hello, world!',
    });
});

// https://www.fastify.io/docs/latest/Guides/Serverless/#implement-and-export-the-function
const app = async (req: functions.Request, res: functions.Response) => {
    await fastify.ready();
    fastify.server.emit('request', req, res);
};

export const hideo54Api = functions.region('asia-northeast1').https.onRequest(app);
