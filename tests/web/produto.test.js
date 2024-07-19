const {Builder, Browser, By, until} = require('selenium-webdriver')
const assert = require('assert')

describe('Modulo de produto', () =>{
    it('Validar exceder o limite de valor do produto', async () => {
        const navegador = await new Builder().forBrowser(Browser.CHROME).build();
        try{
            await navegador.get('http://165.227.93.41/lojinha-web/v2/')

            await navegador.findElement(By.id('usuario')).sendKeys('cgts')
            await navegador.findElement(By.id('senha')).sendKeys('123456')
            await navegador.findElement(By.id('btn-entrar')).click()

            await navegador.findElement(By.linkText('ADICIONAR PRODUTO')).click()

            await navegador.findElement(By.id('produtonome')).sendKeys('Corinthians')
            await navegador.findElement(By.id('produtovalor')).sendKeys('700001')
            await navegador.findElement(By.id('produtocores')).sendKeys('Preto, Branco')
            await navegador.findElement(By.id('btn-salvar')).click()

            const mensagemDaTela = await navegador.findElement(By.id('toast-container')).getText()
            assert.equal(mensagemDaTela, 'O valor do produto deve estar entre R$ 0,01 e R$ 7.000,00')//comparação


        }
        finally{
            await navegador.quit();
        }
    })
})