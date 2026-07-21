<script setup lang="ts">
const { t } = useI18n()
const { whatsappLink } = useBusiness()

const form = reactive({ name: '', contact: '', subject: '', message: '', website: '' })
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const errorMsg = ref('')

const isValid = computed(
  () => form.name.trim() && form.contact.trim() && form.message.trim(),
)

async function submit() {
  errorMsg.value = ''
  if (!isValid.value) {
    status.value = 'error'
    errorMsg.value = t('contact.form.errorRequired')
    return
  }
  status.value = 'sending'
  try {
    await $fetch('/api/contact', { method: 'POST', body: { ...form } })
    status.value = 'success'
  } catch {
    status.value = 'error'
    errorMsg.value = t('contact.form.errorGeneric')
  }
}

function reset() {
  form.name = form.contact = form.subject = form.message = form.website = ''
  status.value = 'idle'
  errorMsg.value = ''
}

const waFallback = computed(() =>
  whatsappLink(`Halo BikinBadjoe! ${form.subject ? `[${form.subject}] ` : ''}${form.message}`),
)
</script>

<template>
  <div class="cform">
    <h2 class="cform__title">{{ t('contact.form.title') }}</h2>

    <div v-if="status === 'success'" class="cform__success" role="status">
      <BaseIcon name="check-circle" :size="40" />
      <h3>{{ t('contact.form.successTitle') }}</h3>
      <p>{{ t('contact.form.successBody') }}</p>
      <BaseButton variant="outline" icon="arrow-right" @click="reset">
        {{ t('contact.form.sendAnother') }}
      </BaseButton>
    </div>

    <form v-else class="cform__form" novalidate @submit.prevent="submit">
      <div class="cform__row">
        <label class="cform__field">
          <span class="cform__label">{{ t('contact.form.name') }} *</span>
          <input v-model="form.name" type="text" class="cform__input" :placeholder="t('contact.form.namePlaceholder')" required />
        </label>
        <label class="cform__field">
          <span class="cform__label">{{ t('contact.form.contact') }} *</span>
          <input v-model="form.contact" type="text" class="cform__input" :placeholder="t('contact.form.contactPlaceholder')" required />
        </label>
      </div>

      <label class="cform__field">
        <span class="cform__label">{{ t('contact.form.subject') }}</span>
        <input v-model="form.subject" type="text" class="cform__input" :placeholder="t('contact.form.subjectPlaceholder')" />
      </label>

      <label class="cform__field">
        <span class="cform__label">{{ t('contact.form.message') }} *</span>
        <textarea v-model="form.message" rows="5" class="cform__input cform__textarea" :placeholder="t('contact.form.messagePlaceholder')" required />
      </label>

      <!-- Honeypot: hidden from users, catches bots. -->
      <input v-model="form.website" type="text" class="cform__hp" tabindex="-1" autocomplete="off" aria-hidden="true" />

      <p v-if="status === 'error'" class="cform__error" role="alert">
        {{ errorMsg }} <a :href="waFallback" target="_blank" rel="noopener noreferrer">WhatsApp →</a>
      </p>

      <BaseButton icon="arrow-right" size="lg" :block="true" type="submit">
        {{ status === 'sending' ? t('contact.form.sending') : t('contact.form.submit') }}
      </BaseButton>
    </form>
  </div>
</template>

<style scoped lang="scss">
.cform {
  @include surface;
  padding: $space-6;

  &__title {
    font-size: $fs-h2;
    font-weight: $fw-extra;
    color: $color-cream;
    margin-bottom: $space-5;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__row {
    display: grid;
    gap: $space-4;

    @include up(sm) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: $space-2;
  }

  &__label {
    font-family: $font-heading;
    font-weight: $fw-semibold;
    font-size: $fs-sm;
    color: $color-cream-dim;
  }

  &__input {
    background: $color-ink;
    border: 1px solid $color-line;
    border-radius: $radius-md;
    padding: 0.85rem 1rem;
    color: $color-cream;
    font-size: $fs-body;
    transition: border-color $transition-base;

    &::placeholder {
      color: rgba($color-cream, 0.35);
    }

    &:focus {
      outline: none;
      border-color: $color-primary;
    }
  }

  &__textarea {
    resize: vertical;
    min-height: 120px;
  }

  // Honeypot — visually removed but present in DOM.
  &__hp {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }

  &__error {
    color: $color-primary-400;
    font-size: $fs-sm;

    a {
      color: $color-cream;
      text-decoration: underline;
    }
  }

  &__success {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: $space-3;
    padding-block: $space-5;
    color: $color-cream;

    svg {
      color: $color-sticker-green;
    }

    h3 {
      font-size: $fs-h3;
      font-weight: $fw-bold;
    }

    p {
      color: $text-muted;
      margin-bottom: $space-3;
    }
  }
}
</style>
