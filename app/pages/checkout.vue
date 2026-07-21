<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { whatsappLink } = useBusiness()
const { detailed, subtotal, clear } = useCart()

usePageSeo({ key: 'checkout', path: '/checkout' })

const form = reactive({ name: '', phone: '', address: '', note: '' })
const status = ref<'idle' | 'placing' | 'done'>('idle')

const waHref = computed(() => {
  const lines = [t('checkout.waIntro'), '']
  for (const { line, product } of detailed.value) {
    lines.push(`• ${t(`${product.i18n}.name`)} ×${line.qty} — ${formatIDR(product.price * line.qty)}`)
  }
  lines.push('', `${t('checkout.total')}: ${formatIDR(subtotal.value)}`)
  if (form.name) lines.push('', `${t('checkout.form.name')}: ${form.name}`)
  if (form.phone) lines.push(`${t('checkout.form.phone')}: ${form.phone}`)
  if (form.address) lines.push(`${t('checkout.form.address')}: ${form.address}`)
  if (form.note) lines.push(`${t('checkout.form.note')}: ${form.note}`)
  return whatsappLink(lines.join('\n'))
})

async function placeOrder() {
  status.value = 'placing'
  // Demo: no real payment. Simulate a short processing tick, then confirm.
  await new Promise((r) => setTimeout(r, 700))
  status.value = 'done'
  clear()
}
</script>

<template>
  <div>
    <PageHero :kicker="t('checkout.kicker')" :title="t('checkout.title')" />

    <section class="section">
      <div class="container--wide">
        <!-- Success -->
        <div v-if="status === 'done'" class="co-done" v-reveal>
          <BaseIcon name="check-circle" :size="48" />
          <h2>{{ t('checkout.successTitle') }}</h2>
          <p>{{ t('checkout.successBody') }}</p>
          <div class="co-done__actions">
            <BaseButton :href="waHref" external icon="whatsapp">{{ t('checkout.continueWa') }}</BaseButton>
            <BaseButton :to="localePath('/shop')" variant="outline" icon-right="arrow-right">{{ t('checkout.backToShop') }}</BaseButton>
          </div>
        </div>

        <!-- Empty -->
        <div v-else-if="!detailed.length" class="co-empty">
          <BaseIcon name="bag" :size="44" />
          <p>{{ t('checkout.empty') }}</p>
          <BaseButton :to="localePath('/shop')" icon-right="arrow-right">{{ t('checkout.backToShop') }}</BaseButton>
        </div>

        <!-- Checkout grid -->
        <div v-else class="co">
          <form class="co-form" @submit.prevent="placeOrder">
            <h2 class="co-form__title">{{ t('checkout.form.title') }}</h2>
            <label class="co-field">
              <span>{{ t('checkout.form.name') }} *</span>
              <input v-model="form.name" type="text" required :placeholder="t('checkout.form.namePlaceholder')" />
            </label>
            <label class="co-field">
              <span>{{ t('checkout.form.phone') }} *</span>
              <input v-model="form.phone" type="text" required :placeholder="t('checkout.form.phonePlaceholder')" />
            </label>
            <label class="co-field">
              <span>{{ t('checkout.form.address') }} *</span>
              <textarea v-model="form.address" rows="3" required :placeholder="t('checkout.form.addressPlaceholder')" />
            </label>
            <label class="co-field">
              <span>{{ t('checkout.form.note') }}</span>
              <textarea v-model="form.note" rows="2" :placeholder="t('checkout.form.notePlaceholder')" />
            </label>
            <p class="co-form__disclaimer">{{ t('checkout.disclaimer') }}</p>
            <BaseButton size="lg" block icon-right="arrow-right" type="submit">
              {{ status === 'placing' ? t('checkout.placing') : t('checkout.place') }}
            </BaseButton>
          </form>

          <aside class="co-summary">
            <h2 class="co-summary__title">{{ t('checkout.summary') }}</h2>
            <ul class="co-summary__list">
              <li v-for="{ line, product } in detailed" :key="line.id" class="co-line">
                <NuxtImg :src="product.image" :alt="t(`${product.i18n}.name`)" width="60" height="72" class="co-line__img" />
                <div class="co-line__info">
                  <span class="co-line__name">{{ t(`${product.i18n}.name`) }}</span>
                  <span class="co-line__qty">×{{ line.qty }}</span>
                </div>
                <span class="co-line__price">{{ formatIDR(product.price * line.qty) }}</span>
              </li>
            </ul>
            <div class="co-summary__total">
              <span>{{ t('checkout.total') }}</span>
              <strong>{{ formatIDR(subtotal) }}</strong>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.co {
  display: grid;
  gap: $space-6;
  align-items: start;

  @include up(lg) {
    grid-template-columns: 1fr 380px;
  }
}

.co-form {
  @include surface;
  padding: $space-6;
  display: flex;
  flex-direction: column;
  gap: $space-4;

  &__title {
    font-size: $fs-h3;
    font-weight: $fw-extra;
    color: $color-cream;
  }

  &__disclaimer {
    font-size: $fs-xs;
    color: $color-cream-dim;
    padding: $space-3;
    background: $color-ink;
    border-radius: $radius-md;
  }
}

.co-field {
  display: flex;
  flex-direction: column;
  gap: $space-2;

  span {
    font-family: $font-heading;
    font-weight: $fw-semibold;
    font-size: $fs-sm;
    color: $color-cream-dim;
  }

  input,
  textarea {
    background: $color-ink;
    border: 1px solid $color-line;
    border-radius: $radius-md;
    padding: 0.8rem 1rem;
    color: $color-cream;
    font: inherit;
    resize: vertical;

    &::placeholder {
      color: rgba($color-cream, 0.35);
    }
    &:focus {
      outline: none;
      border-color: $color-primary;
    }
  }
}

.co-summary {
  @include surface;
  padding: $space-5;
  position: sticky;
  top: 90px;

  &__title {
    font-size: $fs-h3;
    font-weight: $fw-extra;
    color: $color-cream;
    margin-bottom: $space-4;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: $space-3;
    list-style: none;
    margin-bottom: $space-4;
  }

  &__total {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding-top: $space-4;
    border-top: 1px solid $color-line;
    color: $text-muted;

    strong {
      font-family: $font-heading;
      font-size: $fs-h2;
      color: $color-cream;
    }
  }
}

.co-line {
  display: flex;
  align-items: center;
  gap: $space-3;

  &__img {
    width: 48px;
    height: 58px;
    object-fit: cover;
    border-radius: $radius-sm;
    flex-shrink: 0;
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__name {
    font-size: $fs-sm;
    color: $color-cream;
  }

  &__qty {
    font-size: $fs-xs;
    color: $text-muted;
  }

  &__price {
    font-size: $fs-sm;
    font-weight: $fw-semibold;
    color: $color-cream;
  }
}

.co-empty,
.co-done {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: $space-4;
  padding-block: $space-8;
  color: $text-muted;

  svg {
    color: $color-sticker-green;
  }

  h2 {
    font-size: $fs-h2;
    color: $color-cream;
  }
}

.co-empty svg {
  color: $color-primary-400;
}

.co-done__actions {
  display: flex;
  flex-wrap: wrap;
  gap: $space-3;
  justify-content: center;
}
</style>
