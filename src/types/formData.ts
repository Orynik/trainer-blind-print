type formDataFishTextRu = {
    type: string,
    number: string | number,
    format: string
}

type formDataFishTextEn = {
    type?: string
    sentences?: number | string,
}

type formDataAfterSend = {
    lang: string,
    countOfsentence: number
}

export {
    formDataFishTextRu, formDataFishTextEn,
    formDataAfterSend
}
