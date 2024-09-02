export default class Category {
  categoryId: number;
    name: string;
    iconPath: string;
  
    constructor(categoryId: number, name: string, iconPath: string) {
      this.categoryId = categoryId;
      this.name = name;
      this.iconPath = iconPath;
    }
  }