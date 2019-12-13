<template>
    <div>
        <div>
            <button class="btn" @click.prevent="show = 'stores'">Show stores</button>
            <button class="btn" @click.prevent="show = 'cities'">Show cities</button>
        </div>

        <div class="mt" v-if="show === 'cities'">
            <button class="btn" @click.prevent="sort(false)">Sort ASC</button>
            <button class="btn" @click.prevent="sort(true)">Sort DESC</button>
        </div>
        <div class="mt" v-show="show === 'stores'">
            <autocomplete
                v-model="filterTerm"
                :stores-list="storesList"
                :cities-list="citiesList"
            />
        </div>

        <ul class="mt results" v-if="show === 'cities'">
            <li class="result" v-for="(city, index) in citiesList" :key="index">{{ city }}</li>
        </ul>
        <ul class="mt results" v-if="show === 'stores'">
            <li class="result" v-for="(store, index) in sortedList" :key="index">{{ store.title }}</li>
        </ul>
    </div>
</template>

<script>
    import { helpers } from '../helpers/helpers'
    import stores from '../stores'
    import Autocomplete from './Autocomplete'

    export default {
        data () {
            return {
                stores,
                show: '',
                storesList: [],
                citiesList: [],
                filteredList: null,
                filterTerm: '',
            }
        },
        created () {
            // create lists on init load so these list only have to be created once
            this.listCities()
            this.listStores()
        },
        methods: {
            listCities () {
                const list = this.stores.map(store => store.city)
                this.citiesList = [...new Set(list)] // remove duplicates (for city's)
                this.sort()
            },
            listStores () {
                this.storesList = this.stores.map(store => {
                    return {
                        'title': store.addressName,
                        'city': store.city,
                        'addressName': store.addressName,
                    }
                })
            },
            sort (rev) {
                const {sortHelper} = helpers()
                this.citiesList.sort(sortHelper(rev))
            },
        },
        computed: {
            sortedList: function () {
                let returnList
                returnList = this.storesList

                // if filter has value, filter by city of addressName
                if (this.filterTerm) {
                    returnList = returnList.filter(value => {
                        return (
                            (value.city.toLowerCase().indexOf(this.filterTerm.toLowerCase()) > -1)
                            || (value.addressName.toLowerCase().indexOf(this.filterTerm.toLowerCase()) > -1)
                        )
                    })
                }

                return returnList
            },
        },
        components: {
            Autocomplete,
        },
    }
</script>

<style lang="scss" scoped>
    .mt {
        margin-top: 20px;
    }

    .btn {
        background: #fdc513;
        border: solid 1px #2c3e50;
        color: #2c3e50;
        cursor: pointer;
        font-size: 1em;
        text-align: center;
        padding: 5px;
    }

    .results {
        list-style: none;
        .result {
            background: #fdc513;
            display: inline-block;
            margin: 5px;
        }
    }
</style>
