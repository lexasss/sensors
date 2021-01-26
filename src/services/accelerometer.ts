// import { EventEmitter } from 'events';

export class Accel /*extends EventEmitter*/ {

    public status = 'not initialized';
    public isRunning = false;
    public data = '';

    private inst?: Accelerometer;

    constructor() {
    //    super();

        try {
            this.inst = new Accelerometer({
                frequency: 50,
            });

            this.inst.onerror = (event: SensorErrorEvent) => {
                if (event.error.name === 'NotAllowedError') {
                    this.askPermission();
                } else if (event.error.name === 'NotReadableError' ) {
                    this.status = 'Cannot connect to the sensor.';
                }
                else {
                    this.status = 'Unknown issues: ' + event.error.name;
                }
            };

            this.status = 'available';

            this.inst.addEventListener( 'reading', (event: Event) => {
                this.data = `{${this.inst?.x?.toFixed(3)} ${this.inst?.y?.toFixed(3)} ${this.inst?.z?.toFixed(3)}}`;
            });

            this.inst.addEventListener( 'activate', (event: Event) => {
                this.status = 'activated';
            });

        } catch (error) {
            if (error.name === 'SecurityError') {
                this.status = 'Sensor construction was blocked by a feature policy.';
            } else if (error.name === 'ReferenceError') {
                this.status = 'Sensor is not supported by the User Agent.';
            } else {
                this.status = 'Unexpected error: '  + error.name;
            }
        }
    }

    toggle() {
        if (!this.isRunning) {
            this.inst?.start();
        }
        else {
            this.inst?.stop();
        }

        this.isRunning = !this.isRunning;
    }

    private askPermission() {
        navigator.permissions.query({ name: 'accelerometer' })
            .then( result => {
                if (result.state === 'denied') {
                    this.status = 'Permission to use accelerometer sensor is denied.';
                }
            });
    }
}
