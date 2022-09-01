import { defineStore } from 'pinia'
import { store } from '..'

import { Cache, PROJ_CFG_KEY } from '@/utils/cache'
import { deepMerge } from '@/utils'

import projectConfig from '@/settings/projectSetting'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    projectConfig: Cache.getItem(PROJ_CFG_KEY, projectConfig)
  }),
  getters: {
    getProjectConfig() {
      return this.projectConfig || {}
    },
    getHeaderSetting() {
      return this.getProjectConfig.headerSetting
    },
    getMenuSetting() {
      return this.getProjectConfig.menuSetting
    },
    getMultiTabsSetting() {
      return this.getProjectConfig.multiTabsSetting
    }
  },
  actions: {
    setProjectConfig(config) {
      this.projectConfig = deepMerge(this.projectConfig || {}, config)
      Cache.setItem(PROJ_CFG_KEY, this.projectConfig)
    }
  }
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
