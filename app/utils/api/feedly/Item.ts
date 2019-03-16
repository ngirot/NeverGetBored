import Alternate from "./Alternate";
import Origin from "./Origin";
import Visual from "./Visual";

export default class Item {
    public readonly id: string;
    public readonly title: string;
    public readonly origin: Origin;
    public readonly visual: Visual;
    public readonly alternate: Alternate[];
}