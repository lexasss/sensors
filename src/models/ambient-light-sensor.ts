import { TogglingSensor } from './toggling-sensor';

declare class AmbientLightSensor extends Sensor {
    illuminance?: number;
    constructor( options: any );
}

export class AmbientLight extends TogglingSensor {

    constructor() {
        super( 'Ambient Light Sensor' );

        try {
            const ambientLight = new AmbientLightSensor({
                frequency: 50,
            });

            this.setSensor( ambientLight, 'ambient-light-sensor' );

            ambientLight.addEventListener( 'reading', (event: Event) => {
                this.data = `{${ambientLight.illuminance?.toFixed(3)}}`;
            });

        } catch (error) {
            this.handleError( error );
        }
    }
}
