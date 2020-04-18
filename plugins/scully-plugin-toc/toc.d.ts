import { TocHandledRoute } from './interfaces';
export declare const headingLevel: (tag: string) => number | null;
export declare function tocPlugin(html: string, routeData: TocHandledRoute): string;
