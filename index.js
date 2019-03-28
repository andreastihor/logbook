require('dotenv').config()
const request = require('request')
const Promise = require('bluebird')
const puppeteer = require('puppeteer')


const puppeteer_options ={
  launch: {
    headless: true,
    slowMo: 50,
    args: [
      '--no-sandbox',
      '--disable-web-security',
      '--disable-features=site-per-process',
      '--ignore-certificate-errors',
      '--incognito',
    ]
  },
  viewport: {
    width: 1400,
    height: 1000,
  }
}


async function start(data) {
  try {
    const browser = await puppeteer.launch(puppeteer_options.launch);
    const pages = await browser.pages();
    const page = pages[0];
    await page.setViewport(puppeteer_options.viewport);
    page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36');
    await login(page)
    await fill(page, data)
    await page.waitFor(4000)
    await logout(page,browser)
    console.log("done....");
  } catch (e) {
    console.log(e);
    console.log("error");
    throw new Error("error!")
    }
}

async function logout(page,browser) {
  console.log("logging out..");
  await page.goto('http://industry.socs.binus.ac.id/learning-plan/logout')
  await browser.close()
}

async function login(page){
  console.log("logging in...");
  await page.goto('http://industry.socs.binus.ac.id/learning-plan/auth/login')
  page.waitForSelector('.ui.stacked.segment')
  const fields = await page.$$('.field')
  await fields[0].click()
  await fields[0].type(process.env.USERNAME)
  await fields[1].click()
  await fields[1].type(process.env.PASSWORD)
  await fields[2].click()
}

async function fill(page, data ){
  await page.waitFor(3000)
  console.log("filling");
  await page.waitForSelector('.ui.form')
  const $inputs = await page.$$('.ui.input')
  await $inputs[0].click()
  await $inputs[0].type(data.in)
  await $inputs[1].click()
  await $inputs[1].type(data.out)
  await $inputs[2].click()
  await $inputs[2].type(data.activity)
  await $inputs[3].click()
  await $inputs[3].type(data.desc)

  const button = await page.$('.ui.primary.large.button')
  await button.click()
  page.waitFor(5000)
}


const data = {
  in : "10.10",
  out : "19.20",
  activity : "adding new service ",
  desc : "adding new service to services list",
}

start(data)
