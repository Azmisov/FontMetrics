var t={d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};t.d(e,{Z:()=>p});let n,o,i,r=!1;const s={chars:{capHeight:"S",baseline:"n",xHeight:"x",descent:"p",ascent:"h",tittle:"i",overshoot:"O",averages:{capHeight:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",baseline:"EFHILMPTYZfhimnrz",xHeight:"acegmnopqrsuvwxyz",descent:"Qgjpqy",ascent:"bdfhklt",tittle:"ij",overshoot:"ABCDEFGHIJKLMNOPRSTUVWXYZabcdefhiklmnorstuvwxz",weights:{e:.08610229517681191,t:.0632964962389326,a:.0612553996079051,n:.05503703643138501,i:.05480626188138746,o:.0541904405334676,s:.0518864979648296,r:.051525029341199825,l:.03218192615049607,d:.03188948073064199,h:.02619237267611581,c:.02500268898936656,u:.019247776378510318,m:.018140172626462205,p:.017362092874808832,f:.015750347191785568,g:.012804659959943725,y:.010893686962847832,b:.01034644514338097,w:.009565830104169261,v:.007819143740853554,k:.004945712204424292,S:.0030896915651553373,T:.0030701064687671904,C:.002987392712176473,A:.0024774830020061096,x:.0023064144740073764,I:.0020910417959267183,M:.0018134911904778657,B:.0017387002075069484,P:.00138908405321239,E:.0012938206232079082,N:.0012758834637326799,F:.001220297284016159,R:.0011037374385216535,D:.0010927723198318497,U:.0010426370083657518,q:.00100853739070613,L:.0010044809306127922,G:.0009310209736100016,J:.0008814561018445294,H:.0008752446473266058,O:.0008210528757671701,W:.0008048270353938186,j:.000617596049210692,z:.0005762708620098124,K:.0003808001912620934,V:.0002556203680692448,Y:.00025194420110965734,Q:.00010001709417636208,Z:8619977698342993e-20,X:6572732994986532e-20}}}},a=(t="top")=>{const e="bottom"===t?i.height:0;o.setTransform(1,0,0,1,0,e),o.textBaseline=t},h=()=>{a("bottom");const t=i.height-f("A");return a("top"),f("A")+t},c=t=>((t=>{o.clearRect(0,0,i.width,i.height),o.fillText(t,i.width/2,n,i.width)})(t),o.getImageData(0,0,i.width,i.height).data),l=(t,e,n,o)=>{const i=t[o];for(const t in e){const o=e[t];e[t]=(o-i)/n}return e},g=t=>Math.round((t=>{for(let e=3,n=t.length;e<n;e+=4)if(t[e]>0)return(e-3)/4;return t.length})(c(t))/i.width)-n,f=t=>Math.round((t=>{for(let e=t.length-1;e>=3;e-=4)if(t[e]>0)return e/4;return 0})(c(t))/i.width)-n,d={capHeight:!0,ascent:!0,tittle:!0,xHeight:!0,baseline:!1,overshoot:!1,descent:!1},u=({fontFamily:t="Times",fontWeight:e="normal",fontSize:a=200,origin:c="baseline",averages:u=!1}={})=>{((t,e,s)=>{r||(i=document.createElement("canvas"),o=i.getContext("2d"),r=!0),n=.5*e,i.width=2*e,i.height=2*e+n,o.font=`${s} ${e}px ${t}`,o.textBaseline="top",o.textAlign="center"})(t,a,e);const p=((t=s.chars)=>{const e={top:0,bottom:h()};for(const n in d)e[n]=(d[n]?g:f)(t[n]);return e})(),m={...l(p,p,a,c),fontFamily:t,fontWeight:e,fontSize:a};return u&&((t=>{const e=t.averages={},n=t.weights={};for(const t in d)e[t]=n[t]=0;const o=s.chars.averages;for(const t in o.weights){const i=o.weights[t];let r=null,s=null;for(const a in d){if(-1===o[a].indexOf(t))continue;let h;d[a]?(null===r&&(r=g(t)),h=r):(null===s&&(s=f(t)),h=s),e[a]+=h*i,n[a]+=i}}for(const t in e)e[t]/=n[t]})(m),l(p,m.averages,a,c)),m};u.settings=s;const p=u;var m=e.Z;export{m as default};