import axios from '@/common/axios.global'

interface dataParams {
    [key: string]: string
}

function formDataSetup(sendingData: string | dataParams, method = '') {
    // Создаем пустой объект
    if (typeof sendingData !== 'string') {
        const data = new FormData()
        // Добавляем в созданный объект поля
        // Если obj не null добавляем в data ключ-значени obj
        if (sendingData)
            Object.entries(sendingData).forEach(([key, value]) =>
                data.append(key, value)
            )

        if (method) data.append('_method', method)

        return data
    }

    return sendingData
}

const ApiService = {
    get(url: string, params?: object) {
        return axios.get(url, {params})
    },
    post(url: string, data: dataParams | string, params?: object, responseType?: string) {
        const formData = formDataSetup(data)

        let config: object = {params, responseType}

        if (typeof data === 'string') {
            config = {
                ...config,
                headers: {'Content-Type': 'application/json'}
            }
        }
        return axios.post(url, formData, config)
    }
}

export default ApiService
