import apiService from '@/common/api.service'

const FishText =
    {
        getFishTextRu(data?: object) {
            return apiService.get('https://fish-text.ru/get', data)
        }
    }

export default FishText
