<template>
  <div class="row" :class="`ma-n${gutter} jc-${justify} ai-${align}`">
    <div
      v-for="(col, name) in colList"
      :key="col.key"
      :class="`${gutter ? 'pa-' + gutter : ''} col-${col.cols} ${
        col.sm ? `sm:col-${col.sm}` : ''
      } ${col.md ? `md:col-${col.md}` : ''} ${
        col.lg ? `lg:col-${col.lg}` : ''
      } ${col.xl ? `xl:col-${col.xl}` : ''}  ${col.class || colClass}`"
    >
      <slot name="default" :col="col"></slot>
      <slot :name="col.key || name" :col="col"></slot>
    </div>
  </div>
</template>
<script setup>
const darkMode = useState('darkMode')
const props = defineProps({
  slotKey: {
    type: String,
    default: 'name',
  },
  cols: {
    type: [String, Number, Array, Object],
    default: '12',
  },
  sm: {
    type: [String, Number, Array, Object],
    default: '',
  },
  md: {
    type: [String, Number, Array, Object],
    default: '',
  },
  lg: {
    type: [String, Number, Array, Object],
    default: '',
  },
  xl: {
    type: [String, Number, Array, Object],
    default: '',
  },
  gutter: {
    type: [String, Number],
    default: 0,
  },
  justify: {
    type: String,
    default: 'start',
  },
  align: {
    type: String,
    default: 'start',
  },
  colClass: {
    type: String,
    default: '',
  },
})
</script>
<script>
export default {
  computed: {
    colList() {
      return this.transform(this.cols, this.sm, this.md, this.lg, this.xl)
    },
  },
  methods: {
    transform(cols, sm, md, lg, xl) {
      if (!cols) {
        return
      }
      if (typeof cols === 'object') {
        if (Array.isArray(cols)) {
          // Item is an Array
          return cols.map((item) =>
            typeof item === 'object' ? item : { cols: item },
          )
        } else {
          // Item is an Object
          return cols
        }
      } else {
        // Item is a string
        // we are transforming an array of items into an usable array
        sm = sm.toString().split(' ')
        md = md.toString().split(' ')
        lg = lg.toString().split(' ')
        xl = xl.toString().split(' ')

        return cols
          .toString()
          .split(' ')
          .map((col, i) => ({
            cols: col,
            sm: sm[i],
            md: md[i],
            lg: lg[i],
            xl: xl[i],
          }))
      }
    },
  },
}
</script>
