import { TogglingSensor } from './toggling-sensor';

export class Magent extends TogglingSensor<Magnetometer> {

    constructor() {
        super(
            'Magnetometer',
            'magnetometer',
            (params: SensorOptions) => new Gyroscope( params ),
        );
    }

    protected onReading(event: Event) {
        this.data = `{${this.sensor?.x?.toFixed(1)} ${this.sensor?.y?.toFixed(1)} ${this.sensor?.z?.toFixed(1)}}`;
    }
}
