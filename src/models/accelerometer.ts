import { TogglingSensor } from './toggling-sensor';

export class Accel extends TogglingSensor<Accelerometer> {

    constructor() {
        super(
            'Accelerometer',
            'accelerometer',
            (params: SensorOptions) => new Accelerometer( params ),
        );
    }

    protected onReading(event: Event) {
        this.data = `{${this.sensor?.x?.toFixed(1)} ${this.sensor?.y?.toFixed(1)} ${this.sensor?.z?.toFixed(1)}}`;
    }
}
