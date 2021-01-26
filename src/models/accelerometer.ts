import { TogglingSensor } from './toggling-sensor';

export class Accel extends TogglingSensor {

    constructor() {
        super( 'Accelerometer' );

        try {
            const accel = new Accelerometer({
                frequency: 50,
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
