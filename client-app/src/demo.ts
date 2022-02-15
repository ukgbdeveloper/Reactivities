export interface Duck {
    name: string;
    numLegs: number;
    makeSound: (sound: string) => void;
}

const duck: Duck = {
    name: 'Donald',
    numLegs: 2,
    makeSound: (sound: string) => {
        alert(sound);
    }
};

const duck2: Duck = {
    name: 'Daffy',
    numLegs: 2,
    makeSound: (sound: string) => {
        alert(sound);
    }
};

export const ducks: Duck[] = [duck, duck2];