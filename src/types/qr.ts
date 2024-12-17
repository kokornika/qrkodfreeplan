export type QRContentType = 'url' | 'text' | 'email' | 'phone' | 'wifi' | 'vcard';

export type WifiEncryption = 'WPA' | 'WEP' | 'nopass';

export interface WifiSettings {
  ssid: string;
  password: string;
  encryption: WifiEncryption;
}

export interface QROptions {
  contentType: QRContentType;
  content: string;
  backgroundColor: string;
  foregroundColor: string;
  size: number;
  wifiSettings?: WifiSettings;
}