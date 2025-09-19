import { CustomError } from "../utils/exception";
export class GenericRepository<T extends { id: string }> {
    private items: T[] = [];

    findAll(): T[]{
        return this.items;
    }

    findById(id:string):T{
        const item = this.items.find((i)=>i.id ===id);
        if(!item) throw new CustomError("Item not found","SYSTEM",404); 
        return item;
    }

    create(item:T):T{
        this.items.push(item)
        return item;
    }

    update(id: string, updated: Partial<T>):T{
    const item= this.findById(id);
    if (!item) throw new CustomError("Item not found", "SYSTEM", 404);

    Object.assign(item, updated);
        return item;        
    }

    delete(id: string): void {
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) throw new CustomError("Item not found", "SYSTEM", 404);

    this.items.splice(index, 1);
  }

  _reset(): void {
  this.items = [];
}
}