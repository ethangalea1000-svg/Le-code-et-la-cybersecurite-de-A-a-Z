const {test,expect}=require('@playwright/test');
const {source}=require('axe-core');
const fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..');
// Match GitHub Pages' project-prefixed modules on the root-only local server.
test.beforeEach(async({context})=>{await context.route('**/Le-code-et-la-cybersecurite-de-A-a-Z/**',route=>route.continue({url:route.request().url().replace('/Le-code-et-la-cybersecurite-de-A-a-Z/','/')}));});
const pages=fs.readdirSync(root).filter(f=>f.endsWith('.html')).concat(fs.readdirSync(path.join(root,'cours')).filter(f=>f.endsWith('.html')).map(f=>'cours/'+f));
async function scan(page,label){
 await page.addScriptTag({content:source});
 const failures=await page.evaluate(async()=>{
  const result=await axe.run(document,{runOnly:{type:'rule',values:['color-contrast']}});
  return result.violations.flatMap(v=>v.nodes.map(n=>({target:n.target,summary:n.failureSummary})));
 });
 expect(failures,label+' rendered text contrast').toEqual([]);
}
async function preferences(context,theme,readable=false){
 await context.addInitScript(({theme,readable})=>{
  localStorage.setItem('azThemePreference',theme);
  localStorage.setItem('azReadableMode',readable?'on':'off');
  localStorage.setItem('azCookieConsentV1','rejected');
 },{theme,readable});
}
for(const width of [390,1280])for(const theme of ['light','dark']){
 test(`all HTML pages: ${width}px, ${theme}`,async({page,context})=>{
  test.setTimeout(180000);await page.setViewportSize({width,height:900});await page.emulateMedia({colorScheme:theme,reducedMotion:'reduce'});await preferences(context,theme);
  for(const file of pages){await page.goto('/'+file);await scan(page,file);}
 });
 for(const readable of [false,true])test(`open learning states: ${width}px, ${theme}, reading=${readable}`,async({page,context})=>{
  test.setTimeout(180000);await page.setViewportSize({width,height:900});await page.emulateMedia({colorScheme:theme,reducedMotion:'reduce'});await preferences(context,theme,readable);
  const go=file=>page.goto('/'+file);
  await go('index.html');await page.locator('.extra-tools-disclosure').evaluate(el=>el.open=true);await scan(page,'expanded resources');
  const menu=page.locator('.nav-more');if(await menu.count()){await menu.evaluate(el=>el.open=true);await scan(page,'open navigation');}
  await go('quiz.html');await page.locator('.answer').first().click();await scan(page,'quiz answer and feedback');
  await go('exercices.html');
  await page.locator('#gclHint').click();await page.locator('#gclChoices button').first().click();await scan(page,'guided challenge feedback');
  await go('progression.html');await page.locator('#ca-start').click();await page.locator('.ca-answer').first().click();await scan(page,'CyberAcademy answer');
  await go('cours/html.html');if(await page.locator('.mentor-modal').isVisible()){await scan(page,'mentor settings');await page.locator('.mentor-save').click();}await scan(page,'course and final card');
  await go('cours/lecon.html?id=01&lesson=1');if(await page.locator('#startTutorial').isVisible()){await scan(page,'lesson tutorial');await page.locator('#startTutorial').click();}
  await scan(page,'lesson initial');await page.locator('[data-next="2"]').click();await page.locator('#answer').fill('x');await page.locator('#checkAnswer').click();await scan(page,'lesson retry');
  await page.locator('#answer').fill('Une structure HTML décrit les éléments de la page et leur sens.');await page.locator('#checkAnswer').click();await scan(page,'lesson answer');
  if(await page.locator('#continueQuestion').isEnabled()){await page.locator('#continueQuestion').click();await scan(page,'lesson code');await page.locator('[data-next="4"]').click();await page.locator('#challengeCheck').check();await scan(page,'lesson challenge');}
  await go('retour.html');await page.locator('#details').fill('Retour fictif local');await page.locator('#details').focus();await scan(page,'feedback form focus');
 });
}
