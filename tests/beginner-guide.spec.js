const {test,expect}=require('@playwright/test');
const fs=require('fs');
const vm=require('vm');
const crypto=require('crypto');
const expectedHashes=require('./fixtures/course-section-hashes.json');
test('les guides gardent les sections et les identifiants existants',()=>{
 for(let i=1;i<=14;i++){
  const id=String(i).padStart(2,'0'),file=`courses-${id}.js`,after={window:{}};
  vm.runInNewContext(fs.readFileSync(file,'utf8'),after);
  expect(crypto.createHash('sha256').update(JSON.stringify(after.window.courseData[id].sections)).digest('hex')).toBe(expectedHashes[id]);
 }
});
test('les 14 premières leçons affichent une explication et une manipulation sans validation automatique',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/Le-code-et-la-cybersecurite-de-A-a-Z/courses-*.js*',async route=>{
  const file=new URL(route.request().url()).pathname.split('/').pop();
  await route.fulfill({path:file,contentType:'application/javascript'});
 });
 for(let i=1;i<=14;i++){
  const id=String(i).padStart(2,'0');
  await page.goto(`/cours/lecon.html?id=${id}&lesson=1`);
  await expect(page.locator('.beginner-guide')).toBeVisible();
  await expect(page.locator('.beginner-guide pre')).not.toBeEmpty();
  await expect(page.locator('.beginner-guide')).toContainText('Ce que tu dois observer');
  await expect(page.locator('#continueQuestion')).toBeDisabled();
  await expect(page.locator('#finishLesson')).toBeDisabled();
  expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('azProgressV1')||'{}').xp||0)).toBe(0);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
 }
 expect(errors).toEqual([]);
});
test('les manipulations de prénom changent vraiment le résultat',()=>{
 for(const id of ['03','04']){
  const ctx={window:{}};vm.runInNewContext(fs.readFileSync(`courses-${id}.js`,'utf8'),ctx);
  const g=ctx.window.courseData[id].beginnerGuide;
  expect(g.example).toContain('Alex');expect(g.example).not.toContain('Lina');
  expect(g.try).toContain('remplace Alex par Lina');expect(g.observe).toContain('Bonjour Lina');
 }
});
