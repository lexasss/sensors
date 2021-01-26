<template lang="pug">
    #app
        section.hero.is-dark.is-bold
            .hero-body
                .container
                    h1.title Sensors
                    h2.subtitle Detects the sensors available on your device
        section.section
            .container
                h5.title.is-5 Accelerometer
                p {{ accel.status }}
                p(v-show="accel.isRunning") {{ accel.data }}
                button.button(@click="accel.toggle()") Toggle
        footer.footer.has-text-light.has-background-dark
            content.has-text-centered
                p Oleg Spakov @ {{ YEAR }}, v.{{ VERSION }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { Accel } from '@/services/accelerometer';

@Component({
    components: {
    },
})
export default class App extends Vue {

    readonly VERSION = process.env.PACKAGE_VERSION;
    readonly YEAR = new Date().getFullYear();

    accel = new Accel();

    created() {
        this.$store.dispatch( 'connect', 'local' ).then(() => {
            // ??
        });

        // this.accel.on( 'data', () => this.$nextTick() );
    }
}
</script>

<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
