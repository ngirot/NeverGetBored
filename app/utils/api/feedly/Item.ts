import Alternate from "./Alternate";
import Origin from "./Origin";
import Visual from "./Visual";

export default class Item {
    public id: string;
    public title: string;
    public origin: Origin;
    public visual: Visual;
    public alternate: Alternate[];
}