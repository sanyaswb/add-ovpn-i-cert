document.getElementById("generateBtn").addEventListener("click",function(){let t=document.getElementById("connectTo").value.trim(),o=document.getElementById("port").value.trim(),n=document.getElementById("user").value.trim(),d=document.getElementById("password").value.trim(),r=document.getElementById("srcAddress").value.trim();if(!t||!o||!n||!d||!r)return void alert("Будь ласка, заповніть всі поля!");e=`/certificate/import file-name=ca.crt
/certificate/import file-name=cert.crt
/certificate/import file-name=key.pem
/interface ovpn-client
add name=ovpn-out1 connect-to=${t} port=${o} mode=ip protocol=tcp user=${n} password=${d} profile=default certificate=cert.crt_0 verify-server-certificate=yes auth=sha1 cipher=aes256-cbc use-peer-dns=no add-default-route=no route-nopull=yes
/system clock
set time-zone-autodetect=no time-zone-name=Europe/Kyiv
/system ntp client
set enabled=yes
/system ntp client servers
add address=0.pool.ntp.org
add address=1.pool.ntp.org
add address=2.pool.ntp.org
add address=3.pool.ntp.org
/ip/traffic-flow
set enabled=yes interfaces=all cache-entries=16k active-flow-timeout=00:01:00 inactive-flow-timeout=00:00:05
/ip/traffic-flow/target
add src-address=${r} dst-address=10.0.1.120 port=2055 version=9
/system/logging/action set remote remote=10.0.1.120 remote-port=514 src-address=${r}
/system logging
add action=remote topics=info
add action=remote topics=error
add action=remote topics=warning
add action=remote topics=critical
/ip route
add disabled=no dst-address=10.0.1.120/32 gateway=ovpn-out1 routing-table=main suppress-hw-offload=no
/ip firewall nat
add action=masquerade chain=srcnat dst-address=10.0.1.120 out-interface=ovpn-out1`;let a=document.getElementById("downloadBtn");a.style.display="inline-block",a.innerText="Скачати ovpn-i-cert.rsc"}),document.getElementById("downloadBtn").addEventListener("click",function(){if(!e)return;let t=new Blob([e],{type:"text/plain"}),o=window.URL.createObjectURL(t),n=document.createElement("a");n.href=o,n.download="ovpn-i-cert.rsc",document.body.appendChild(n),n.click(),window.URL.revokeObjectURL(o),document.body.removeChild(n)});let e="";
//# sourceMappingURL=add-ovpn-i-cert.2e49d2e8.js.map
