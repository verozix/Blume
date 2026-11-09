(function(){var box=document.getElementById('s3d'),fb=document.getElementById('s2d');
function fail(){box.style.display='none';fb.style.display='block'}
try{var T=THREE,cs=getComputedStyle(document.documentElement);
var R=new T.WebGLRenderer({antialias:true,alpha:true});R.setPixelRatio(Math.min(devicePixelRatio,2));box.insertBefore(R.domElement,box.firstChild);
var S=new T.Scene(),C=new T.PerspectiveCamera(38,1,.1,50);C.position.z=8.5;
S.add(new T.AmbientLight(0xffffff,.65));var L=new T.DirectionalLight(0xffffff,1.1);L.position.set(3,4,6);S.add(L);
var P=new T.PointLight(0x8f73ff,1.2,20);P.position.set(-4,-2,-3);S.add(P);
var mB=new T.MeshStandardMaterial({metalness:.25,roughness:.38}),mC=new T.MeshStandardMaterial({roughness:.4}),mL=new T.MeshBasicMaterial({transparent:true,opacity:.35});
function colors(){var b=cs.getPropertyValue('--brand').trim()||'#4A21C4',o=cs.getPropertyValue('--on').trim()||'#ffffff';mB.color.set(b);mL.color.set(b);mC.color.set(o)}
colors();matchMedia('(prefers-color-scheme:dark)').addEventListener('change',function(){setTimeout(colors,50)});
var sh=new T.Shape();sh.moveTo(0,1.4);sh.lineTo(1.1,1);sh.lineTo(1.1,0);sh.bezierCurveTo(1.1,-.75,.6,-1.2,0,-1.45);sh.bezierCurveTo(-.6,-1.2,-1.1,-.75,-1.1,0);sh.lineTo(-1.1,1);sh.closePath();
var g=new T.ExtrudeGeometry(sh,{depth:.35,bevelEnabled:true,bevelThickness:.12,bevelSize:.1,bevelSegments:6,curveSegments:28});g.center();
var root=new T.Group();root.add(new T.Mesh(g,mB));
function seg(a,b){var d=new T.Vector3().subVectors(b,a),m=new T.Mesh(new T.CylinderGeometry(.12,.12,d.length(),20),mC);m.position.copy(a).addScaledVector(d,.5);m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());return m}
var pts=[[-.5,0],[-.15,-.4],[.6,.45]].map(function(p){return new T.Vector3(p[0],p[1],0)});
var ck=new T.Group();ck.add(seg(pts[0],pts[1]),seg(pts[1],pts[2]));pts.forEach(function(p){var s=new T.Mesh(new T.SphereGeometry(.12,20,16),mC);s.position.copy(p);ck.add(s)});
ck.position.set(0,.05,.3);root.add(ck);var bk=ck.clone();bk.position.set(0,.05,-.3);bk.rotation.y=Math.PI;root.add(bk);
function orbit(r,tilt,n,sz,sp){var piv=new T.Group(),spin=new T.Group(),ring=new T.Mesh(new T.TorusGeometry(r,.012,8,160),mL);ring.rotation.x=Math.PI/2;piv.add(ring,spin);piv.rotation.set(tilt,0,tilt/2);
for(var i=0;i<n;i++){var s=new T.Mesh(new T.SphereGeometry(sz,20,16),mB),a=i/n*Math.PI*2;s.position.set(Math.cos(a)*r,0,Math.sin(a)*r);spin.add(s)}
root.add(piv);return function(t){spin.rotation.y=t*sp}}
var o1=orbit(1.9,.5,3,.1,.5),o2=orbit(2.35,-.9,2,.07,-.35);S.add(root);
var rx=.1,ry=-.5,vy=0,vx=0,drag=false,lx=0,ly=0,idle=matchMedia('(prefers-reduced-motion:reduce)').matches?0:.004;
box.addEventListener('pointerdown',function(e){drag=true;lx=e.clientX;ly=e.clientY;box.setPointerCapture(e.pointerId);box.classList.add('used')});
box.addEventListener('pointermove',function(e){if(!drag)return;vy=(e.clientX-lx)*.01;ry+=vy;rx=Math.max(-.9,Math.min(.9,rx+(e.clientY-ly)*.01));lx=e.clientX;ly=e.clientY});
function up(){drag=false}box.addEventListener('pointerup',up);box.addEventListener('pointercancel',up);
box.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')vy=-.12;if(e.key==='ArrowRight')vy=.12;box.classList.add('used')});
function size(){var w=box.clientWidth;if(w){R.setSize(w,w,false)}}
function tick(t){t/=1000;if(drag){vy*=.7}else{ry+=vy+idle;vy*=.95;rx+=(.1-rx)*.03}
root.rotation.set(rx,ry,0);root.position.y=Math.sin(t*1.2)*.1;o1(t);o2(t);R.render(S,C);requestAnimationFrame(tick)}
size();new ResizeObserver(size).observe(box);requestAnimationFrame(tick)}catch(e){fail()}})();
