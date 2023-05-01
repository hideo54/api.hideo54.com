import * as functions from 'firebase-functions';
import Fastify from 'fastify';
import { searchCodeInfo } from 'jp-local-gov';

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

fastify.get<{
    Querystring: {
        q?: string;
    };
}>('/jp-local-gov/search-code', (req, reply) => {
    const searchWord = req.query.q;
    if (searchWord) {
        const result = searchCodeInfo(searchWord);
        reply.send({
            result,
        });
    } else {
        reply.code(400).send({
            error: true,
        });
    }
});

fastify.get<{
    Querystring: {
        q?: string;
    };
}>('/jp-local-gov/search-code-for-excel', (req, reply) => {
    const searchWord = req.query.q;
    const firstHitCode = searchWord && searchCodeInfo(searchWord)[0]?.code;
    if (firstHitCode) {
        reply.send(firstHitCode);
    } else {
        reply.code(400).send();
    }
});

// https://www.fastify.io/docs/latest/Guides/Serverless/#implement-and-export-the-function
const app = async (req: functions.Request, res: functions.Response) => {
    await fastify.ready();
    fastify.server.emit('request', req, res);
};

export const hideo54Api = functions.region('asia-northeast1').https.onRequest(app);
