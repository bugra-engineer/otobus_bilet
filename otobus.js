const L=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}},$=s=>document.querySelector(s);
const T=[{id:1,a:'Denizli',b:'İstanbul',t:'21:00',p:850},{id:2,a:'Denizli',b:'Ankara',t:'22:30',p:700},{id:3,a:'Aydın',b:'İzmir',t:'09:15',p:220},{id:4,a:'Konya',b:'Denizli',t:'08:00',p:600}];
let sel=1,seat=null,B=L('otb',[]);
const sv=()=>{try{localStorage.setItem('otb',JSON.stringify(B))}catch(e){}};
function R(){const t=T.find(x=>x.id==sel);
$('#tr').innerHTML=T.map(x=>`<div class="trip ${x.id==sel?'on':''}" onclick="sel=${x.id};seat=null;R()"><b>${x.a} → ${x.b}</b><br><small>${x.t} · ${x.p} ₺</small></div>`).join('');
$('#ti').textContent=t.a+' → '+t.b+' · '+t.t;
const dolu=B.filter(x=>x.trip==sel).map(x=>x.seat);let h='';
for(let r=0;r<10;r++)for(const c of [1,2,0,3]){if(!c){h+='<span class="g"></span>';continue}const n=r*3+c;h+=`<button class="s ${dolu.includes(n)?'d':seat==n?'x':''}" ${dolu.includes(n)?'disabled':''} onclick="seat=${n};R()">${n}</button>`}
$('#bus').innerHTML=h;
$('#bl').innerHTML=B.map(x=>{const q=T.find(y=>y.id==x.trip);return `<div class="t"><span><b>${x.ad.replace(/</g,'&lt;')}</b> · ${q.a} → ${q.b} · ${q.t} · Koltuk ${x.seat}</span><a onclick="del(${x.id})">İptal</a></div>`}).join('')||'<p>Henüz bilet yok.</p>'}
function buy(){const ad=$('#ad').value.trim();if(!seat||!ad)return alert('Koltuk seç ve adını yaz');B.push({id:Date.now(),trip:sel,seat,ad});seat=null;$('#ad').value='';sv();R()}
function del(i){B=B.filter(x=>x.id!=i);sv();R()}
R();