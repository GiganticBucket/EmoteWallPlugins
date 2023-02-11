declare class NamedObjectList<T extends {
    name?: string;
}> {
    private _entries;
    constructor(...initialEntries: T[]);
    clear(): void;
    add(entry: T): void;
    remove(element: T): void;
    removeAllWithName(name: string): void;
    replaceEntryWithNameOrAppend(nameToReplace: string, newEntry: T): void;
    replaceNamedEntryOrAppend(newEntry: T): void;
    get valuesSnapshot(): T[];
    toImmutable(): ReadonlyArray<T>;
    clone(): NamedObjectList<T>;
}
