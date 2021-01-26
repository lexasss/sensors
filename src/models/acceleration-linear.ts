import { TogglingSensor } from './toggling-sensor';

export class AccelLinear extends TogglingSensor {

    constructor() {
        super( 'Linear Acceleration Sensor' );

        try {
            const accel = new LinearAccelerationSensor({
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
