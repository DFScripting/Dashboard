import type { part } from "../../api/Script"

export function getNewPart(type: 'action' | 'condition', identifier: string): part {
    if(type == 'action') {
        return {type: 'action', action: identifier, arguments: []}
    }
    if(type == 'condition') {
        return {type: 'branch', condition: {condition: identifier, inverted: false, type: 'condition'}, arguments: [], hasElse: false, true: {hidden: false, parts: []}}
    }
    return undefined as any as part
}

export type DragType = 'event' | 'action' | 'condition' | 'value'
export function parseSidebarDrag(data?: DataTransfer|null) {
    const type = data!.getData("x-dfscript-type") as DragType
    const id = data!.getData('x-dfscript-identifier') as string
    return {type,id};
}
export function sideData(type: DragType, identifer: string) {
    return function(event: DragEvent) {
        const data = event.dataTransfer!;
        data.setData("x-dfscript-type",type);
        data.setData('x-dfscript-identifier',identifer);
    }
}