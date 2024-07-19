const frisby = require('frisby');

describe('Modulo de produto', () => {
    it('Validar exceder o limite de valor do produto', async () => {
        let login = await frisby
            .post('http://165.227.93.41/lojinha/v2/login', {
                usuarioLogin: 'cgts',
                usuarioSenha: '123456'
            })
            .expect('status', 200)
            .then((res) => {
                console.log('Login response:', res.json);
                return res.json.data.token;
            });

        console.log('Token:', login);

        return frisby
            .setup({
                request: {
                    headers: {
                        'token': login,
                        'Content-Type': 'application/json'
                    }
                }
            })
            .post('http://165.227.93.41/lojinha/v2/produtos', {
                "produtoNome": "teste",
                "produtoValor": 7000.01,
                "produtoCores": [
                    "azul"
                ],
                "produtoUrlMock": "N/A",
                "componentes": []
            })
            .inspectResponse() 
            .expect('status', 422)
            .expect('json', 'error', 'O valor do produto deve estar entre R$ 0,01 e R$ 7.000,00');
    });
});
