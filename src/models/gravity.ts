import { TogglingSensor } from './toggling-sensor';

export class Gravity extends TogglingSensor {

    constructor() {
        super( 'Gravity' );

        try {
            const accel = new GravitySensor({
                frequency: this.frequency,
            });

            this.setSensor( accel, 'accelerometer' );

            accel.addEventListener( 'reading', (event: Event) => {
                this.data = `{${accel.x?.toFixed(1)} ${accel.y?.toFixed(1)} ${accel.z?.toFixed(1)}}`;
            });

        } catch (error) {
            this.handleError( error );
        }
    }
}
