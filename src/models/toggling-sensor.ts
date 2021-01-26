export class TogglingSensor {

    public title: string;
    public status = 'not initialized';
    public isReady = false;
    public isRunning = false;
    public data = 'XX';

    private sensor?: Sensor;

    constructor( title: string ) {
        this.title = title;
    }

    toggle() {
        try {
            if (!this.isRunning) {
                this.sensor?.start();
            }
            else {
                this.sensor?.stop();
            }

            this.isRunning = !this.isRunning;
        }
        catch (error) {
            this.handleError( error );
        }
    }

    get isActivated() {
        return !!this.sensor?.activated;
    }

    protected setSensor( sensor: Sensor, permissions: string | string[] ) {
        this.sensor = sensor;

        this.sensor.onerror = (event: SensorErrorEvent) => {
            if (event.error.name === 'NotAllowedError') {
                if (Array.isArray( permissions )) {
                    permissions.forEach( p => this.askPermission( p ));
                }
                else {
                    this.askPermission( permissions );
                }
            }
            else if (event.error.name === 'NotReadableError' ) {
                this.status = 'Cannot connect to the sensor.';
            }
            else {
                this.status = 'Unknown issues: ' + event.error.name;
            }
        };

        this.sensor.addEventListener( 'activate', (event: Event) => {
            this.isReady = true;
            this.status = 'active';
        });

        this.isReady = true;
        this.status = 'Sensor API is present in the system';
    }

    protected handleError( error: any ) {
        if (error.name === 'SecurityError') {
            this.status = 'Sensor construction was blocked by a feature policy.';
        } else if (error.name === 'ReferenceError') {
            this.status = 'Sensor is not supported by the User Agent.';
        } else {
            this.status = 'Unexpected error: ' + error.name;
        }
    }

    private askPermission( name: any ) {
        navigator.permissions.query({ name })
            .then( result => {
                if (result.state === 'denied') {
                    this.status = 'Permission to use the sensor is denied.';
                }
            });
    }

}
