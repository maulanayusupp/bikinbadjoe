/**
 * v-reveal — adds `.is-visible` to `.reveal` elements when they scroll into
 * view. Supports an optional stagger delay: v-reveal="150" (ms).
 */
export default defineNuxtPlugin((nuxtApp) => {
  const observer =
    typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(
          (entries, obs) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible')
                obs.unobserve(entry.target)
              }
            }
          },
          { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
        )
      : null

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding) {
      el.classList.add('reveal')
      if (binding.value) el.style.transitionDelay = `${binding.value}ms`
      if (observer) observer.observe(el)
      else el.classList.add('is-visible')
    },
    unmounted(el: HTMLElement) {
      observer?.unobserve(el)
    },
  })
})
