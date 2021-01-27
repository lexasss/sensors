<template lang="pug">
    #app
        section.hero.is-dark.is-bold
            .hero-body
                .logo.is-overlay
                    img(src="@/assets/logo.png")
                .container
                    h1.title Sensors
                    h2.subtitle Detects the sensors available on your device

        section.section.py-4(v-for="(sensor, index) in sensors" :key="index" :class="recordClass(index)")
            .container
                h5.title.is-5.mb-3 {{ sensor.title }}
                .mb-2
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

    recordClass( index: number ) {
        return index % 2 ? 'odd' : 'even';
    }

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

.odd {
    background-color: #e8e8e8;
}

.even {
    background-color: #ffffff;
}

.logo {
    top: 3rem !important;
    left: 1.5rem !important;
    width: 2.5em;
}
</style>
