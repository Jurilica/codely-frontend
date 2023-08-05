export function formatLength(data:string) {
    let lineBreakExists = data.includes('\n');

    if(data.length <= 20 && !lineBreakExists){
        return data;
    }

    let index = 15;

    if(lineBreakExists){
        let indexOfFirstLineBreak = data.indexOf('\n');
        index = Math.min(15, indexOfFirstLineBreak);
    }

    return `${data.substring(0,index)}...`;
}