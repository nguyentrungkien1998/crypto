/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{385:function(e,o){e.exports=function(e){var o={};function n(r){if(o[r])return o[r].exports;var t=o[r]={i:r,l:!1,exports:{}};return e[r].call(t.exports,t,t.exports,n),t.l=!0,t.exports}return n.m=e,n.c=o,n.d=function(e,o,r){n.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(o,"a",o),o},n.o=function(object,e){return Object.prototype.hasOwnProperty.call(object,e)},n.p="",n(n.s=1)}([function(e,o,n){"use strict";var r={MOBILE:"mobile",TABLET:"tablet",SMART_TV:"smarttv",CONSOLE:"console",WEARABLE:"wearable",BROWSER:void 0};e.exports={BROWSER_TYPES:{CHROME:"Chrome",FIREFOX:"Firefox",OPERA:"Opera",YANDEX:"Yandex",SAFARI:"Safari",INTERNET_EXPLORER:"Internet Explorer",EDGE:"Edge",CHROMIUM:"Chromium",IE:"IE",MOBILE_SAFARI:"Mobile Safari",EDGE_CHROMIUM:"Edge Chromium"},DEVICE_TYPES:r,OS_TYPES:{IOS:"iOS",ANDROID:"Android",WINDOWS_PHONE:"Windows Phone",WINDOWS:"Windows",MAC_OS:"Mac OS"},defaultData:{isMobile:!1,isTablet:!1,isBrowser:!1,isSmartTV:!1,isConsole:!1,isWearable:!1}}},function(e,o,n){"use strict";var nav,r=n(2),t=n(0),d=t.BROWSER_TYPES,l=t.OS_TYPES,w=t.DEVICE_TYPES,c=n(4),m=c.checkType,f=c.broPayload,v=c.mobilePayload,h=c.wearPayload,E=c.consolePayload,S=c.stvPayload,O=c.getNavigatorInstance,x=c.isIOS13Check,T=new r,y=T.getBrowser(),A=T.getDevice(),N=T.getEngine(),k=T.getOS(),R=T.getUA(),M=d.CHROME,I=d.CHROMIUM,P=d.IE,C=d.INTERNET_EXPLORER,_=d.OPERA,V=d.FIREFOX,B=d.SAFARI,D=d.EDGE,L=d.YANDEX,W=d.MOBILE_SAFARI,z=w.MOBILE,j=w.TABLET,F=w.SMART_TV,U=w.BROWSER,G=w.WEARABLE,Y=w.CONSOLE,H=l.ANDROID,X=l.WINDOWS_PHONE,Q=l.IOS,$=l.WINDOWS,Z=l.MAC_OS,J=function(){return k.name===l.WINDOWS&&"10"===k.version&&("string"==typeof R&&-1!==R.indexOf("Edg/"))},K=function(){return y.name===D},ii=function(){return x("iPad")},ei=A.type===F,si=A.type===Y,oi=A.type===G,ni=y.name===W||ii(),ri=y.name===I,ai=function(){switch(A.type){case z:case j:return!0;default:return!1}}()||ii(),ti=A.type===z,di=A.type===j||ii(),wi=A.type===U,ui=k.name===H,ci=k.name===X,mi=k.name===Q||ii(),pi=y.name===M,bi=y.name===V,fi=y.name===B||y.name===W,gi=y.name===_,vi=y.name===C||y.name===P,hi=k.version?k.version:"none",Ei=k.name?k.name:"none",Si=y.major,Oi=y.version,xi=y.name,Ti=A.vendor?A.vendor:"none",yi=A.model?A.model:"none",Ai=N.name,Ni=N.version,ki=R,Ri=K()||J(),Mi=y.name===L,Ii=A.type,Pi=(nav=O())&&(/iPad|iPhone|iPod/.test(nav.platform)||"MacIntel"===nav.platform&&nav.maxTouchPoints>1)&&!window.MSStream,Ci=ii(),_i=x("iPhone"),Vi=x("iPod"),Bi=function(){var nav=O(),e=nav&&nav.userAgent.toLowerCase();return"string"==typeof e&&/electron/.test(e)}(),Di=J(),Li=K(),Wi=k.name===$,zi=k.name===Z,ji=m(A.type);e.exports={deviceDetect:function(){var e=ji.isBrowser,o=ji.isMobile,n=ji.isTablet,r=ji.isSmartTV,t=ji.isConsole,d=ji.isWearable;return e?f(e,y,N,k,R):r?S(r,N,k,R):t?E(t,N,k,R):o||n?v(ji,A,k,R):d?h(d,N,k,R):void 0},isSmartTV:ei,isConsole:si,isWearable:oi,isMobileSafari:ni,isChromium:ri,isMobile:ai,isMobileOnly:ti,isTablet:di,isBrowser:wi,isAndroid:ui,isWinPhone:ci,isIOS:mi,isChrome:pi,isFirefox:bi,isSafari:fi,isOpera:gi,isIE:vi,osVersion:hi,osName:Ei,fullBrowserVersion:Si,browserVersion:Oi,browserName:xi,mobileVendor:Ti,mobileModel:yi,engineName:Ai,engineVersion:Ni,getUA:ki,isEdge:Ri,isYandex:Mi,deviceType:Ii,isIOS13:Pi,isIPad13:Ci,isIPhone13:_i,isIPod13:Vi,isElectron:Bi,isEdgeChromium:Di,isLegacyEdge:Li,isWindows:Wi,isMacOs:zi}},function(e,o,n){var r;!function(t,d){"use strict";var l="function",w="undefined",c="object",m="model",f="name",v="type",h="vendor",E="version",S="architecture",O="console",x="mobile",T="tablet",y="smarttv",A="wearable",N={extend:function(e,o){var n={};for(var i in e)o[i]&&o[i].length%2==0?n[i]=o[i].concat(e[i]):n[i]=e[i];return n},has:function(e,o){return"string"==typeof e&&-1!==o.toLowerCase().indexOf(e.toLowerCase())},lowerize:function(e){return e.toLowerCase()},major:function(e){return"string"==typeof e?e.replace(/[^\d\.]/g,"").split(".")[0]:d},trim:function(e){return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}},k={rgx:function(e,o){for(var n,r,p,q,t,w,i=0;i<o.length&&!t;){var m=o[i],f=o[i+1];for(n=r=0;n<m.length&&!t;)if(t=m[n++].exec(e))for(p=0;p<f.length;p++)w=t[++r],typeof(q=f[p])===c&&q.length>0?2==q.length?typeof q[1]==l?this[q[0]]=q[1].call(this,w):this[q[0]]=q[1]:3==q.length?typeof q[1]!==l||q[1].exec&&q[1].test?this[q[0]]=w?w.replace(q[1],q[2]):d:this[q[0]]=w?q[1].call(this,w,q[2]):d:4==q.length&&(this[q[0]]=w?q[3].call(this,w.replace(q[1],q[2])):d):this[q]=w||d;i+=2}},str:function(e,map){for(var i in map)if(typeof map[i]===c&&map[i].length>0){for(var o=0;o<map[i].length;o++)if(N.has(map[i][o],e))return"?"===i?d:i}else if(N.has(map[i],e))return"?"===i?d:i;return e}},R={browser:{oldsafari:{version:{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}}},device:{amazon:{model:{"Fire Phone":["SD","KF"]}},sprint:{model:{"Evo Shift 4G":"7373KT"},vendor:{HTC:"APA",Sprint:"Sprint"}}},os:{windows:{version:{ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"}}}},M={browser:[[/(opera\smini)\/([\w\.-]+)/i,/(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,/(opera).+version\/([\w\.]+)/i,/(opera)[\/\s]+([\w\.]+)/i],[f,E],[/(opios)[\/\s]+([\w\.]+)/i],[[f,"Opera Mini"],E],[/\s(opr)\/([\w\.]+)/i],[[f,"Opera"],E],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,/(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,/(?:ms|\()(ie)\s([\w\.]+)/i,/(rekonq)\/([\w\.]*)/i,/(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark)\/([\w\.-]+)/i],[f,E],[/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],[[f,"IE"],E],[/(edge|edgios|edgea)\/((\d+)?[\w\.]+)/i],[[f,"Edge"],E],[/(yabrowser)\/([\w\.]+)/i],[[f,"Yandex"],E],[/(puffin)\/([\w\.]+)/i],[[f,"Puffin"],E],[/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i],[[f,"UCBrowser"],E],[/(comodo_dragon)\/([\w\.]+)/i],[[f,/_/g," "],E],[/(micromessenger)\/([\w\.]+)/i],[[f,"WeChat"],E],[/(qqbrowserlite)\/([\w\.]+)/i],[f,E],[/(QQ)\/([\d\.]+)/i],[f,E],[/m?(qqbrowser)[\/\s]?([\w\.]+)/i],[f,E],[/(BIDUBrowser)[\/\s]?([\w\.]+)/i],[f,E],[/(2345Explorer)[\/\s]?([\w\.]+)/i],[f,E],[/(MetaSr)[\/\s]?([\w\.]+)/i],[f],[/(LBBROWSER)/i],[f],[/xiaomi\/miuibrowser\/([\w\.]+)/i],[E,[f,"MIUI Browser"]],[/;fbav\/([\w\.]+);/i],[E,[f,"Facebook"]],[/headlesschrome(?:\/([\w\.]+)|\s)/i],[E,[f,"Chrome Headless"]],[/\swv\).+(chrome)\/([\w\.]+)/i],[[f,/(.+)/,"$1 WebView"],E],[/((?:oculus|samsung)browser)\/([\w\.]+)/i],[[f,/(.+(?:g|us))(.+)/,"$1 $2"],E],[/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i],[E,[f,"Android Browser"]],[/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i],[f,E],[/(dolfin)\/([\w\.]+)/i],[[f,"Dolphin"],E],[/((?:android.+)crmo|crios)\/([\w\.]+)/i],[[f,"Chrome"],E],[/(coast)\/([\w\.]+)/i],[[f,"Opera Coast"],E],[/fxios\/([\w\.-]+)/i],[E,[f,"Firefox"]],[/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],[E,[f,"Mobile Safari"]],[/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],[E,f],[/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i],[[f,"GSA"],E],[/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],[f,[E,k.str,R.browser.oldsafari.version]],[/(konqueror)\/([\w\.]+)/i,/(webkit|khtml)\/([\w\.]+)/i],[f,E],[/(navigator|netscape)\/([\w\.-]+)/i],[[f,"Netscape"],E],[/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,/(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,/(links)\s\(([\w\.]+)/i,/(gobrowser)\/?([\w\.]*)/i,/(ice\s?browser)\/v?([\w\._]+)/i,/(mosaic)[\/\s]([\w\.]+)/i],[f,E]],cpu:[[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],[[S,"amd64"]],[/(ia32(?=;))/i],[[S,N.lowerize]],[/((?:i[346]|x)86)[;\)]/i],[[S,"ia32"]],[/windows\s(ce|mobile);\sppc;/i],[[S,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],[[S,/ower/,"",N.lowerize]],[/(sun4\w)[;\)]/i],[[S,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],[[S,N.lowerize]]],device:[[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],[m,h,[v,T]],[/applecoremedia\/[\w\.]+ \((ipad)/],[m,[h,"Apple"],[v,T]],[/(apple\s{0,1}tv)/i],[[m,"Apple TV"],[h,"Apple"]],[/(archos)\s(gamepad2?)/i,/(hp).+(touchpad)/i,/(hp).+(tablet)/i,/(kindle)\/([\w\.]+)/i,/\s(nook)[\w\s]+build\/(\w+)/i,/(dell)\s(strea[kpr\s\d]*[\dko])/i],[h,m,[v,T]],[/(kf[A-z]+)\sbuild\/.+silk\//i],[m,[h,"Amazon"],[v,T]],[/(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i],[[m,k.str,R.device.amazon.model],[h,"Amazon"],[v,x]],[/\((ip[honed|\s\w*]+);.+(apple)/i],[m,h,[v,x]],[/\((ip[honed|\s\w*]+);/i],[m,[h,"Apple"],[v,x]],[/(blackberry)[\s-]?(\w+)/i,/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,/(hp)\s([\w\s]+\w)/i,/(asus)-?(\w+)/i],[h,m,[v,x]],[/\(bb10;\s(\w+)/i],[m,[h,"BlackBerry"],[v,x]],[/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i],[m,[h,"Asus"],[v,T]],[/(sony)\s(tablet\s[ps])\sbuild\//i,/(sony)?(?:sgp.+)\sbuild\//i],[[h,"Sony"],[m,"Xperia Tablet"],[v,T]],[/android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i],[m,[h,"Sony"],[v,x]],[/\s(ouya)\s/i,/(nintendo)\s([wids3u]+)/i],[h,m,[v,O]],[/android.+;\s(shield)\sbuild/i],[m,[h,"Nvidia"],[v,O]],[/(playstation\s[34portablevi]+)/i],[m,[h,"Sony"],[v,O]],[/(sprint\s(\w+))/i],[[h,k.str,R.device.sprint.vendor],[m,k.str,R.device.sprint.model],[v,x]],[/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],[h,m,[v,T]],[/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,/(zte)-(\w*)/i,/(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i],[h,[m,/_/g," "],[v,x]],[/(nexus\s9)/i],[m,[h,"HTC"],[v,T]],[/d\/huawei([\w\s-]+)[;\)]/i,/(nexus\s6p)/i],[m,[h,"Huawei"],[v,x]],[/(microsoft);\s(lumia[\s\w]+)/i],[h,m,[v,x]],[/[\s\(;](xbox(?:\sone)?)[\s\);]/i],[m,[h,"Microsoft"],[v,O]],[/(kin\.[onetw]{3})/i],[[m,/\./g," "],[h,"Microsoft"],[v,x]],[/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,/mot[\s-]?(\w*)/i,/(XT\d{3,4}) build\//i,/(nexus\s6)/i],[m,[h,"Motorola"],[v,x]],[/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],[m,[h,"Motorola"],[v,T]],[/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],[[h,N.trim],[m,N.trim],[v,y]],[/hbbtv.+maple;(\d+)/i],[[m,/^/,"SmartTV"],[h,"Samsung"],[v,y]],[/\(dtv[\);].+(aquos)/i],[m,[h,"Sharp"],[v,y]],[/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,/((SM-T\w+))/i],[[h,"Samsung"],m,[v,T]],[/smart-tv.+(samsung)/i],[h,[v,y],m],[/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,/(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i,/sec-((sgh\w+))/i],[[h,"Samsung"],m,[v,x]],[/sie-(\w*)/i],[m,[h,"Siemens"],[v,x]],[/(maemo|nokia).*(n900|lumia\s\d+)/i,/(nokia)[\s_-]?([\w-]*)/i],[[h,"Nokia"],m,[v,x]],[/android\s3\.[\s\w;-]{10}(a\d{3})/i],[m,[h,"Acer"],[v,T]],[/android.+([vl]k\-?\d{3})\s+build/i],[m,[h,"LG"],[v,T]],[/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],[[h,"LG"],m,[v,T]],[/(lg) netcast\.tv/i],[h,m,[v,y]],[/(nexus\s[45])/i,/lg[e;\s\/-]+(\w*)/i,/android.+lg(\-?[\d\w]+)\s+build/i],[m,[h,"LG"],[v,x]],[/android.+(ideatab[a-z0-9\-\s]+)/i],[m,[h,"Lenovo"],[v,T]],[/linux;.+((jolla));/i],[h,m,[v,x]],[/((pebble))app\/[\d\.]+\s/i],[h,m,[v,A]],[/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i],[h,m,[v,x]],[/crkey/i],[[m,"Chromecast"],[h,"Google"]],[/android.+;\s(glass)\s\d/i],[m,[h,"Google"],[v,A]],[/android.+;\s(pixel c)\s/i],[m,[h,"Google"],[v,T]],[/android.+;\s(pixel xl|pixel)\s/i],[m,[h,"Google"],[v,x]],[/android.+;\s(\w+)\s+build\/hm\1/i,/android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,/android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i,/android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i],[[m,/_/g," "],[h,"Xiaomi"],[v,x]],[/android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i],[[m,/_/g," "],[h,"Xiaomi"],[v,T]],[/android.+;\s(m[1-5]\snote)\sbuild/i],[m,[h,"Meizu"],[v,T]],[/android.+a000(1)\s+build/i,/android.+oneplus\s(a\d{4})\s+build/i],[m,[h,"OnePlus"],[v,x]],[/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i],[m,[h,"RCA"],[v,T]],[/android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i],[m,[h,"Dell"],[v,T]],[/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i],[m,[h,"Verizon"],[v,T]],[/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i],[[h,"Barnes & Noble"],m,[v,T]],[/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i],[m,[h,"NuVision"],[v,T]],[/android.+;\s(k88)\sbuild/i],[m,[h,"ZTE"],[v,T]],[/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i],[m,[h,"Swiss"],[v,x]],[/android.+[;\/]\s*(zur\d{3})\s+build/i],[m,[h,"Swiss"],[v,T]],[/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i],[m,[h,"Zeki"],[v,T]],[/(android).+[;\/]\s+([YR]\d{2})\s+build/i,/android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i],[[h,"Dragon Touch"],m,[v,T]],[/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i],[m,[h,"Insignia"],[v,T]],[/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i],[m,[h,"NextBook"],[v,T]],[/android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i],[[h,"Voice"],m,[v,x]],[/android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i],[[h,"LvTel"],m,[v,x]],[/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i],[m,[h,"Envizen"],[v,T]],[/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i],[h,m,[v,T]],[/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i],[m,[h,"MachSpeed"],[v,T]],[/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i],[h,m,[v,T]],[/android.+[;\/]\s*TU_(1491)\s+build/i],[m,[h,"Rotor"],[v,T]],[/android.+(KS(.+))\s+build/i],[m,[h,"Amazon"],[v,T]],[/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i],[h,m,[v,T]],[/\s(tablet|tab)[;\/]/i,/\s(mobile)(?:[;\/]|\ssafari)/i],[[v,N.lowerize],h,m],[/(android[\w\.\s\-]{0,9});.+build/i],[m,[h,"Generic"]]],engine:[[/windows.+\sedge\/([\w\.]+)/i],[E,[f,"EdgeHTML"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,/(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,/(icab)[\/\s]([23]\.[\d\.]+)/i],[f,E],[/rv\:([\w\.]{1,9}).+(gecko)/i],[E,f]],os:[[/microsoft\s(windows)\s(vista|xp)/i],[f,E],[/(windows)\snt\s6\.2;\s(arm)/i,/(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,/(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],[f,[E,k.str,R.os.windows.version]],[/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],[[f,"Windows"],[E,k.str,R.os.windows.version]],[/\((bb)(10);/i],[[f,"BlackBerry"],E],[/(blackberry)\w*\/?([\w\.]*)/i,/(tizen)[\/\s]([\w\.]+)/i,/(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]*)/i,/linux;.+(sailfish);/i],[f,E],[/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i],[[f,"Symbian"],E],[/\((series40);/i],[f],[/mozilla.+\(mobile;.+gecko.+firefox/i],[[f,"Firefox OS"],E],[/(nintendo|playstation)\s([wids34portablevu]+)/i,/(mint)[\/\s\(]?(\w*)/i,/(mageia|vectorlinux)[;\s]/i,/(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,/(hurd|linux)\s?([\w\.]*)/i,/(gnu)\s?([\w\.]*)/i],[f,E],[/(cros)\s[\w]+\s([\w\.]+\w)/i],[[f,"Chromium OS"],E],[/(sunos)\s?([\w\.\d]*)/i],[[f,"Solaris"],E],[/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i],[f,E],[/(haiku)\s(\w+)/i],[f,E],[/cfnetwork\/.+darwin/i,/ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i],[[E,/_/g,"."],[f,"iOS"]],[/(mac\sos\sx)\s?([\w\s\.]*)/i,/(macintosh|mac(?=_powerpc)\s)/i],[[f,"Mac OS"],[E,/_/g,"."]],[/((?:open)?solaris)[\/\s-]?([\w\.]*)/i,/(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,/(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,/(unix)\s?([\w\.]*)/i],[f,E]]},I=function(e,o){if("object"==typeof e&&(o=e,e=d),!(this instanceof I))return new I(e,o).getResult();var n=e||(t&&t.navigator&&t.navigator.userAgent?t.navigator.userAgent:""),r=o?N.extend(M,o):M;return this.getBrowser=function(){var e={name:d,version:d};return k.rgx.call(e,n,r.browser),e.major=N.major(e.version),e},this.getCPU=function(){var e={architecture:d};return k.rgx.call(e,n,r.cpu),e},this.getDevice=function(){var e={vendor:d,model:d,type:d};return k.rgx.call(e,n,r.device),e},this.getEngine=function(){var e={name:d,version:d};return k.rgx.call(e,n,r.engine),e},this.getOS=function(){var e={name:d,version:d};return k.rgx.call(e,n,r.os),e},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return n},this.setUA=function(e){return n=e,this},this};I.VERSION="0.7.18",I.BROWSER={NAME:f,MAJOR:"major",VERSION:E},I.CPU={ARCHITECTURE:S},I.DEVICE={MODEL:m,VENDOR:h,TYPE:v,CONSOLE:O,MOBILE:x,SMARTTV:y,TABLET:T,WEARABLE:A,EMBEDDED:"embedded"},I.ENGINE={NAME:f,VERSION:E},I.OS={NAME:f,VERSION:E},typeof o!==w?(typeof e!==w&&e.exports&&(o=e.exports=I),o.UAParser=I):n(3)?(r=function(){return I}.call(o,n,o,e))===d||(e.exports=r):t&&(t.UAParser=I);var P=t&&(t.jQuery||t.Zepto);if(typeof P!==w){var C=new I;P.ua=C.getResult(),P.ua.get=function(){return C.getUA()},P.ua.set=function(e){C.setUA(e);var o=C.getResult();for(var n in o)P.ua[n]=o[n]}}}("object"==typeof window?window:this)},function(e,o){(function(o){e.exports=o}).call(o,{})},function(e,o,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var r=Object.assign||function(e){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var o in source)Object.prototype.hasOwnProperty.call(source,o)&&(e[o]=source[o])}return e},t=n(0),d=t.DEVICE_TYPES,l=t.defaultData,w=o.getNavigatorInstance=function(){return!("undefined"==typeof window||!window.navigator&&!navigator)&&(window.navigator||navigator)},c=o.isIOS13Check=function(e){var nav=w();return nav&&nav.platform&&(-1!==nav.platform.indexOf(e)||"MacIntel"===nav.platform&&nav.maxTouchPoints>1&&!window.MSStream)};e.exports={checkType:function(e){switch(e){case d.MOBILE:return{isMobile:!0};case d.TABLET:return{isTablet:!0};case d.SMART_TV:return{isSmartTV:!0};case d.CONSOLE:return{isConsole:!0};case d.WEARABLE:return{isWearable:!0};case d.BROWSER:return{isBrowser:!0};default:return l}},broPayload:function(e,o,n,r,t){return{isBrowser:e,browserMajorVersion:o.major,browserFullVersion:o.version,browserName:o.name,engineName:n.name||!1,engineVersion:n.version,osName:r.name,osVersion:r.version,userAgent:t}},mobilePayload:function(e,o,n,t){return r({},e,{vendor:o.vendor,model:o.model,os:n.name,osVersion:n.version,ua:t})},stvPayload:function(e,o,n,r){return{isSmartTV:e,engineName:o.name,engineVersion:o.version,osName:n.name,osVersion:n.version,userAgent:r}},consolePayload:function(e,o,n,r){return{isConsole:e,engineName:o.name,engineVersion:o.version,osName:n.name,osVersion:n.version,userAgent:r}},wearPayload:function(e,o,n,r){return{isWearable:e,engineName:o.name,engineVersion:o.version,osName:n.name,osVersion:n.version,userAgent:r}},getNavigatorInstance:w,isIOS13Check:c}}])}}]);