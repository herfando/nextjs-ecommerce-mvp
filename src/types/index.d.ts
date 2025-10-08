// src/types/index.d.ts (atau nama file d.ts Anda)

// Deklarasi ini mengatasi error TS2882 saat mengimpor file CSS
declare module '*.css' {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const content: {};
    export default content;
}

// Tambahkan juga untuk SCSS/LESS jika Anda menggunakannya:
declare module '*.scss' {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const content: {};
    export default content;
}