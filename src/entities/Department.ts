export class Department {
    private _name: string;
  
    constructor(name: string) {
      this.validateName(name);
      this._name = name;
    }
  
    private validateName(name: string): void {
      if (!name || name.trim() === "") {
        throw new Error("Department name cannot be empty.");
      }
  
      // Aqui você pode adicionar outras validações conforme necessário,
      // como verificar se o nome tem um comprimento mínimo/máximo,
      // se contém caracteres inválidos, etc.
    }
  
    get name(): string {
      return this._name;
    }
  }
  