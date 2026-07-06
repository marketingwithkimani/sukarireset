import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'co.ke.sukarireset.app',
  appName: 'Sukari Reset',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {},
  android: {
    buildOptions: {
      keystorePath: 'release.keystore',
      keystoreAlias: 'sukarireset',
    },
  },
};

export default config;
