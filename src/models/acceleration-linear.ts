import { TogglingSensor } from './toggling-sensor';

export class AccelLinear extends TogglingSensor<LinearAccelerationSensor> {

    constructor() {
        super(
            'Linear Acceleration Sensor',
            'accelerometer',
            (params: SensorOptions) => new LinearAccelerationSensor( params ),
        );
    }

    protected onReading(event: Event) {
        this.data = `{${this.sensor?.x?.toFixed(1)} ${this.sensor?.y?.toFixed(1)} ${this.sensor?.z?.toFixed(1)}}`;
    }
}
