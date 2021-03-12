const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname,'relatorios');
const learq = require('./learq');
const datetime = new Date().getTime();
const colors = require('colors');

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log(`Diretorio ${dir} criado!`)
}

const limpaurl = (urlalvo)=>{
    const urllimpa = urlalvo.replace('https://','');
    const urllimpa2 = urllimpa.replace(/\./gi,'_');
    const urllimpa3 = urllimpa2.replace(/\//gi,'_');

    return urllimpa3
}

(async () => {
    const startDate = new Date().getTime();
    const browser = await puppeteer.launch({
        //headless:false,
        defaultViewport:null,
    });
    const page = await browser.newPage();
    await page.setDefaultTimeout(0);
    const urls = learq();
    for (let i = 0; i< urls.length; i++) {
        const url = urls[i];
        const inicioDate = new Date().getTime();
        await page.goto('https://developers.google.com/speed/pagespeed/insights/');
        await page.waitForSelector('.label-input-label');
        await page.type('.label-input-label',url,{delay:200});
        await page.waitForSelector('.main-submit');
        await page.click('.main-submit');
        await page.waitForSelector('.lh-gauge__percentage');
        const urlsanitizada = await limpaurl(url);
        await page.screenshot({path:`${dir}/${urlsanitizada}.png`, fullPage:true});
        let tempoporpagina = 0;
        tempoporpagina = await Math.round((new Date().getTime() - inicioDate)/1000);
        await console.log(`Print tirado de ${url} - Tempo ${tempoporpagina} segundos`.blue);
        
    }


    await browser.close();
    await console.log('Relatórios concluidos!');
    await console.log(`Total de tempo de screenshoots em ${Math.round((new Date().getTime( )- startDate)/1000) } segundos`.green)
})();

