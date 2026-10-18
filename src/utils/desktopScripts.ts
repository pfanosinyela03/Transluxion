export interface DesktopScript {
  id: string;
  name: string;
  os: 'windows' | 'mac' | 'linux' | 'python';
  description: string;
  packageUrl?: string;
}

export const DESKTOP_SCRIPTS: DesktopScript[] = [
  {
    id: 'windows-gui-bat',
    name: 'Transluxion Windows Desktop GUI',
    os: 'windows',
    description: 'Start or pause local F15 keyboard input sent every 45 seconds. Teams status is not checked.',
    packageUrl: `${import.meta.env.BASE_URL}downloads/Transluxion.exe`
  },
  {
    id: 'mac-caffeinate',
    name: 'Transluxion macOS Desktop App',
    os: 'mac',
    description: 'A native macOS app is in preparation. Its download will be added after the app is built and tested on macOS.'
  }
];
