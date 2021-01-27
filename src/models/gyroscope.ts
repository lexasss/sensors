import { TogglingSensor } from './toggling-sensor';

export class Gyro extends TogglingSensor<Gyroscope> {

    constructor() {
        super(
            'Gyroscope',
            'gyroscope',
            (params: SensorOptions) => new Gyroscope( params ),
        );
    }

    protected onReading(event: Event) {
        this.data = `{${this.sensor?.x?.toFixed(1)} ${this.sensor?.y?.toFixed(1)} ${this.sensor?.z?.toFixed(1)}}`;
    }
}
