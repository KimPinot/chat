import getConfig from "next/config";

export function config() {
  return Object.keys(getConfig().serverRuntimeConfig).length
    ? getConfig().serverRuntimeConfig
    : getConfig().publicRuntimeConfig;
}
