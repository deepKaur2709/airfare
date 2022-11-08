import aircanadaImage from '../images/aircanada.jpg'
import lufthansaImage from '../images/lufthansa.png'
import vistaraImage from '../images/vistara.jpeg'

export const logoimagemapping = {
    AirCanada: aircanadaImage,
    Lufthansa: lufthansaImage,
    Vistara: vistaraImage,
}

export const predictionDurationMapping = {
    LESS_THAN_30_MINUTES: 'Less than 30 minutes',
    BETWEEN_30_AND_60_MINUTES: 'Between 30 and 60 minutes',
    BETWEEN_60_AND_120_MINUTES: 'Between 60 and 120 minutes',
    OVER_120_MINUTES_OR_CANCELLED: 'Over 120 minutes or cancelled'
}