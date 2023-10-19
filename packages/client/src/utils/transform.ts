import { v4 as uuidv4 } from 'uuid';

export function transformStringWithRandomChars(input: string, count: number = 5): string {
    // Convert string to camelCase
    const camelCaseStr = input.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
    
    // Generate random UUID and take `count` characters from it
    const randomUuid = uuidv4().replace(/-/g, ''); // remove hyphens
    const randomChars = randomUuid.substring(0, count);

    return camelCaseStr + randomChars;
}
