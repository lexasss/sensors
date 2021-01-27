import { TogglingSensor } from './toggling-sensor';

export class OrientationAbsolute extends TogglingSensor<AnyOrientationSensor> {

    constructor() {
        super(
            'Absolute Orientation Sensor',
            [
                'accelerometer',
                'gyroscope',
                'magnetometer',
            ],
            (params: SensorOptions) => (new AbsoluteOrientationSensor( params ) as any) as AnyOrientationSensor,
        );
    }

    protected onReading(this: this, event: Event) {
        const v = this.sensor?.quaternion;
        if (v) {
            this.data = `{${v[0].toFixed(3)} ${v[1].toFixed(3)} ${v[2].toFixed(3)} ${v[3].toFixed(3)}}`;
        }
        else {
            this.data = '{}';
        }
    }
}
