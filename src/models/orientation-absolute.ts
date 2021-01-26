import { TogglingSensor } from './toggling-sensor';

export class OrientationAbsolute extends TogglingSensor {

    constructor() {
        super( 'Absolute Orientation Sensor' );

        try {
            const orientationAbsolute = new AbsoluteOrientationSensor({
                frequency: 50,
            });

            this.setSensor( (orientationAbsolute as any) as Sensor );

            orientationAbsolute.addEventListener( 'reading', (event: Event) => {
                const n = orientationAbsolute.quaternion;
                if (n) {
                    this.data = `{${n[0].toFixed(3)} ${n[1].toFixed(3)} ${n[2].toFixed(3)} ${n[3].toFixed(3)}}`;
                }
                else {
                    this.data = '{}';
                }
            });

        } catch (error) {
            this.handleError( error );
        }
    }
}
