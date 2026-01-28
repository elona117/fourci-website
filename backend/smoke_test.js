const http = require('http');
const https = require('https');

function request(url, opts = {}){
  return new Promise((resolve, reject) =>{
    const u = new URL(url);
    const lib = u.protocol === 'https:' ? https : http;
    const options = { method: opts.method || 'GET', headers: opts.headers || {} };
    const req = lib.request(u, options, res =>{
      let s = '';
      res.on('data', d=> s += d);
      res.on('end', ()=> resolve({ status: res.statusCode, body: s }));
    });
    req.on('error', reject);
    if(opts.body) req.write(opts.body);
    req.end();
  });
}

(async ()=>{
  try{
    const base = 'http://localhost:5000';
    const pages = ['/', '/about.html', '/programs.html', '/resources.html', '/includes/loading.html', '/assets/js/main.js'];
    console.log('=== PAGE CHECKS ===');
    for(const p of pages){
      const url = base + p;
      const r = await request(url);
      console.log(p, '->', r.status, 'len', (r.body||'').length);
    }

    console.log('\n=== API GET /api/resources ===');
    let r = await request(base + '/api/resources');
    console.log('GET /api/resources ->', r.status);
    let list = [];
    try{ list = JSON.parse(r.body); console.log('count', list.length); }catch(e){ console.log('parse error'); }

    console.log('\n=== API POST /api/resources (create) ===');
    const payload = JSON.stringify({ title: 'SmokeTest-Auto', description: 'Created by smoke_test.js' });
    r = await request(base + '/api/resources', { method: 'POST', headers: {'Content-Type':'application/json','Content-Length': Buffer.byteLength(payload)}, body: payload });
    console.log('POST ->', r.status, 'body len', (r.body||'').length);
    let created;
    try{ created = JSON.parse(r.body); console.log('created id', created.id); }catch(e){console.log('create parse error'); }

    if(created && created.id){
      console.log('\n=== API DELETE /api/resources/:id ===');
      r = await request(base + '/api/resources/' + encodeURIComponent(created.id), { method: 'DELETE' });
      console.log('DELETE ->', r.status, 'body len', (r.body||'').length);

      console.log('\n=== API GET after delete ===');
      r = await request(base + '/api/resources');
      try{ list = JSON.parse(r.body); console.log('count after', list.length); }catch(e){ console.log('parse error after delete'); }
    }

    console.log('\nSMOKE TEST COMPLETE');
  }catch(err){
    console.error('ERROR', err);
    process.exitCode = 2;
  }
})();
