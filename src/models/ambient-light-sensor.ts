import { TogglingSensor } from './toggling-sensor';

export class AmbientLight extends TogglingSensor<AmbientLightSensor> {

    constructor() {
        super(
            'Ambient Light Sensor',
            'ambient-light-sensor',
            (params: SensorOptions) => new AmbientLightSensor( params ),
        );
    }

    protected onReading(event: Event) {
        this.data = `{${this.sensor?.illuminance?.toFixed(3)}}`;
    }
}
