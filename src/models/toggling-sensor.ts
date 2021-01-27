export type SensorCreationCallback<T> = (params: SensorOptions) => T;

type Permissions = string | string[];

export abstract class TogglingSensor<T extends Sensor> {

    public title: string;
    public status = 'not initialized';
    public isReady = false;
    public isRunning = false;
    public data = '';

    protected readonly sensor?: T;

    private frequency = 20;
    private permissions: Permissions;

    constructor(
        title: string,
        permissions: string | string[],
        cb: SensorCreationCallback<T>,
        ) {

        this.title = title;
        this.permissions = permissions;

        try {
            this.sensor = cb({ frequency: this.frequency });
            this.sensor.addEventListener( 'error', (event: SensorErrorEvent) => this.onError( event ) );
            this.sensor.addEventListener( 'reading', (event: Event) => this.onReading( event ) );

            this.isReady = true;
            this.status = 'Sensor API is present in the system';
        } catch (error) {
            this.handleError( error );
        }
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

    protected abstract onReading( event: Event ): void;

    private onError(event: SensorErrorEvent) {
        if (event.error.name === 'NotAllowedError') {
            if (Array.isArray( this.permissions )) {
                this.permissions.forEach( p => this.askPermission( p ));
            }
            else {
                this.askPermission( this.permissions );
            }
        }
        else if (event.error.name === 'NotReadableError' ) {
            this.handleError( event.error );
        }
        else {
            this.handleError( event.error );
        }
    }

    private handleError( error: any ) {
        if (error.name === 'SecurityError') {
            this.status = 'Sensor construction was blocked by a feature policy.';
        }
        else if (error.name === 'ReferenceError') {
            this.status = 'Sensor is not supported by the User Agent.';
        }
        else if (error.name === 'NotReadableError' ) {
            this.status = 'Cannot connect to the sensor.';
        }
        else {
            this.status = 'Unexpected error: ' + error.name;
        }

        this.isReady = false;
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
