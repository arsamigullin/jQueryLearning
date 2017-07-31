class User {
 
    id: number;
    name: string;
    getInfo(): string {
        return "id:" + this.id + " name:" + this.name;
    }
}