export const trimWorlds = (string: string) => {

    const newStr = string.split('')
    if(newStr.length > 50) {
        newStr.length = 49

        return newStr.join('') + " ..."
    }else {
        return string
    }


}