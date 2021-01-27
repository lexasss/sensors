import Vue, { VNode } from 'vue';
import '@types/w3c-generic-sensor';

declare global {

    // This class is missing in @types/w3c-generic-sensor
    declare class AmbientLightSensor extends Sensor {
        constructor(options?: SensorOptions);
        illuminance?: number;
    }

    // Same as OrientationSensor from @types/w3c-generic-sensor,
    // but without its function that causes the compiler to
    // complain on non-compatible types in generic classes
    declare class AnyOrientationSensor extends Sensor {
        constructor(options?: SensorOptions);
        readonly quaternion?: number[];
    }
    
    namespace JSX {
        // tslint:disable no-empty-interface
        interface Element extends VNode {}
        // tslint:disable no-empty-interface
        interface ElementClass extends Vue {}
        interface IntrinsicElements {
            [elem: string]: any;
        }
    }
}
