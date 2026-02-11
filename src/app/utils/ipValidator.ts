/**
 * Utilitários para validação de endereços IP
 */

/**
 * Valida se uma string é um endereço IPv4 válido
 * 
 * @param ip - String para validar
 * @returns true se for um IPv4 válido
 */
export function isValidIPv4(ip: string): boolean {
  const ipv4Pattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const match = ip.match(ipv4Pattern);
  
  if (!match) return false;
  
  // Verifica se cada octeto está entre 0 e 255
  for (let i = 1; i <= 4; i++) {
    const octet = parseInt(match[i], 10);
    if (octet < 0 || octet > 255) {
      return false;
    }
  }
  
  return true;
}

/**
 * Valida se uma string é um endereço IPv6 válido (simplificado)
 * 
 * @param ip - String para validar
 * @returns true se for um IPv6 válido
 */
export function isValidIPv6(ip: string): boolean {
  const ipv6Pattern = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
  return ipv6Pattern.test(ip);
}

/**
 * Valida se uma string é um endereço IP válido (IPv4 ou IPv6)
 * 
 * @param ip - String para validar
 * @returns true se for um IP válido
 */
export function isValidIP(ip: string): boolean {
  return isValidIPv4(ip) || isValidIPv6(ip);
}

/**
 * Formata uma mensagem de erro para IPs inválidos
 * 
 * @param ip - IP inválido
 * @returns Mensagem de erro formatada
 */
export function getIPErrorMessage(ip: string): string {
  if (!ip || ip.trim() === '') {
    return 'Por favor, insira um endereço IP';
  }
  return 'Formato de IP inválido. Use IPv4 (ex: 8.8.8.8) ou IPv6';
}
