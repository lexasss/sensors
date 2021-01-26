import { TogglingSensor } from './toggling-sensor';

export class OrientationRelative extends TogglingSensor {

    constructor() {
        super( 'Relative Orientation Sensor' );

        try {
            const orientationRelative = new RelativeOrientationSensor({
                frequency: 50,
            });

            this.setSensor( (orientationRelative as any) as Sensor, [
                'accelerometer',
                'gyroscope',
            ]);

            orientationRelative.addEventListener( 'reading', (event: Event) => {
                const n = orientationRelative.quaternion;
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
