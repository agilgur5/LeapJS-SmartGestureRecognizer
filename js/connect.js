(function(){var e,n;n=require("./leap.min"),e=e||{},e.fingerNameMap=["thumb","index","middle","ring","pinky"],e.onFrame=function(e){return console.log("Bridge onFrame not set")},e.parsePointable=function(e){var n;return n=e.tipPosition,{x:n[0],y:n[1],z:n[2]}},e.parseFinger=function(n){var r,i;return r=parsePointable(n),i=n.tipPosition,r.type=e.fingerNameMap[n.type],r},e.build=function(){var r,i,t;return t=this,i=function(n){var r,i,o,a,s,l,u,p,f,g,h,m,d,v,c,F;if(!(n.hands.length<1)){for(i={},r=[],v=n.hands,p=0,h=v.length;h>p;p++){for(s=v[p],l=[],c=n.fingers,f=0,m=c.length;m>f;f++)a=c[f],a.valid()&&l.push(e.parseFinger(a));r.push(l)}for(i.fingers=r,o=[],F=n.tools,g=0,d=F.length;d>g;g++)u=F[g],u.valid()&&o.push(e.parsePointable(u));return i.tools=o,t.onFrame?t.onFrame(i):void 0}},r={host:"127.0.0.1",port:6437,enableGestures:!0,frameEventName:"animationFrame",useAllPlugins:!1},n.loop(r,i),this},module.exports=e}).call(this);