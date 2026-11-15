const skills = [
 ['Python','Software','DataPulse AI','Process datasets and compare models in Streamlit.',1],
 ['Flask','Software','EduTwin AI','Serve student assessments and personalized learning plans.',0],
 ['SQL','Software','VoteSphere DB','Manage voter and election data.',6],
 ['Tableau','Analytics','Tableau dashboards','Explore revenue drivers with maps and calculated fields.',8],
 ['Streamlit','Analytics','DataPulse AI','Turn CSV files into an interactive analysis workspace.',1],
 ['ESP32','Embedded','NeuroGuardian X','Capture signals from wearable sensors.',7],
 ['Flutter','Embedded','NeuroGuardian X','Display wearable readings in a mobile companion app.',7],
 ['BLE','Embedded','NeuroGuardian X','Transfer sensor readings from the device to the phone.',7]
];
const el = id => document.getElementById(id);
function button(parent,label,click) {
 const b=document.createElement('button'); b.textContent=label; b.onclick=click; parent.append(b); return b;
}
function choose(skill) {
 const [name,group,project,description,id]=skill;
 el('skillInfo').innerHTML='<small>'+group+'</small><h3>'+name+'</h3><p>'+description+'</p><a href="#project-'+id+'">'+project+' ↓</a>';
 for(const node of el('nodes').querySelectorAll('button'))node.classList.toggle('active',node.textContent===name);
}
function filter(group) {
 el('nodes').querySelectorAll('button').forEach(b=>b.remove());
 const list=skills.filter(s=>group==='All'||s[1]===group);
 list.forEach((s,i)=>{
  const b=button(el('nodes'),s[0],()=>choose(s)), angle=2*Math.PI*i/list.length;
  b.style.left=(50+34*Math.cos(angle))+'%'; b.style.top=(50+33*Math.sin(angle))+'%';
 });
 for(const b of el('filters').children)b.classList.toggle('active',b.textContent===group);
 choose(list[0]);
}
for(const group of ['All','Software','Analytics','Embedded'])button(el('filters'),group,()=>filter(group));
filter('All');
el('theme').onclick=()=>document.body.classList.toggle('light');
const pads=[],sequence=[];let index=0,accepting=false;
const delay=ms=>new Promise(done=>setTimeout(done,ms));
async function nextRound(){
 accepting=false;index=0;sequence.push(Math.floor(Math.random()*4));el('status').textContent='Watch round '+sequence.length;
 await delay(450);
 for(const n of sequence){pads[n].classList.add('on');await delay(500);pads[n].classList.remove('on');await delay(200);}
 accepting=true;el('status').textContent='Your turn · round '+sequence.length;
}
for(let n=0;n<4;n++)pads.push(button(document.querySelector('.pads'),String(n+1),()=>{
 if(!accepting)return;
 if(n!==sequence[index]){accepting=false;el('play').disabled=false;el('status').textContent='Game over. Completed rounds: '+(sequence.length-1);return;}
 if(++index===sequence.length)nextRound();
}));
el('play').onclick=()=>{sequence.length=0;el('play').disabled=true;nextRound();};
