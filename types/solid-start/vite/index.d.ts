import { Plugin } from "node_modules/vite";
import { Options } from "./plugin";

export { Adapter } from './plugin';
export default function (opts?: Partial<Options>): Plugin[];
