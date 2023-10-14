export class ProfilePicture {
    private readonly _data: any;  // Aqui, 'any' pode ser substituído por um tipo específico, como Buffer, se você estiver trabalhando com imagens binárias
    private readonly MAX_SIZE = 5 * 1024 * 1024;  // exemplo: 5MB
    private readonly ALLOWED_FORMATS = ['jpg', 'jpeg', 'png'];

    constructor(data: any) {
        if (data.length > this.MAX_SIZE) {
            throw new Error('Profile picture is too large.');
        }

        const format = this.extractFormat(data);  // Esta é uma função fictícia; você precisaria implementar uma lógica para extrair o formato
        if (!this.ALLOWED_FORMATS.includes(format)) {
            throw new Error('Invalid profile picture format.');
        }

        this._data = data;
    }

    private extractFormat(buffer: Buffer): string | null {
        if (buffer.length < 4) {
            return null; // O buffer é muito pequeno para determinar o formato
        }
    
        // Detectando PNG
        if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
            return 'png';
        }
    
        // Detectando JPEG (Existem vários bytes mágicos possíveis para JPEG. Aqui, estamos apenas verificando o mais comum)
        if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) {
            return 'jpeg';
        }
    
        // Detectando GIF
        if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
            return 'gif';
        }
    
        return null; // Formato desconhecido
    }
    
    get data(): any {
        return this._data;
    }
}
