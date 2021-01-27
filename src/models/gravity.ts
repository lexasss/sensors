import { TogglingSensor } from './toggling-sensor';

export class Gravity extends TogglingSensor<GravitySensor> {

    constructor() {
        super(
            'Gravity',
            'accelerometer',
            (params: SensorOptions) => new GravitySensor( params ),
        );
    }

    protected onReading(event: Event) {
        this.data = `{${this.sensor?.x?.toFixed(1)} ${this.sensor?.y?.toFixed(1)} ${this.sensor?.z?.toFixed(1)}}`;
    }
}
