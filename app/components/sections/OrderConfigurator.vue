<script setup lang="ts">
const { t } = useI18n()
const { whatsappLink } = useBusiness()
const { garments, printOptions, colors, quantityTiers } = useCommerceService()

const selected = reactive({
  garment: '' as string,
  color: '' as string,
  prints: [] as string[],
  qty: '' as string,
  notes: '' as string,
})

function togglePrint(id: string) {
  const i = selected.prints.indexOf(id)
  if (i === -1) selected.prints.push(id)
  else selected.prints.splice(i, 1)
}

const canSend = computed(() => selected.garment && selected.prints.length > 0)

const garmentName = computed(() =>
  selected.garment ? t(`order.garments.${selected.garment}.name`) : '',
)
const colorName = computed(() => (selected.color ? t(`order.colors.${selected.color}`) : ''))
const printNames = computed(() =>
  selected.prints.map((id) => t(`${printOptions.find((p) => p.id === id)!.i18n}.name`)),
)
const qtyLabel = computed(
  () => quantityTiers.find((q) => q.id === selected.qty)?.label ?? '',
)

const waMessage = computed(() => {
  const lines = [t('order.waIntro'), '']
  lines.push(`• ${t('order.fields.garment')}: ${garmentName.value}`)
  if (colorName.value) lines.push(`• ${t('order.fields.color')}: ${colorName.value}`)
  lines.push(`• ${t('order.fields.print')}: ${printNames.value.join(', ')}`)
  if (qtyLabel.value) lines.push(`• ${t('order.fields.quantity')}: ${qtyLabel.value}`)
  if (selected.notes.trim()) lines.push(`• ${t('order.fields.notes')}: ${selected.notes.trim()}`)
  return lines.join('\n')
})

const waHref = computed(() => whatsappLink(waMessage.value))

function reset() {
  selected.garment = ''
  selected.color = ''
  selected.prints = []
  selected.qty = ''
  selected.notes = ''
}

const summaryRows = computed(() =>
  [
    { key: t('order.fields.garment'), val: garmentName.value },
    { key: t('order.fields.color'), val: colorName.value },
    { key: t('order.fields.print'), val: printNames.value.join(', ') },
    { key: t('order.fields.quantity'), val: qtyLabel.value },
    { key: t('order.fields.notes'), val: selected.notes.trim() },
  ].filter((r) => r.val),
)
</script>

<template>
  <section class="section">
    <div class="cfg container--wide">
      <div class="cfg__steps">
        <!-- Step 1: garment -->
        <fieldset class="cfg__block">
          <legend class="cfg__legend"><span class="cfg__num">1</span>{{ t('order.steps.garment') }}</legend>
          <div class="cfg__grid cfg__grid--cards">
            <button
              v-for="g in garments"
              :key="g.id"
              type="button"
              class="opt-card"
              :class="{ 'is-active': selected.garment === g.id }"
              @click="selected.garment = g.id"
            >
              <BaseIcon :name="g.icon" :size="22" />
              <span class="opt-card__name">{{ t(`order.garments.${g.id}.name`) }}</span>
              <span class="opt-card__desc">{{ t(`order.garments.${g.id}.desc`) }}</span>
            </button>
          </div>
        </fieldset>

        <!-- Step 2: color -->
        <fieldset class="cfg__block">
          <legend class="cfg__legend"><span class="cfg__num">2</span>{{ t('order.steps.color') }}</legend>
          <div class="cfg__swatches">
            <button
              v-for="c in colors"
              :key="c.id"
              type="button"
              class="swatch"
              :class="{ 'is-active': selected.color === c.id }"
              :title="t(`order.colors.${c.id}`)"
              @click="selected.color = c.id"
            >
              <span class="swatch__dot" :style="{ background: c.hex }" />
              <span class="swatch__label">{{ t(`order.colors.${c.id}`) }}</span>
            </button>
          </div>
          <p class="cfg__hint">{{ t('order.colorNote') }}</p>
        </fieldset>

        <!-- Step 3: print (multi) -->
        <fieldset class="cfg__block">
          <legend class="cfg__legend"><span class="cfg__num">3</span>{{ t('order.steps.print') }}</legend>
          <div class="cfg__chips">
            <button
              v-for="p in printOptions"
              :key="p.id"
              type="button"
              class="chip"
              :class="{ 'is-active': selected.prints.includes(p.id) }"
              :aria-pressed="selected.prints.includes(p.id)"
              @click="togglePrint(p.id)"
            >
              <BaseIcon v-if="selected.prints.includes(p.id)" name="check" :size="15" />
              {{ t(`${p.i18n}.name`) }}
            </button>
          </div>
          <p class="cfg__hint">{{ t('order.printNote') }}</p>
        </fieldset>

        <!-- Step 4: quantity -->
        <fieldset class="cfg__block">
          <legend class="cfg__legend"><span class="cfg__num">4</span>{{ t('order.steps.quantity') }}</legend>
          <div class="cfg__chips">
            <button
              v-for="q in quantityTiers"
              :key="q.id"
              type="button"
              class="chip chip--qty"
              :class="{ 'is-active': selected.qty === q.id }"
              @click="selected.qty = q.id"
            >
              {{ q.label }}
            </button>
          </div>
        </fieldset>

        <!-- Step 5: notes -->
        <fieldset class="cfg__block">
          <legend class="cfg__legend"><span class="cfg__num">5</span>{{ t('order.steps.notes') }}</legend>
          <label class="sr-only" for="cfg-notes">{{ t('order.notesLabel') }}</label>
          <textarea
            id="cfg-notes"
            v-model="selected.notes"
            class="cfg__notes"
            rows="3"
            :placeholder="t('order.notesPlaceholder')"
          />
        </fieldset>
      </div>

      <!-- Sticky summary -->
      <aside class="cfg__summary">
        <div class="summary">
          <h2 class="summary__title">{{ t('order.summaryTitle') }}</h2>

          <dl v-if="summaryRows.length" class="summary__list">
            <div v-for="row in summaryRows" :key="row.key" class="summary__row">
              <dt>{{ row.key }}</dt>
              <dd>{{ row.val }}</dd>
            </div>
          </dl>
          <p v-else class="summary__empty">{{ t('order.summaryEmpty') }}</p>

          <p class="summary__price">{{ t('order.priceNote') }}</p>

          <BaseButton
            :href="canSend ? waHref : undefined"
            :external="canSend"
            :variant="canSend ? 'primary' : 'outline'"
            icon="whatsapp"
            size="lg"
            block
            :class="{ 'is-disabled': !canSend }"
          >
            {{ t('order.send') }}
          </BaseButton>
          <p v-if="!canSend" class="summary__incomplete">{{ t('order.incomplete') }}</p>
          <button v-if="summaryRows.length" type="button" class="summary__reset" @click="reset">
            {{ t('order.reset') }}
          </button>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cfg {
  display: grid;
  gap: $space-6;
  align-items: start;

  @include up(lg) {
    grid-template-columns: 1fr 360px;
  }

  &__steps {
    display: flex;
    flex-direction: column;
    gap: $space-6;
  }

  &__block {
    border: none;
    padding: 0;
    margin: 0;
  }

  &__legend {
    display: flex;
    align-items: center;
    gap: $space-3;
    font-family: $font-heading;
    font-weight: $fw-extra;
    font-size: $fs-h3;
    color: $color-cream;
    margin-bottom: $space-4;
    padding: 0;
  }

  &__num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: $color-primary;
    color: $color-white;
    font-size: $fs-sm;
  }

  &__grid--cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $space-3;

    @include up(md) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__swatches {
    display: flex;
    flex-wrap: wrap;
    gap: $space-3;
  }

  &__chips {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2;
  }

  &__hint {
    margin-top: $space-3;
    font-size: $fs-xs;
    color: $color-cream-dim;
  }

  &__notes {
    width: 100%;
    background: $color-ink;
    border: 1px solid $color-line;
    border-radius: $radius-md;
    padding: 0.85rem 1rem;
    color: $color-cream;
    font: inherit;
    resize: vertical;

    &:focus {
      outline: none;
      border-color: $color-primary;
    }
  }
}

