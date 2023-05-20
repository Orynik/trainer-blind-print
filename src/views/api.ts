import apiService from '@/common/api.service'
import {formDataFishTextRu, formDataFishTextEn} from "@/types/formData";

const FishText =
    {
        getFishTextRu(data: formDataFishTextRu) {
            return apiService.get('https://fish-text.ru/get', data)
        },
        getFishTextEn(data: formDataFishTextEn) {
            return apiService.get('https://baconipsum.com/api/', data)
        }
    }

export default FishText
