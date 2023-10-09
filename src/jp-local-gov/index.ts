import type { FastifyInstance } from 'fastify';
import { searchCodeInfo } from 'jp-local-gov';

const jpLocalGov = async (fastify: FastifyInstance) => {
    fastify.get<{
        Querystring: {
            word: string;
            mode?: 'excel' | 'json';
        };
    }>('/jp-local-gov/search-code', (req, reply) => {
        const searchWord = req.query.word;
        if (searchWord) {
            const result = searchCodeInfo(searchWord);
            if (req.query.mode === 'excel') {
                const ifl = searchWord && searchCodeInfo(searchWord)[0]?.code;
                if (ifl) {
                    reply.send(ifl);
                } else {
                    reply.code(400).send();
                }
            } else {
                reply.send({
                    result,
                });
            }
        } else {
            reply.code(400).send({
                error: true,
                message: '`word` must be given.',
            });
        }
    });
};

export default jpLocalGov;
