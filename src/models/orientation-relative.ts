import { TogglingSensor } from './toggling-sensor';

export class OrientationRelative extends TogglingSensor<AnyOrientationSensor> {

    constructor() {
        super(
            'Relative Orientation Sensor',
            [
                'accelerometer',
                'gyroscope',
            ],
            (params: SensorOptions) => (new RelativeOrientationSensor( params ) as any) as AnyOrientationSensor,
        );
    }

    protected onReading(event: Event) {
        const v = this.sensor?.quaternion;
        if (v) {
            this.data = `{${v[0].toFixed(3)} ${v[1].toFixed(3)} ${v[2].toFixed(3)} ${v[3].toFixed(3)}}`;
        }
        else {
            this.data = '{}';
        }
    }
}
