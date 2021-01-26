export class Accel {

    #inst?: Accelerometer;
    #status = 'not initialized';

    constructor() {
        try {
            this.#inst = new Accelerometer({
                frequency: 100,
            });

            this.#inst.onerror = (event: SensorErrorEvent) => {
                if (event.error.name === 'NotAllowedError') {
                    this.askPermission();
                } else if (event.error.name === 'NotReadableError' ) {
                    this.#status = 'Cannot connect to the sensor.';
                }
                else {
                    this.#status = 'Unknown issues: ' + event.error.name;
                }
            };

            this.#inst.addEventListener( 'reading', (event: Event) => {
                // do msomething
            });

            this.#inst.start();

        } catch (error) {
            if (error.name === 'SecurityError') {
                this.#status = 'Sensor construction was blocked by a feature policy.';
            } else if (error.name === 'ReferenceError') {
                this.#status = 'Sensor is not supported by the User Agent.';
            } else {
                throw error;
            }
        }
    }

    get status() {
        return this.#status;
    }

    private askPermission() {
        navigator.permissions.query({ name: 'accelerometer' })
            .then( result => {
                if (result.state === 'denied') {
                    this.#status = 'Permission to use accelerometer sensor is denied.';
                }
            });
    }
}
