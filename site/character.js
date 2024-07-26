/**
 * Character creator
*/ 
class Character {
    constructor(name, series, kakeraValue, listPosition, note = '', keyType = '', keyCount = '', embedColor = '#ff9c2c', nameColor = '#ffffff', image = '') {
        this.name = name;
        this.series = series;
        this.kakeraValue = kakeraValue;
        this.listPosition = listPosition;
        this.note = note;
        this.keyType = keyType;
        this.keyCount = keyCount;
        this.embedColor = embedColor;
        this.nameColor = nameColor;
        this.image = image;
        this.imageWidth = 0;
    }

    getName(){
        return this.name;
    }

    setImage(image) {
        this.image = image;
    }

    setKey(keyType, keyCount) {
        this.keyType = keyType;
        this.keyCount = keyCount;
    }

    setColors(embedColor, nameColor) {
        this.embedColor = embedColor;
        this.nameColor = nameColor;
    }

    setImageWidth(imageWidth) {
        this.imageWidth = imageWidth;
    }

    setNote(note){
        this.note = note;
    }
}

window.Character = Character;