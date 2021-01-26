import { TogglingSensor } from './toggling-sensor';

export class Magent extends TogglingSensor {

    constructor() {
        super( 'Magnetometer' );

        try {
            const magnetometer = new Magnetometer({
                frequency: this.frequency,
            });

            this.setSensor( magnetometer, 'magnetometer' );

            magnetometer.addEventListener( 'reading', (event: Event) => {
                this.data = `{${magnetometer.x?.toFixed(1)} ${magnetometer.y?.toFixed(1)} ${magnetometer.z?.toFixed(1)}}`;
            });

        } catch (error) {
            this.handleError( error );
        }
    }
}
