<template>
  <div>
    <div class="autocomplete-container d-flex">
      <div class="grow"></div>
      <div class="col">
        <div class="input-container d-flex">
          <div class="grow">
            <input
              class="input-field"
              placeholder="Filter"
              v-model="filterValue"
              @value="value"
              @input="$emit('input', $event.target.value); autoComplete()"
              @focusin="show = true"
              @focusout="hide"
            />
          </div>
          <div v-if="filterValue">
            <a class="reset" href="#" @click.prevent="$emit('input', ''); filterValue = ''">X</a>
          </div>
        </div>
        <ul class="results-list" v-if="filterValue && show">
          <li :class="item.type" v-for="(item, index) in filteredMergeList" :key="index">
            <a class="selector" href="#" @click.prevent="$emit('input', item.title); filterValue = item.title">{{ item.title }}</a>
          </li>
        </ul>
      </div>
      <div class="grow"></div>
    </div>
  </div>
</template>

<script>
  import { helpers } from '../helpers/helpers'

  export default {
    props: [
      'citiesList',
      'storesList',
      'value',
    ],
    data () {
      return {
        filteredMergeList: [],
        filterValue: '',
        mergeList: [],
        show: false,
      }
    },
    created () {
      this.mergeLists()
    },
    methods: {
      autoComplete () {
        this.filteredMergeList = this.mergeList.filter(value => value.title.toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1)
      },
      mergeLists () {
        const stores = this.storesList.map(store => {
          return {
            'type': 'addressName',
            'title': store.addressName,
          }
        })
        const cities = this.citiesList.map(city => {
          return {
            'type': 'city',
            'title': city,
          }
        })

        const {sortHelper} = helpers()
        this.mergeList = [...cities, ...stores].sort(sortHelper(false, 'title'))
      },
      hide () {
        setTimeout(_ => this.show = false, 500)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .d-flex {
    display: flex;
    flex-wrap: wrap;
    .grow {
      flex-grow: 1;
    }
  }

  .autocomplete-container {
    .col {
      max-width: 300px;
      position: relative;
      width: 33.33%;
    }
  }

  .input-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .input-field {
      border: solid 1px #fdc513;
      padding: 10px;
      width: 100%;
    }
    .reset {
      align-items: center;
      background: #fdc513;
      color: #fff;
      display: flex;
      height: 100%;
      justify-content: center;
      right: 0;
      text-decoration: none;
      width: 40px;
    }
  }

  .results-list {
    background: #fff;
    border: solid 1px;
    margin: 0 auto;
    left: 0;
    padding: 0;
    position: absolute;
    width: 100%;
    li {
      list-style-type: none;
      padding: 5px;
      text-align: left;
    }
    .city {
      background: rgba(#3d833c, 0.7);
      &:hover {
        background: #3d833c;
      }
    }
    .addressName {
      background: rgba(#f00, 0.5);
      &:hover {
        background: #ff4e37;
      }
    }
    .selector {
      color: #fff;
      display: block;
      font-size: 13px;
      text-decoration: none;
    }
  }
</style>
