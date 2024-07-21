export interface CharacterFull {
    data: Data[];
}

export interface Data {
    character:    Character;
    role:         Role;
    favorites:    number;
    voice_actors: VoiceActor[];
}

export interface Character {
    mal_id: number;
    url:    string;
    images: CharacterImages;
    name:   string;
}

export interface CharacterImages {
    jpg:  Jpg;
    webp: Webp;
}

export interface Jpg {
    image_url: string;
}

export interface Webp {
    image_url:       string;
    small_image_url: string;
}

export enum Role {
    Main = "Main",
    Supporting = "Supporting",
}

export interface VoiceActor {
    person:   Person;
    language: Language;
}

export enum Language {
    English = "English",
    French = "French",
    German = "German",
    Italian = "Italian",
    Japanese = "Japanese",
    PortugueseBR = "Portuguese (BR)",
    Spanish = "Spanish",
}

export interface Person {
    mal_id: number;
    url:    string;
    images: PersonImages;
    name:   string;
}

export interface PersonImages {
    jpg: Jpg;
}
