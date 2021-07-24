import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _c73f77ac = () => interopDefault(import('../client/pages/index.vue' /* webpackChunkName: "pages/index" */))
const _84a0f9a6 = () => interopDefault(import('../client/pages/index/index.vue' /* webpackChunkName: "pages/index/index" */))
const _720d7057 = () => interopDefault(import('../client/pages/index/guide.vue' /* webpackChunkName: "pages/index/guide" */))
const _13b7692f = () => interopDefault(import('../client/pages/index/history.vue' /* webpackChunkName: "pages/index/history" */))
const _490effac = () => interopDefault(import('../client/pages/index/mail.vue' /* webpackChunkName: "pages/index/mail" */))
const _4ab1c758 = () => interopDefault(import('../client/pages/index/setup.vue' /* webpackChunkName: "pages/index/setup" */))
const _09a1af57 = () => interopDefault(import('../client/pages/index/sieucapvippro.vue' /* webpackChunkName: "pages/index/sieucapvippro" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _c73f77ac,
    children: [{
      path: "",
      component: _84a0f9a6,
      name: "index"
    }, {
      path: "guide",
      component: _720d7057,
      name: "index-guide"
    }, {
      path: "history",
      component: _13b7692f,
      name: "index-history"
    }, {
      path: "mail",
      component: _490effac,
      name: "index-mail"
    }, {
      path: "setup",
      component: _4ab1c758,
      name: "index-setup"
    }, {
      path: "sieucapvippro",
      component: _09a1af57,
      name: "index-sieucapvippro"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
