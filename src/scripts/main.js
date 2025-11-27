document
  .getElementById("generateBtn")
  .addEventListener("click", generateConfig);
document.getElementById("downloadBtn").addEventListener("click", downloadFile);

let generatedContent = "";

function generateConfig() {
  const connectTo = document.getElementById("connectTo").value.trim();
  const port = document.getElementById("port").value.trim();
  const user = document.getElementById("user").value.trim();
  const password = document.getElementById("password").value.trim();
  const srcAddress = document.getElementById("srcAddress").value.trim();

  if (!connectTo || !port || !user || !password || !srcAddress) {
    alert("Будь ласка, заповніть всі поля!");
    return;
  }

  generatedContent = `/certificate/import file-name=ca.crt
/certificate/import file-name=cert.crt
/certificate/import file-name=key.pem
/interface ovpn-client
add name=ovpn-out1 connect-to=${connectTo} port=${port} mode=ip protocol=tcp user=${user} password=${password} profile=default certificate=cert.crt_0 verify-server-certificate=yes auth=sha1 cipher=aes256-cbc use-peer-dns=no add-default-route=no route-nopull=yes
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
add src-address=${srcAddress} dst-address=10.0.1.120 port=2055 version=9
/system/logging/action set remote remote=10.0.1.120 remote-port=514 src-address=${srcAddress}
/system logging
add action=remote topics=info
add action=remote topics=error
add action=remote topics=warning
add action=remote topics=critical
/ip route
add disabled=no dst-address=10.0.1.120/32 gateway=ovpn-out1 routing-table=main suppress-hw-offload=no
/ip firewall nat
add action=masquerade chain=srcnat dst-address=10.0.1.120 out-interface=ovpn-out1`;

  const downloadBtn = document.getElementById("downloadBtn");
  downloadBtn.style.display = "inline-block";
  downloadBtn.innerText = "Скачати ovpn-i-cert.rsc";
}

function downloadFile() {
  if (!generatedContent) return;

  const blob = new Blob([generatedContent], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "ovpn-i-cert.rsc";
  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
