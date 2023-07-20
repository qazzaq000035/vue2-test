

<template>
  <div class="container">
    <form name="add" @submit.prevent="addToStorage($event)">
      <div class="d-flex jc-sb mt-4">
        <div class="input-box">
          <label for="input-1">цена</label>
          <input id="input-1" v-model="price" type="number" placeholder="0">
        </div>
        <div class="input-box">
          <label for="input-2">кол-во</label>
          <input id="input-2" v-model="qnt" type="number" placeholder="0">
        </div>
        <div class="input-box">
          <label for="input-3">сумма</label>
          <input id="input-3" v-model="summa" type="number" placeholder="0">
        </div>
        <div class="input-box">
          <button type="submit">submit</button>
        </div>
        <div>
          <input id="checkbox" type="checkbox" v-model="vuex" class="mt-2">
          <label for="checkbox">исп. Vuex</label>
        </div>
      </div>
      <div class="d-flex jc-sb mt-4">
        <div class="label-box">
          <label>Цена: {{price}}</label>
        </div>
        <div class="label-box">
          <label>Кол-во: {{qnt}}</label>
        </div>
        <div class="label-box">
          <label>Сумма: {{summa}}</label>
        </div>
        <div class="label-box">
          <label>Хранилище: {{storage}}</label>
        </div>
      </div>
    </form>
    <div>
      <ul class="align-left">
        <li v-for="(event, i) in eventLog.slice().reverse()">{{ event }}</li>
      </ul>
    </div>
  </div>
</template>
  
<script>
import { mapGetters, mapMutations } from 'vuex'
import eventLog from '@/plugins/eventLog'

export default {
  name: 'Index',
  data() {
    return {
      item: {
        summa: 0,
        price: 0,
        qnt: 0,
      },
      dynamicStore: null,
      vuex: false,
      log: []
    }
  },
  watch: {
    price(n,o) {
      this.summa = this.qnt * n
    },
    qnt(n,o) {
      this.summa = this.price * n
    },
    vuex(n) {
      console.log(this.storage)
      this.$forceUpdate()
    }
  },
  computed: {
    ...mapGetters(["getStore"]),
    price: {
      get() {
        eventLog.push('input.price.read', this.item.price);
        return this.item.price || 0
      },
      set(v) {
        eventLog.push('input.price.write', v);
        this.item.price = v
      }
    },
    qnt: {
      get() {
        eventLog.push('input.qnt.read', this.item.qnt);
        return this.item.qnt || 0
      },
      set(v) {
        eventLog.push('input.qnt.write', v);
        this.item.qnt = v
      }
    },
    summa: {
      get() {
        eventLog.push('input.summa.read', this.item.summa);
        return this.item.summa
      },
      set(v) {
        this.item.summa = v
        eventLog.push('input.summa.write', v);
      }
    },
    storage: {
      get() {
        const store = this.vuex ? this.getStore  || '{}' : (this.dynamicStore || localStorage.getItem('json') || '{}')
        eventLog.push('storage.read', store);
        return store
      },
      set(v) {
        const json = JSON.stringify(v)
        this.vuex ? this.setStore(json) : (localStorage.setItem('json', json), this.dynamicStore = json)
        eventLog.push('storage.write', v);
      }
    },
    // ...eventLog
    eventLog() { return eventLog }
  },
  methods: {
    ...mapMutations(["setStore"]),
    addToStorage(e) {
      e.preventDefault()
      this.storage = this.item
    },
  },
  created() {
  }
}
</script>
  
<style lang="scss">
</style>
  