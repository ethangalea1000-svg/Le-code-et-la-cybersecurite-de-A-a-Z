const {test,expect}=require('@playwright/test');
const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
test('service worker ignores stale cache entries left by an older active tab',async()=>{
 const handlers={};const current='code-cyber-static-v20';const requested=[];
 const context={URL,Response,self:{location:{origin:'https://example.test'},addEventListener:(type,cb)=>handlers[type]=cb},caches:{
  match:async()=>new Response('STALE'),
  open:async name=>({match:async request=>{requested.push({name,url:typeof request==='string'?request:request.url});return new Response('CURRENT')},put:async()=>{}})
 },fetch:async()=>{throw Error('offline')}};
 vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../sw.js'),'utf8'),context);
 for(const mode of ['cors','navigate']){
  let response;handlers.fetch({request:{method:'GET',mode,url:'https://example.test/Le-code-et-la-cybersecurite-de-A-a-Z/enhancements.css'},respondWith:p=>response=p});
  expect(await(await response).text()).toBe('CURRENT');
 }
 expect(requested).toHaveLength(2);expect(requested.every(r=>r.name===current)).toBe(true);
});
