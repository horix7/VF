export const trimWorlds = (string: string) => {

    const newStr = string.split('')
    if(newStr.length > 50) {
        newStr.length = 49

        return newStr.join('') + " ..."
    }else {
        return string
    }


}

export const trimWorldsSmall = (string: string) => {

    const newStr = string.split('')
    if(newStr.length > 20) {
        newStr.length = 20

        return newStr.join('') + " ..."
    }else {
        return string
    }


}