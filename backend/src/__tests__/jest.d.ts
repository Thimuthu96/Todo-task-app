declare global {
    namespace jest {
        interface Matchers<R> {
            toMatchObject: (expected: any) => R;
            toBe: (expected: any) => R;
            toBeDefined: () => R;
            toEqual: (expected: any) => R;
            toBeGreaterThan: (expected: number) => R;
        }
    }
}