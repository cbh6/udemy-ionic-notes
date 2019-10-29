export class Registro {
    public format: string;
    public created: Date;
    public icon: string;
    public type: string;
    public text: string;

    constructor(format: string, text: string) {
        this.format = format;
        this.text = text;

        this.created = new Date();
        this.determinarTipo();
    }

    private determinarTipo() {
        const inicioTexto = this.text.substring(0, 4);
        switch (inicioTexto) {
            case 'http':
                this.type = 'http';
                this.icon = 'globe';
                break;
            case 'geo:':
                this.type = 'geo';
                this.icon = 'pin';
                break;

            default:
                this.type = 'No reconocido';
                this.icon = 'create';
        }
    }
}
