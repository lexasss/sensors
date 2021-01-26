<template lang="pug">
    #app
        section.hero.is-dark.is-bold
            .hero-body
                .container
                    h1.title Sensors
                    h2.subtitle Detects the sensors available on your device

        section.section(v-for="sensor in sensors")
            .container
                h5.title.is-5 {{ sensor.title }}
                .mb-3
                    p {{ sensor.status }}
                    p(v-show="sensor.isRunning") {{ sensor.data }}
                button.button(
                    @click="sensor.toggle()"
                    :disabled="!sensor.isReady") Toggle

        footer.footer.has-text-light.has-background-dark
            content.has-text-centered
                p Oleg Spakov @ {{ YEAR }}, v.{{ VERSION }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { TogglingSensor } from '@/models/toggling-sensor';
import { Accel } from '@/models/accelerometer';
import { Gyro } from '@/models/gyroscope';
import { Magent } from '@/models/magnetometer';
import { OrientationAbsolute } from '@/models/orientation-absolute';
import { OrientationRelative } from '@/models/orientation-relative';
import { AmbientLight } from '@/models/ambient-light-sensor';
import { AccelLinear } from '@/models/acceleration-linear';
import { Gravity } from '@/models/gravity';

@Component({
    components: {
    },
})
export default class App extends Vue {

    readonly VERSION = process.env.PACKAGE_VERSION;
    readonly YEAR = new Date().getFullYear();

    sensors: TogglingSensor[] = [
        new Accel(),
        new Gyro(),
        new Magent(),
        new OrientationAbsolute(),
        new OrientationRelative(),
        new AmbientLight(),
        new AccelLinear(),
        new Gravity(),
    ];

    created() {
        this.$store.dispatch( 'connect', 'local' ).then(() => {
            // ?? do we need Vuex here?
        });
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