.opt-card {
  @include surface;
  display: flex;
  flex-direction: column;
  gap: $space-1;
  padding: $space-4;
  text-align: left;
  color: $color-cream;
  transition:
    border-color $transition-base,
    transform $transition-base,
    background $transition-base;

  svg {
    color: $color-primary-400;
    margin-bottom: $space-1;
  }

  &__name {
    font-family: $font-heading;
    font-weight: $fw-bold;
  }

  &__desc {
    font-size: $fs-xs;
    color: $text-muted;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: rgba($color-primary, 0.5);
  }

  &.is-active {
    border-color: $color-primary;
    background: rgba($color-primary, 0.12);
  }
}

.swatch {
  display: inline-flex;
  align-items: center;
  gap: $space-2;
  padding: 6px 12px 6px 6px;
  border: 1px solid $color-line;
  border-radius: $radius-pill;
  color: $text-muted;
  font-size: $fs-sm;
  transition: all $transition-base;

  &__dot {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid rgba($color-cream, 0.25);
  }

  &:hover {
    color: $color-cream;
  }

  &.is-active {
    border-color: $color-primary;
    color: $color-cream;
    background: rgba($color-primary, 0.1);
  }
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: $space-1;
  padding: 0.55rem 1rem;
  border: 1px solid $color-line;
  border-radius: $radius-pill;
  color: $text-muted;
  font-family: $font-heading;
  font-weight: $fw-semibold;
  font-size: $fs-sm;
  transition: all $transition-base;

  &--qty {
    min-width: 60px;
    justify-content: center;
  }

  &:hover {
    color: $color-cream;
    border-color: rgba($color-cream, 0.4);
  }

  &.is-active {
    background: $color-primary;
    border-color: $color-primary;
    color: $color-white;
  }
}

.summary {
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
    margin-bottom: $space-4;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    gap: $space-4;
    font-size: $fs-sm;
    padding-bottom: $space-3;
    border-bottom: 1px solid $color-line;

    dt {
      color: $text-muted;
      flex-shrink: 0;
    }

    dd {
      color: $color-cream;
      text-align: right;
      font-weight: $fw-medium;
    }
  }

  &__empty {
    color: $text-muted;
    font-size: $fs-sm;
    margin-bottom: $space-4;
  }

  &__price {
    font-size: $fs-xs;
    color: $color-cream-dim;
    line-height: 1.5;
    padding: $space-3;
    background: $color-ink;
    border-radius: $radius-md;
    margin-bottom: $space-4;
  }

  &__incomplete {
    margin-top: $space-2;
    font-size: $fs-xs;
    color: $color-primary-400;
    text-align: center;
  }

  &__reset {
    display: block;
    margin: $space-3 auto 0;
    font-size: $fs-sm;
    color: $text-muted;
    text-decoration: underline;

    &:hover {
      color: $color-cream;
    }
  }
}

// Disabled send button state (anchor without href).
:deep(.btn.is-disabled) {
  opacity: 0.5;
  pointer-events: none;
}
</style>
