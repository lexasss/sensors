import { TogglingSensor } from './toggling-sensor';

export class Gyro extends TogglingSensor {

    constructor() {
        super( 'Gyroscope' );

        try {
            const gyro = new Gyroscope({
                frequency: this.frequency,
            });

            this.setSensor( gyro, 'gyroscope' );

            gyro.addEventListener( 'reading', (event: Event) => {
                this.data = `{${gyro.x?.toFixed(3)} ${gyro.y?.toFixed(3)} ${gyro.z?.toFixed(3)}}`;
            });

        } catch (error) {
            this.handleError( error );
        }
    }
}
