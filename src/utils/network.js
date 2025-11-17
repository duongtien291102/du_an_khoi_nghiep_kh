import os from "os";

/**
 * Lấy địa chỉ IPv4 của WiFi/Ethernet đang kết nối
 * @returns {string} Địa chỉ IPv4 hoặc 'localhost' nếu không tìm thấy
 */
export function getLocalIPv4() {
  const interfaces = os.networkInterfaces();
  
  // Ưu tiên tìm WiFi trước
  const wifiNames = ['wi-fi', 'wifi', 'wlan'];
  for (const name of Object.keys(interfaces)) {
    const lowerName = name.toLowerCase();
    if (wifiNames.some(wifi => lowerName.includes(wifi))) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
  }
  
  // Sau đó tìm Ethernet
  const ethernetNames = ['ethernet', 'eth'];
  for (const name of Object.keys(interfaces)) {
    const lowerName = name.toLowerCase();
    if (ethernetNames.some(eth => lowerName.includes(eth))) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
  }
  
  // Fallback: Lấy bất kỳ IPv4 nào không phải localhost
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  
  return 'localhost';
}

/**
 * Lấy tất cả địa chỉ IPv4 của máy
 * @returns {Array<{name: string, address: string}>}
 */
export function getAllIPv4Addresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  
  for (const [name, ifaces] of Object.entries(interfaces)) {
    for (const iface of ifaces) {
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push({ name, address: iface.address });
      }
    }
  }
  
  return addresses;
}

/**
 * Hiển thị thông tin server đẹp mắt
 * @param {number} port - Port của server
 * @param {string} serverName - Tên server
 */
export function displayServerInfo(port, serverName = 'Server') {
  const localIP = getLocalIPv4();
  const allIPs = getAllIPv4Addresses();
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🚀 ${serverName} đang chạy`);
  console.log(`${'='.repeat(60)}`);
  console.log(`\n📱 Truy cập Local:`);
  console.log(`   http://localhost:${port}`);
  console.log(`\n🌐 Truy cập từ thiết bị khác (cùng WiFi):`);
  console.log(`   http://${localIP}:${port}`);
  
  if (allIPs.length > 1) {
    console.log(`\n📡 Các địa chỉ IP khác:`);
    allIPs.forEach(({ name, address }) => {
      if (address !== localIP) {
        console.log(`   ${name}: http://${address}:${port}`);
      }
    });
  }
  
  console.log(`\n${'='.repeat(60)}\n`);
}
